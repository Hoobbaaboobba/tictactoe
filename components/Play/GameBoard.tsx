"use client";

import { cellState } from "@/actions/cellState";
import Cell from "../Cell";
import { currentUser } from "@/lib/auth";
import { getBoard } from "@/actions/getBoard";
import { useEffect, useState } from "react";
import { pusherClient } from "@/pusher";

interface Props {
  currentStep: string;
  gameId: string;
  board: string[] | undefined;
}

export const GameBoard = ({ currentStep, gameId, board }: Props) => {
  // const [incomingMoves, setIncomingMoves] = useState<string[]>([]);
  const cells = ["", "", "", "", "", "", "", "", ""];

  // useEffect(() => {
  //   pusherClient.subscribe(gameId);

  //   pusherClient.bind("incoming-moves", (move: string, index: number) => {
  //     setIncomingMoves((prev) => [...prev, move]);
  //   });

  //   return () => {
  //     pusherClient.unsubscribe(gameId);
  //   };
  // });

  return (
    <div
      className={`border-2 border-black rounded-xl flex justify-center items-center p-4 relative w-[320px] h-[320px] shadow-2xl dark:bg-slate-900`}
    >
      <div className="grid grid-cols-3">
        {cells.map((cell, index) => {
          return (
            <Cell
              key={index}
              gameId={gameId}
              index={index}
              cell={cell}
              currentStep={currentStep}
              board={board}
              // incomingMoves={incomingMoves}
            />
          );
        })}
      </div>
    </div>
  );
};
