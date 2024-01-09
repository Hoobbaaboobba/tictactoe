import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Player } from "@prisma/client";
import { givePoints } from "@/actions/getPlayers";
import AccountInfo from "../AccountInfo";
import { Crown, GraduationCap, TrophyIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { exitGame } from "@/actions/startGame";
import DeleteRoomButton from "./DeleteRoomButton";

interface Props {
  winner: string;
  players: Player[] | undefined;
  gameId: string;
}

const WinnderDialog = async ({ winner, players, gameId }: Props) => {
  const prise = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
  };

  const randomPrise: number = prise(24, 34);
  const randomMinus: number = prise(8, 15);

  if (players) {
    if (winner === "O") {
      const pointsSum = players[0].points
        ? players[0].points + randomPrise
        : randomPrise;
      const pointsMinus = players[1].points
        ? players[1].points - randomMinus
        : 0;

      await givePoints(players[0].userId, pointsSum);
      await givePoints(players[1].userId, pointsMinus);

      // setTimeout(() => {
      //   (async function () {
      //     await exitGame(gameId);
      //   });
      // }, 10000);

      return (
        <Dialog open>
          <DialogContent className="w-[400px] rounded-md">
            <DialogHeader>
              <DialogTitle className="text-3xl">
                Победил {players[0]?.name}
              </DialogTitle>
              <DialogDescription className="w-full flex justify-center items-center py-2 gap-4">
                <div className="flex flex-col justify-center items-center">
                  <div className="flex relative gap-4 justify-center items-center">
                    {players[0]?.role === "GOD" && (
                      <Crown className="absolute -top-[17px] left-2 text-yellow-400" />
                    )}
                    {players[0]?.role === "ADMIN" && (
                      <GraduationCap className="absolute -top-[17px] left-2" />
                    )}
                    <Avatar>
                      <AvatarImage
                        src={
                          players[0]?.image || "https://github.com/shadcn.png"
                        }
                      />
                      <AvatarFallback>X|O</AvatarFallback>
                    </Avatar>
                    <div className="">
                      <h1 className="text-lg dots font-bold">
                        {players[0]?.name}
                      </h1>
                      <div className="opacity-50 text-sm flex gap-1 justify-center items-center">
                        <p>Рейтинг:</p>
                        <span className="flex gap-1 justify-center items-center text-yellow-500">
                          <p className="font-medium">
                            {players[0]?.points} + {randomPrise}
                          </p>{" "}
                          <TrophyIcon className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex relative gap-4 justify-center items-center">
                    {players[1]?.role === "GOD" && (
                      <Crown className="absolute -top-[17px] left-2 text-yellow-400" />
                    )}
                    {players[1]?.role === "ADMIN" && (
                      <GraduationCap className="absolute -top-[17px] left-2" />
                    )}
                    <Avatar>
                      <AvatarImage
                        src={
                          players[1]?.image || "https://github.com/shadcn.png"
                        }
                      />
                      <AvatarFallback>X|O</AvatarFallback>
                    </Avatar>
                    <div className="">
                      <h1 className="text-lg dots font-bold text-rose-600">
                        {players[1]?.name}
                      </h1>
                      <div className="opacity-50 text-sm flex gap-1 justify-center items-center">
                        <p>Рейтинг:</p>
                        <span className="flex gap-1 justify-center items-center text-yellow-500">
                          <p className="font-medium">
                            {players[1]?.points} - {randomMinus}
                          </p>{" "}
                          <TrophyIcon className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <DeleteRoomButton gameId={gameId} />
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
    }
    if (winner === "X") {
      const pointsSum = players[1].points
        ? players[1].points + randomPrise
        : randomPrise;
      const pointsMinus = players[0].points
        ? players[0].points - randomMinus
        : 0;

      await givePoints(players[1].userId, pointsSum);
      await givePoints(players[0].userId, pointsMinus);

      // setTimeout(() => {
      //   (async function () {
      //     await exitGame(gameId);
      //   });
      // }, 10000);

      return (
        <Dialog open>
          <DialogContent className="w-[400px] rounded-md">
            <DialogHeader>
              <DialogTitle className="text-3xl">
                Победил {players[1]?.name}
              </DialogTitle>
              <DialogDescription className="w-full flex justify-center items-center py-2 gap-4">
                <div className="flex flex-col justify-center items-center gap-2">
                  <div className="flex relative gap-4 justify-center items-center">
                    {players[1]?.role === "GOD" && (
                      <Crown className="absolute -top-[17px] left-2 text-yellow-400" />
                    )}
                    {players[1]?.role === "ADMIN" && (
                      <GraduationCap className="absolute -top-[17px] left-2" />
                    )}
                    <Avatar>
                      <AvatarImage
                        src={
                          players[1]?.image || "https://github.com/shadcn.png"
                        }
                      />
                      <AvatarFallback>X|O</AvatarFallback>
                    </Avatar>
                    <div className="">
                      <h1 className="text-lg dots font-bold">
                        {players[1]?.name}
                      </h1>
                      <div className="opacity-50 text-sm flex gap-1 justify-center items-center">
                        <p>Рейтинг:</p>
                        <span className="flex gap-1 justify-center items-center text-yellow-500">
                          <p className="font-medium">
                            {players[1]?.points} + {randomPrise}
                          </p>{" "}
                          <TrophyIcon className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex relative gap-4 justify-center items-center">
                    {players[0]?.role === "GOD" && (
                      <Crown className="absolute -top-[17px] left-2 text-yellow-400" />
                    )}
                    {players[0]?.role === "ADMIN" && (
                      <GraduationCap className="absolute -top-[17px] left-2" />
                    )}
                    <Avatar>
                      <AvatarImage
                        src={
                          players[0]?.image || "https://github.com/shadcn.png"
                        }
                      />
                      <AvatarFallback>X|O</AvatarFallback>
                    </Avatar>
                    <div className="">
                      <h1 className="text-lg dots font-bold text-rose-600">
                        {players[0]?.name}
                      </h1>
                      <div className="opacity-50 text-sm flex gap-1 justify-center items-center">
                        <p>Рейтинг:</p>
                        <span className="flex gap-1 justify-center items-center text-yellow-500">
                          <p className="font-medium">
                            {players[0]?.points} - {randomMinus}
                          </p>{" "}
                          <TrophyIcon className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <DeleteRoomButton gameId={gameId} />
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
    }

    if (winner === "draw") {
      // setTimeout(() => {
      //   (async function () {
      //     await exitGame(gameId);
      //   });
      // }, 10000);

      return (
        <Dialog open>
          <DialogContent className="w-[400px] rounded-md">
            <DialogHeader>
              <DialogTitle className="text-3xl">Ничья</DialogTitle>
              <DialogDescription className="w-full flex justify-center items-center py-2 gap-4">
                <DeleteRoomButton gameId={gameId} />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
    }
  }
};

export default WinnderDialog;
