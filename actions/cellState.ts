"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const cellState = async (
  currentIndex: number,
  currentSymbol: string
) => {
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

    const newBoard =
      playgruond.board.slice(0, currentIndex) +
      currentSymbol +
      playgruond.board.slice(currentIndex + 1);

    await db.ticTacToePlayGround.update({
      where: {
        id: playgruond.id,
      },
      data: {
        board: newBoard,
      },
    });

    return newBoard;
  } catch {
    return { error: "Что-то пошло не так!" };
  }
};
