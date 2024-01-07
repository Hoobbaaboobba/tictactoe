"use server";

import { v4 as uuidv4 } from "uuid";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const startGame = async () => {
  try {
    const user = await currentUser();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    if (!user) {
      return null;
    }

    await db.ticTacToePlayGround.create({
      data: {
        userId: user.id,
        inviteCode: uuidv4(),
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

    const playgruond = await db.ticTacToePlayGround.findFirst({
      where: {
        players: {
          some: {
            userId: user?.id,
          },
        },
      },
    });

    await db.ticTacToePlayGround.delete({
      where: {
        id: playgruond?.id,
      },
      select: {
        players: true,
      },
    });

    return redirect(`/play`);
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
