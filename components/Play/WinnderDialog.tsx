"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { Player } from "@prisma/client";
import useWinnderDialog from "@/hooks/useWinnerDialog";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Button } from "../ui/button";
import { TrophyIcon } from "lucide-react";
import Price from "./Price";

interface Props {
  players: Player[] | undefined;
  gameId: string;
}

const WinnderDialog = ({ players, gameId }: Props) => {
  const { isEnd, winner } = useWinnderDialog();

  const user = useCurrentUser();

  if (players) {
    if (winner === "O") {
      return (
        <Dialog open={isEnd}>
          <DialogContent className="w-[400px] rounded-md flex flex-col gap-2 justify-center items-center text-center">
            {user?.id === players[0]?.userId ? (
              <>
                <DialogTitle className="text-3xl uppercase font-medium text-green-600">
                  Победа
                </DialogTitle>
                <DialogDescription className="w-full flex justify-center items-center py-2 gap-4">
                  <div className="flex flex-col justify-center items-center gap-4">
                    <div className="text-4xl flex gap-2 justify-center items-center text-yellow-400">
                      <Price gameId={gameId} /> <TrophyIcon />
                    </div>
                    {/* <p className="text-slate-600 text-sm">
                      Игра закончится через: <span>{seconds}</span>
                    </p> */}
                    <Button asChild variant="destructive">
                      <Link href="/play">Покинуть комнату</Link>
                    </Button>
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
                    <div className="text-4xl flex gap-2 justify-center items-center text-yellow-400">
                      <Price gameId={gameId} minus /> <TrophyIcon />
                    </div>
                    {/* <p className="text-slate-600 text-sm">
                      Игра закончится через: <span>{seconds}</span>
                    </p> */}
                    <Button asChild variant="destructive">
                      <Link href="/play">Покинуть комнату</Link>
                    </Button>
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
          <DialogContent className="w-[400px] rounded-md flex flex-col gap-2 justify-center items-center text-center">
            {user?.id === players[1]?.userId ? (
              <>
                <DialogTitle className="text-3xl uppercase text-center font-medium text-green-600">
                  Победа
                </DialogTitle>
                <DialogDescription className="w-full flex justify-center items-center py-2 gap-4">
                  <div className="flex flex-col justify-center items-center gap-4">
                    <div className="text-4xl flex gap-2 justify-center items-center text-yellow-400">
                      <Price gameId={gameId} /> <TrophyIcon />
                    </div>
                    {/* <p className="text-slate-600 text-sm">
                      Игра закончится через: <span>{seconds}</span>
                    </p> */}
                    <Button asChild variant="destructive">
                      <Link href="/play">Покинуть комнату</Link>
                    </Button>
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
                    <div className="text-4xl flex gap-2 justify-center items-center text-yellow-400">
                      <Price gameId={gameId} minus /> <TrophyIcon />
                    </div>
                    {/* <p className="text-slate-600 text-sm">
                      Игра закончится через: <span>{seconds}</span>
                    </p> */}
                    <Button asChild variant="destructive">
                      <Link href="/play">Покинуть комнату</Link>
                    </Button>
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
        <DialogContent className="w-[400px] rounded-md  flex flex-col gap-2 justify-center items-center text-center">
          <DialogTitle className="text-3xl uppercase font-medium">
            Ничья
          </DialogTitle>
          <DialogDescription className="w-full flex justify-center items-center py-2 gap-4">
            <Button asChild variant="destructive">
              <Link href="/play">Покинуть комнату</Link>
            </Button>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    );
  }
};
export default WinnderDialog;
