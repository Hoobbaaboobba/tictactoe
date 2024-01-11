"use server";

import { v4 as uuidv4 } from "uuid";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

export const exitGame = async (gameId: string) => {
  try {
    const user = await currentUser();

    if (!user) {
      return null;
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

export const leaveRoom = async (gameId: string) => {
  try {
    const user = await currentUser();

    if (!user) {
      return null;
    }

    await db.player.delete({
      where: {
        userId: user.id,
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
