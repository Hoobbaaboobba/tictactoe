"use client";

import PlayersField from "@/components/PlayersField";
import { redirect } from "next/navigation";
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
import { cellState } from "@/actions/cellState";
import WinnderDialog from "./WinnderDialog";
import DeleteRoomButton from "./DeleteRoomButton";
import { setStep } from "@/actions/setStep";
import useWinnderDialog from "@/hooks/useWinnerDialog";

interface Props {
  players: Player[] | undefined;
  gameId: string;
  board: string[] | undefined;
  currentSymbol: string;
}

export const GameFiled = ({ players, gameId, board, currentSymbol }: Props) => {
  // const [socket, setSocket] = useState<any>(undefined);
  const [dialog, setDialog] = useState<boolean>(true);
  const [playersData, setPlayersData] = useState<Player[] | undefined>(players);
  const [isPending, startTransition] = useTransition();
  const [currentStep, setCurrentStep] = useState<string>(currentSymbol);

  const { onEnd, onDraw, onWinnerO, onWinnerX } = useWinnderDialog();

  const [buttonCont, setButtonCont] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const user = useCurrentUser();

  const { socket } = useSocket();

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("enter", (data: Player[] | undefined) => {
      setPlayersData(data);
    });

    socket.on("step", (data: string) => {
      if (data === "O") {
        setCurrentStep("X");
      } else {
        setCurrentStep("O");
      }
    });

    socket.on("message", (data: string[]) => {
      setButtonCont(data);
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

  const RenderOverlay = () => {
    if (players && user) {
      if (
        (players[0].userId === user.id && players[0].symbol !== currentStep) ||
        (players[1]?.userId === user.id && players[1]?.symbol !== currentStep)
      ) {
        return (
          <div
            className={`absolute w-full h-full flex justify-center items-end rounded-xl top-0 left-0 bg-black/25 dark:bg-black/75`}
          >
            <div className="flex gap-2 my-2 justify-center items-center">
              <span className="dark:block hidden">
                <ScaleLoader color="#ffffff" height={20} width={4} />
              </span>{" "}
              <span className="dark:hidden block">
                <ScaleLoader color="#000000" height={20} width={4} />
              </span>
            </div>
          </div>
        );
      }

      return null;
    }
  };

  const RenderDialog = () => {
    if (!playersData) {
      return null;
    }

    if (playersData[1]?.userId === user?.id) {
      return (
        <Dialog open={dialog}>
          <DialogContent className="w-[400px] rounded-md">
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

  const sendSocketEvent = async (index: number, symbol: string) => {
    const newArray = [...buttonCont];
    newArray[index] = symbol;

    socket.emit("message", newArray);

    socket.emit("step", currentStep);

    await cellState(index, symbol, gameId);
    await setStep(currentStep, gameId);
  };

  return (
    <div className="w-full flex flex-col gap-4 justify-center items-center overflow-y-auto">
      <PlayersField players={playersData} />
      {playersData && playersData[1] && (
        <>
          <GameInfo currentStep={currentSymbol} />
          <div
            className={`border-2 border-black rounded-xl flex justify-center items-center p-4 relative w-[320px] h-[320px] shadow-2xl dark:bg-slate-900`}
          >
            <RenderOverlay />
            <div className="grid grid-cols-3">
              {buttonCont.map((cell, index) => {
                return (
                  <>
                    <button
                      key={index}
                      onClick={() => sendSocketEvent(index, currentStep)}
                      className={`w-16 h-16 ${
                        board &&
                        (cell === "O" ? "text-green-600" : "text-rose-600")
                      } border dark:border-white border-black flex justify-center items-center text-4xl`}
                    >
                      {board && (board[index] === "-" ? cell : board[index])}
                    </button>
                  </>
                );
              })}
            </div>
          </div>
        </>
      )}
      {playersData && playersData[1]?.userId === user?.id ? (
        ""
      ) : (
        <DeleteRoomButton gameId={gameId} />
      )}
      <RenderDialog />
    </div>
  );
};
