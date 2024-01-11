import { db } from "@/lib/db";
import { Player, TicTacToePlayGround, User } from "@prisma/client";
import { cache } from "react";

class TicTacToeRepository {
  getTicTacToePlaygrounds = cache((): Promise<TicTacToePlayGround[]> => {
    return db.ticTacToePlayGround.findMany();
  });

  getPlayers = cache((game: TicTacToePlayGround): Promise<Player[]> => {
    return db.player.findMany({
      where: {
        playGroundId: game.id,
      },
    });
  });

  createTicTacToePlayground = (user: User): Promise<TicTacToePlayGround> => {
    return db.ticTacToePlayGround.create({
      data: {
        userId: user.id,
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
  };

  deleteTciTacToePlayground = (game: TicTacToePlayGround) => {
    return db.ticTacToePlayGround.delete({
      where: {
        id: game.id,
      },
    });
  };

  exitTicTacToePlayground = (player: Player) => {
    return db.player.delete({
      where: {
        userId: player.userId,
      },
    });
  };

  enterTicTacToeGame = (user: User, game: TicTacToePlayGround) => {
    return db.player.create({
      data: {
        playGroundId: game.id,
        userId: user.id,
      },
    });
  };
}

export const ticTacToeRepository = new TicTacToeRepository();
