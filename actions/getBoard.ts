"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const getBoard = async () => {
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

    const board = playgruond.board.split("");

    return board;
  } catch {
    console.log("Что-то пошло не так!");
  }
};

export const getTicTacToePlaygrounds = async () => {
  try {
    const playgruonds = await db.ticTacToePlayGround.findMany({
      orderBy: {
        created: "asc",
      },
      select: {
        id: true,
        inviteCode: true,
        players: true,
      },
    });

    return playgruonds;
  } catch {
    console.log("Что-то пошло не так!");
  }
};
