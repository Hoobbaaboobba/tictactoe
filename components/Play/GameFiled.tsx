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
import { exitGame, leaveRoom } from "@/actions/startGame";
import GameInfo from "../GameInfo";
import { useSocket } from "../providers/SocketProvider";

interface Props {
  players: Player[] | undefined;
  gameId: string;
  board: string[] | undefined;
}

export const GameFiled = ({ players, gameId, board }: Props) => {
  // const [socket, setSocket] = useState<any>(undefined);
  const [dialog, setDialog] = useState(true);
  const [playersData, setPlayersData] = useState<Player[] | undefined>();
  const [isPending, startTransition] = useTransition();
  const [currentStep, setCurrentStep] = useState("O");

  const user = useCurrentUser();

  const { socket } = useSocket();

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    setPlayersData(players);

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("enter", (data: Player[] | undefined) => {
      setPlayersData(data);
    });

    return () => {
      socket.disconnect();
    };
  };

  const reloadPlayers = async () => {
    startTransition(async () => {
      const data = await getPlayers(gameId);

      socket.emit("enter", data);

      setDialog(false);
    });
  };

  const onLeaveRoom = async () => {
    startTransition(async () => {
      if (playersData) {
        await leaveRoom(gameId, playersData[1].userId);
        reloadPlayers();
        redirect("/play");
      }
    });
  };

  const onDeleteRoom = async () => {
    startTransition(async () => {
      await exitGame(gameId);
      reloadPlayers();
      redirect("/play");
    });
  };

  const renderDialog = () => {
    if (!playersData) {
      return null;
    }

    if (playersData[1]?.userId === user?.id) {
      return (
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
      );
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 justify-center items-center overflow-y-auto">
      <PlayersField players={playersData} />
      {playersData && playersData[1] && (
        <>
          <GameInfo currentStep={currentStep} />
          <GameBoard
            players={playersData}
            currentStep={currentStep}
            gameId={gameId}
            board={board}
          />
          {/* <ResetButton
            winnerSequence={winnerSequence}
            isDraw={isDraw}
            resetGame={resetGame}
          /> */}
        </>
      )}
      {playersData && playersData[1]?.userId === user?.id ? (
        <form action={onLeaveRoom}>
          <Button
            type="submit"
            onClick={onLeaveRoom}
            variant="destructive"
            className="w-[300px]"
          >
            {isPending ? (
              <ScaleLoader color="#ffffff" height={20} width={4} />
            ) : (
              "Покинуть комнату"
            )}
          </Button>
        </form>
      ) : (
        <form action={onDeleteRoom}>
          <Button
            type="submit"
            onClick={onDeleteRoom}
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
      )}
      {renderDialog()}
    </div>
  );
};
