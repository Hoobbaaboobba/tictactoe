"use client";

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
import { useTransition } from "react";
import { exitGame } from "@/actions/startGame";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import LoadingState from "../LoadingState";

interface Props {
  players: Player[] | undefined;
  gameId: string;
  prise: number;
  minus: number;
}

const WinnderDialog = ({ players, gameId, prise, minus }: Props) => {
  const { isEnd, winner } = useWinnderDialog();
  const [isPending, startTransition] = useTransition();

  const user = useCurrentUser();

  const handleExit = () => {
    startTransition(async () => {
      await exitGame(gameId);
      redirect("/play");
    });
  };

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
                      +{prise} <TrophyIcon />
                    </div>
                    {/* <p className="text-slate-600 text-sm">
                      Игра закончится через: <span>{seconds}</span>
                    </p> */}
                    <form action={handleExit}>
                      <Button type="submit" variant="destructive">
                        {isPending ? <LoadingState /> : "Покинуть комнату"}
                      </Button>
                    </form>
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
                      -{minus} <TrophyIcon />
                    </div>
                    {/* <p className="text-slate-600 text-sm">
                      Игра закончится через: <span>{seconds}</span>
                    </p> */}
                    <form action={handleExit}>
                      <Button type="submit" variant="destructive">
                        {isPending ? <LoadingState /> : "Покинуть комнату"}
                      </Button>
                    </form>
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
                      +{prise} <TrophyIcon />
                    </div>
                    {/* <p className="text-slate-600 text-sm">
                      Игра закончится через: <span>{seconds}</span>
                    </p> */}
                    <form action={handleExit}>
                      <Button type="submit" variant="destructive">
                        {isPending ? <LoadingState /> : "Покинуть комнату"}
                      </Button>
                    </form>
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
                      -{minus} <TrophyIcon />
                    </div>
                    {/* <p className="text-slate-600 text-sm">
                      Игра закончится через: <span>{seconds}</span>
                    </p> */}
                    <form action={handleExit}>
                      <Button type="submit" variant="destructive">
                        {isPending ? <LoadingState /> : "Покинуть комнату"}
                      </Button>
                    </form>
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
            <form action={handleExit}>
              <Button type="submit" variant="destructive">
                {isPending ? <LoadingState /> : "Покинуть комнату"}
              </Button>
            </form>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    );
  }
};
export default WinnderDialog;
