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

export const incrementPoints = async (playerId: string, gameId: string) => {
  try {
    const user = currentUser();

    if (!user) {
      return null;
    }

    const updatePoints = await db.ticTacToePlayGround.update({
      where: {
        id: gameId,
      },
      data: {
        prise: 28,
      },
    });

    await db.user.update({
      where: {
        id: playerId,
      },
      data: {
        points: updatePoints?.prise,
      },
    });
  } catch {
    return { error: "Что-то пошло не так!" };
  }
};

export const decrementPoints = async (playerId: string, gameId: string) => {
  try {
    const user = currentUser();

    if (!user) {
      return null;
    }

    const updatePoints = await db.ticTacToePlayGround.update({
      where: {
        id: gameId,
      },
      data: {
        minus: 15,
      },
    });

    await db.user.update({
      where: {
        id: playerId,
      },
      data: {
        points: updatePoints.minus,
      },
    });
  } catch {
    return { error: "Что-то пошло не так!" };
  }
};
