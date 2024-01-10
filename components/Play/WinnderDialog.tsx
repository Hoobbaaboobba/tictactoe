"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Player } from "@prisma/client";
import useWinnderDialog from "@/hooks/useWinnerDialog";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Button } from "../ui/button";
import { TrophyIcon } from "lucide-react";

interface Props {
  players: Player[] | undefined;
  gameId: string;
  board: string[];
  prise: number;
  minus: number;
}

const WinnderDialog = ({ players, gameId, board, prise, minus }: Props) => {
  const [timer, setTimer] = useState(8);

  const { isEnd, winner } = useWinnderDialog();

  const user = useCurrentUser();

  useEffect(() => {
    if (isEnd) {
      const intervalId = setInterval(() => {
        setTimer((prevSeconds) => prevSeconds - 1);
      }, 1000);

      if (timer === 0) {
        return;
      }

      return () => clearInterval(intervalId);
    }
  }, []);

  if (players) {
    if (winner === "O") {
      return (
        <Dialog open={isEnd}>
          <DialogContent className="w-[400px] rounded-md">
            {user?.id === players[0]?.userId ? (
              <>
                <DialogTitle className="text-3xl uppercase font-medium text-green-600">
                  Победа
                </DialogTitle>
                <DialogDescription className="w-full flex justify-center items-center py-2 gap-4">
                  <div className="flex flex-col justify-center items-center gap-4">
                    <div className="text-4xl font-medium text-yellow-500">
                      {prise} <TrophyIcon />
                    </div>
                    <p className="text-slate-600 text-sm">
                      Игра закончится через: <span>{timer}</span>
                    </p>
                  </div>
                </DialogDescription>
              </>
            ) : (
              <>
                <DialogTitle className="text-3xl uppercase font-medium text-rose-600">
                  Поражение
                </DialogTitle>
                <DialogDescription className="w-full flex justify-center items-center py-2 gap-4">
                  <div className="flex flex-col justify-center items-center gap-4">
                    <div className="text-4xl font-medium text-yellow-500">
                      - {minus} <TrophyIcon />
                    </div>
                    <p className="text-slate-600 text-sm">
                      Игра закончится через: <span>{timer}</span>
                    </p>
                  </div>
                </DialogDescription>
              </>
            )}
          </DialogContent>
        </Dialog>
      );
    }

    if (winner === "X") {
      return (
        <Dialog open={isEnd}>
          <DialogContent className="w-[400px] rounded-md">
            {user?.id === players[1]?.userId ? (
              <>
                <DialogTitle className="text-3xl uppercase text-center font-medium text-green-600">
                  Победа
                </DialogTitle>
                <DialogDescription className="w-full flex justify-center items-center py-2 gap-4">
                  <div className="flex flex-col justify-center items-center gap-4">
                    <div className="text-4xl font-medium text-yellow-500">
                      {prise} <TrophyIcon />
                    </div>
                    <p className="text-slate-600 text-sm">
                      Игра закончится через: <span>{timer}</span>
                    </p>
                  </div>
                </DialogDescription>
              </>
            ) : (
              <>
                <DialogTitle className="text-3xl uppercase font-medium text-rose-600">
                  Поражение
                </DialogTitle>
                <DialogDescription className="w-full flex justify-center items-center py-2 gap-4">
                  <div className="flex flex-col justify-center items-center gap-4">
                    <div className="text-4xl font-medium text-yellow-500">
                      - {minus} <TrophyIcon />
                    </div>
                    <p className="text-slate-600 text-sm">
                      Игра закончится через: <span>{timer}</span>
                    </p>
                  </div>
                </DialogDescription>
              </>
            )}
          </DialogContent>
        </Dialog>
      );
    }

    return (
      <Dialog open={isEnd}>
        <DialogContent className="w-[400px] rounded-md">
          <DialogHeader>
            <DialogTitle className="text-3xl uppercase font-medium">
              Ничья
            </DialogTitle>
            <DialogDescription className="w-full flex justify-center items-center py-2 gap-4">
              <p className="text-slate-600 text-sm">
                Игра закончится через: <span>{timer}</span>
              </p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }
};
export default WinnderDialog;
