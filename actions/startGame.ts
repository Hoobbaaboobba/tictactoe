"use server";

import { v4 as uuidv4 } from "uuid";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Player } from "@prisma/client";

export const startGame = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return null;
    }

    await db.ticTacToePlayGround.create({
      data: {
        userId: user.id,
        inviteCode: uuidv4(),
        prise: parseInt((Math.random() * (34 - 15) + 15).toFixed(0)),
        minus: parseInt((Math.random() * (12 - 5) + 5).toFixed(0)),
        players: {
          create: [
            {
              image: user.image,
              name: user.name,
              userId: user.id,
              role: user.role,
              symbol: "O",
            },
          ],
        },
      },
    });

    revalidatePath("/play");
  } catch {
    return { error: "Что-то пошло не так!" };
  }
};

export const exitGame = async (
  gameId: string,
  players: Player[] | undefined
) => {
  try {
    const user = await currentUser();

    if (!user) {
      return null;
    }

    const existringTicTacToePlayground =
      await db.ticTacToePlayGround.findUnique({
        where: {
          id: gameId,
        },
      });

    if (!existringTicTacToePlayground) {
      return redirect("/play");
    }

    if (players) {
      await db.user.update({
        where: {
          id: players[0]?.userId,
        },
        data: {
          points: {
            increment: existringTicTacToePlayground?.prise,
          },
        },
      });

      const points =
        (players[1].points || 0) < existringTicTacToePlayground?.minus
          ? 0
          : existringTicTacToePlayground.minus;

      await db.user.update({
        where: {
          id: players[1]?.userId,
        },
        data: {
          points: {
            increment: points,
          },
        },
      });
    }

    await db.ticTacToePlayGround.delete({
      where: {
        id: gameId,
      },
    });

    return revalidatePath(`/play/${gameId}`);
  } catch {
    return { error: "Что-то пошло не так!" };
  }
};

export const leaveRoom = async (gameId: string, userId?: string) => {
  try {
    const user = currentUser();

    if (!user) {
      return null;
    }

    await db.ticTacToePlayGround.delete({
      where: {
        id: gameId,
        players: {
          some: {
            userId: userId,
          },
        },
      },
    });

    return redirect("/play");
  } catch {
    return { error: "Что-то пошло не так!" };
  }
};

export const endGame = async (gameId: string) => {
  try {
    const user = currentUser();

    if (!user) {
      return null;
    }

    await db.ticTacToePlayGround.update({
      where: {
        id: gameId,
      },
      data: {
        status: "end",
      },
    });

    return redirect("/play");
  } catch {
    return { error: "Что-то пошло не так!" };
  }
};
