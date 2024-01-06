"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Button } from "../ui/button";
import { useSocket } from "../providers/SocketProvider";
import { Input } from "../ui/input";
import { cellState } from "@/actions/cellState";

interface Props {
  currentStep: string;
  gameId: string;
  board: string[] | undefined;
}

export const GameBoard = ({ currentStep, gameId, board }: Props) => {
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState<any>(undefined);
  const [message, setMessage] = useState("");
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

  useEffect(() => {
    const socket = io("http://localhost:3000");

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("message", (data: string[]) => {
      setButtonCont(data);
    });

    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendSocketEvent = async (index: number, symbol: string) => {
    const newArray = [...buttonCont];
    newArray[index] = symbol;

    socket.emit("message", newArray);

    await cellState(index, symbol, gameId);
  };

  return (
    <div
      className={`border-2 border-black rounded-xl flex justify-center items-center p-4 relative w-[320px] h-[320px] shadow-2xl dark:bg-slate-900`}
    >
      <div className="grid grid-cols-3">
        {buttonCont.map((cell, index) => {
          return (
            <>
              {/* <Cell
                key={index}
                gameId={gameId}
                index={index}
                cell={cell}
                currentStep={currentStep}
                board={board}
                // incomingMoves={incomingMoves}
              /> */}
              <button
                key={index}
                onClick={() => sendSocketEvent(index, "X")}
                className={`w-16 h-16 border dark:border-white border-black flex justify-center items-center text-4xl`}
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
