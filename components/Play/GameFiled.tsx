"use client";

import { exitGame } from "@/actions/startGame";
import Cell from "@/components/Cell";
import GameInfo from "@/components/GameInfo";
import PlayersField from "@/components/PlayersField";
import ResetButton from "@/components/ResetButton";
import useGameState from "@/components/useGameState";
import { redirect, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { ScaleLoader } from "react-spinners";

interface Props {
  players:
    | {
        id: string;
        team: "CROSS" | "CIRCLE";
        role: "GOD" | "ADMIN" | "PLAYER";
        name: string | null;
        image: string | null;
        points: number | null;
        userId: string;
        playGroundId: string;
        createdAt: Date;
        updatedAt: Date;
      }[]
    | undefined;
}

export const GameFiled = ({ players }: Props) => {
  const [isPending, startTransition] = useTransition();
  const renderSymbol = (cell: any) => (
    <span
      className={`${
        cell === SYMBOL_O ? "text-green-600" : "text-rose-600"
      } w-full h-full flex justify-center items-center`}
    >
      {cell}
    </span>
  );

  const {
    currentStep,
    SYMBOL_O,
    isDraw,
    winnerSequence,
    winnerSymbol,
    cells,
    handleClick,
    resetGame,
  } = useGameState();

  const router = useRouter();

  const onDeleteRoom = () => {
    startTransition(() => {
      exitGame();
      router.refresh();
    });
  };

  if (players === undefined) {
    return redirect("/play");
  }

  return (
    <div className="w-full flex flex-col gap-4 justify-center items-center overflow-y-auto">
      <PlayersField players={players} />
      {players[1] && (
        <>
          <GameInfo
            isDraw={isDraw}
            renderSymbol={renderSymbol}
            winnerSequence={winnerSequence}
            Symbol_o={SYMBOL_O}
            currentStep={currentStep}
            winnerSymbol={winnerSymbol}
          />
          <div
            className={`border-2 border-black rounded-xl flex justify-center items-center p-4 relative w-[320px] h-[320px] shadow-2xl dark:bg-slate-900 ${
              currentStep === SYMBOL_O ? "green-anim" : "red-anim"
            }`}
          >
            <div className="grid grid-cols-3">
              {cells.map((cell, index) => {
                const isWinner = winnerSequence?.includes(index);
                return (
                  <Cell
                    key={index}
                    isWinner={isWinner}
                    cell={cell}
                    handleClick={handleClick}
                    renderSymbol={renderSymbol}
                    index={index}
                  />
                );
              })}
            </div>
          </div>
          <ResetButton
            winnerSequence={winnerSequence}
            isDraw={isDraw}
            resetGame={resetGame}
          />
        </>
      )}
      <Button
        type="submit"
        onClick={onDeleteRoom}
        variant="destructive"
        className="w-[300px]"
      >
        {isPending ? (
          <ScaleLoader color="#000000" height={20} width={4} />
        ) : (
          "Покинуть комнату"
        )}
      </Button>
    </div>
  );
};
