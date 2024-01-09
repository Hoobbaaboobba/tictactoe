"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const getPlayers = async (gameid: string) => {
  try {
    const user = currentUser();

    if (!user) {
      return null;
    }

    const players = await db.ticTacToePlayGround.findFirst({
      where: {
        id: gameid,
      },
      select: {
        players: true,
      },
    });

    return players?.players;
  } catch {
    return { error: "Что-то пошло не так!" };
  }
};

export const givePoints = async (playerId: string, currentCoins: number) => {
  try {
    const user = currentUser();

    if (!user) {
      return null;
    }

    await db.user.update({
      where: {
        id: playerId,
      },
      data: {
        points: currentCoins,
      },
    });
  } catch {
    return { error: "Что-то пошло не так!" };
  }
};
