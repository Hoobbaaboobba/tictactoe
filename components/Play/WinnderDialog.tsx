"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Player } from "@prisma/client";
import { decrementPoints, incrementPoints } from "@/actions/getPlayers";
import { Crown, GraduationCap, TrophyIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { exitGame } from "@/actions/startGame";
import useWinnderDialog from "@/hooks/useWinnerDialog";
import Link from "next/link";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

interface Props {
  players: Player[] | undefined;
  gameId: string;
  board: string[];
  prise: number;
  minus: number;
}

const WinnderDialog = ({ players, gameId, board, prise, minus }: Props) => {
  const { isEnd, winner, resetEnd, resetWinner } = useWinnderDialog();

  if (players) {
    if (isEnd && winner === "O") {
      if (isEnd && winner) {
        incrementPoints(players[0]?.userId, gameId);
        decrementPoints(players[1]?.userId, gameId);

        exitGame(gameId);

        setTimeout(() => {
          resetEnd();
          resetWinner();
          redirect("/play");
        }, 5000);

        return (
          <Dialog open>
            <DialogContent className="w-[400px] rounded-md">
              <DialogHeader>
                <DialogTitle className="text-3xl">
                  Победил {players[0]?.name}
                </DialogTitle>
                <DialogDescription className="w-full flex justify-center items-center py-2 gap-4">
                  <div className="flex flex-col justify-center items-center gap-4">
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
                              {players[0]?.points} + {prise}
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
                              {players[1]?.points} -{" "}
                              {players[1]?.points !== 0 ? minus : 0}
                            </p>{" "}
                            <TrophyIcon className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                    <Link href="/play">Покинуть комнату</Link>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        );
      }
    }

    if (isEnd && winner === "X") {
      incrementPoints(players[1]?.userId, gameId);
      decrementPoints(players[0]?.userId, gameId);

      exitGame(gameId);

      setTimeout(() => {
        resetEnd();
        resetWinner();
        redirect("/play");
      }, 5000);

      return (
        <Dialog open>
          <DialogContent className="w-[400px] rounded-md">
            <DialogHeader>
              <DialogTitle className="text-3xl">
                Победил {players[1]?.name}
              </DialogTitle>
              <DialogDescription className="w-full flex justify-center items-center py-2 gap-4">
                <div className="flex flex-col justify-center items-center gap-4">
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
                            {players[1]?.points} + {prise}
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
                            {players[0]?.points} -{" "}
                            {players[0]?.points !== 0 ? minus : 0}
                          </p>{" "}
                          <TrophyIcon className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link href="/play">Покинуть комнату</Link>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
    }

    if (isEnd) {
      exitGame(gameId);

      setTimeout(() => {
        resetEnd();
        resetWinner();
        redirect("/play");
      }, 5000);
      return (
        <Dialog open>
          <DialogContent className="w-[400px] rounded-md">
            <DialogHeader>
              <DialogTitle className="text-3xl">Ничья</DialogTitle>
              <DialogDescription className="w-full flex justify-center items-center py-2 gap-4">
                <Link href="/play">Покинуть комнату</Link>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
    }
  }
};

export default WinnderDialog;
