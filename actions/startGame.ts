"use server";

import { v4 as uuidv4 } from "uuid";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { TicTacToeTeam } from "@prisma/client";

export const startGame = async () => {
  try {
    const user = await currentUser();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    if (!user) {
      return null;
    }

    const playground = await db.ticTacToePlayGround.create({
      data: {
        userId: user.id,
        inviteCode: uuidv4(),
        players: {
          create: [
            {
              name: user.name,
              userId: user.id,
              team: TicTacToeTeam.CIRCLE,
            },
          ],
        },
      },
    });

    return playground;
  } catch {
    return { error: "Что-то пошло не так!" };
  }
};
