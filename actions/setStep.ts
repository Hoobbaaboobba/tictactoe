"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const setStep = async (currentSymbol: string, gameId: string) => {
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

    if (!playgruond) {
      return null;
    }

    const board = await db.ticTacToePlayGround.update({
      where: {
        id: playgruond.id,
      },
      data: {
        currentSymbol: currentSymbol === "X" ? "O" : "X",
      },
    });

    revalidatePath(`/play/${gameId}`);
    return board;
  } catch {
    return { error: "Что-то пошло не так!" };
  }
};
