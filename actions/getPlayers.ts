"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export const getPlayers = async (gameid: string) => {
  try {
    const user = await currentUser();

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

    await db.user.update({
      where: {
        id: playerId,
      },
      data: {
        points: {
          increment: existringTicTacToePlayground?.prise,
        },
      },
    });
  } catch {
    return { error: "Что-то пошло не так!" };
  }
};

export const decrementPoints = async (playerId: string, gameId: string) => {
  try {
    const user = await currentUser();

    if (!user) {
      return null;
    }

    const newUser = await db.user.findUnique({
      where: {
        id: user.id,
      },
    });

    const existringTicTacToePlayground =
      await db.ticTacToePlayGround.findUnique({
        where: {
          id: gameId,
        },
      });

    if (!existringTicTacToePlayground) {
      return redirect("/play");
    }

    const points: boolean =
      (newUser?.points || 0) < existringTicTacToePlayground?.minus;

    if (points) {
      await db.user.update({
        where: {
          id: playerId,
        },
        data: {
          points: 0,
        },
      });
    }

    await db.user.update({
      where: {
        id: playerId,
      },
      data: {
        points: {
          decrement: existringTicTacToePlayground?.minus,
        },
      },
    });
  } catch {
    return { error: "Что-то пошло не так!" };
  }
};
