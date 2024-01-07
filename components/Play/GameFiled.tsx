"use client";

import PlayersField from "@/components/PlayersField";
import { redirect } from "next/navigation";
import { GameBoard } from "./GameBoard";
import DeleteRoomButton from "./DeleteRoomButton";
import { useEffect, useState, useTransition } from "react";
import { io } from "socket.io-client";
import { Player } from "@prisma/client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { getPlayers } from "@/actions/getPlayers";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import LeaveRoomButton from "./LeaveRoomButton";
import { ScaleLoader } from "react-spinners";
import { exitGame } from "@/actions/startGame";

interface Props {
  players: Player[] | undefined;
  gameId: string;
  board: string[] | undefined;
}

export const GameFiled = ({ players, gameId, board }: Props) => {
  const [socket, setSocket] = useState<any>(undefined);
  const [dialog, setDialog] = useState(true);
  const [playersData, setPlayersData] = useState<Player[] | undefined>();
  const [isPending, startTransition] = useTransition();

  const user = useCurrentUser();

  useEffect(() => {
    const socket = io("http://localhost:3001");

    setPlayersData(players);

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("enter", (data: Player[] | undefined) => {
      setPlayersData(data);
    });

    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  const reloadPlayers = async () => {
    startTransition(async () => {
      const data = await getPlayers(gameId);

      socket.emit("enter", data);

      setDialog(false);
    });
  };

  const onDeleteRoom = () => {
    startTransition(async () => {
      await exitGame(gameId);
    });
  };

  return (
    <div className="w-full flex flex-col gap-4 justify-center items-center overflow-y-auto">
      <PlayersField players={playersData} />
      {playersData && playersData[1] && (
        <>
          {/* <GameInfo
            isDraw={isDraw}
            renderSymbol={renderSymbol}
            winnerSequence={winnerSequence}
            Symbol_o={SYMBOL_O}
            currentStep={currentStep}
            winnerSymbol={winnerSymbol}
          /> */}
          <GameBoard currentStep={"X"} gameId={gameId} board={board} />
          {/* <ResetButton
            winnerSequence={winnerSequence}
            isDraw={isDraw}
            resetGame={resetGame}
          /> */}
        </>
      )}
      {playersData && playersData[1]?.userId === user?.id ? (
        <form action={onDeleteRoom}>
          <Button
            type="submit"
            onClick={reloadPlayers}
            variant="destructive"
            className="w-[300px]"
          >
            {isPending ? (
              <ScaleLoader color="#ffffff" height={20} width={4} />
            ) : (
              "Удалить комнату"
            )}
          </Button>
        </form>
      ) : (
        <DeleteRoomButton gameId={gameId} />
      )}
      {playersData && playersData[1]?.userId === user?.id ? (
        <Dialog open={dialog}>
          <DialogContent className="w-[400px]">
            <DialogHeader>
              <DialogTitle className="text-3xl">Вступить в игру?</DialogTitle>
              <DialogDescription className="w-full flex justify-center items-center py-2 gap-4">
                <Button onClick={reloadPlayers}>
                  {isPending ? (
                    <ScaleLoader color="#000000" height={20} width={4} />
                  ) : (
                    "Да"
                  )}
                </Button>
                <Button variant="outline">Наблюдать</Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ) : null}
    </div>
  );
};
