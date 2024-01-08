"use client";

import { useEffect, useState } from "react";
import { useSocket } from "../providers/SocketProvider";
import { cellState } from "@/actions/cellState";
import { Player } from "@prisma/client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { ScaleLoader } from "react-spinners";

interface Props {
  currentStep: string;
  gameId: string;
  board: string[] | undefined;
  players: Player[] | undefined;
}

export const GameBoard = ({ currentStep, gameId, board, players }: Props) => {
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

    socket.on("message", (data: string[]) => {
      setButtonCont(data);
    });

    return () => {
      socket.disconnect();
    };
  };

  const sendSocketEvent = async (index: number, symbol: string) => {
    const newArray = [...buttonCont];
    newArray[index] = symbol;

    socket.emit("message", newArray);

    await cellState(index, symbol, gameId);
  };

  const renderOverlay = () => {
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

  return (
    <div
      className={`border-2 border-black rounded-xl flex justify-center items-center p-4 relative w-[320px] h-[320px] shadow-2xl dark:bg-slate-900`}
    >
      {/* {renderOverlay()} */}
      <div className="grid grid-cols-3">
        {buttonCont.map((cell, index) => {
          return (
            <>
              <button
                key={index}
                onClick={() => sendSocketEvent(index, currentStep)}
                className={`w-16 h-16 ${
                  currentStep === "O" ? "text-green-600" : "text-rose-600"
                } border dark:border-white border-black flex justify-center items-center text-4xl`}
              >
                {board && (board[index] === "-" ? cell : board[index])}
              </button>
            </>
          );
        })}
      </div>
    </div>
  );
};
