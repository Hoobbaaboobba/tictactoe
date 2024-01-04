"use client";

import { cellState } from "@/actions/cellState";
import { useEffect, useTransition } from "react";
import { PuffLoader } from "react-spinners";

interface Props {
  cell: string | null;
  index: number;
  currentStep: string;
  board: string[] | null | undefined;
  gameId: string;
}

const Cell = ({ cell, index, currentStep, board, gameId }: Props) => {
  const [isPending, startTransition] = useTransition();

  useEffect(() => {});

  const onClick = () => {
    startTransition(async () => {
      await cellState(index, currentStep, gameId);
    });
  };

  return (
    <button
      key={index}
      type="submit"
      onClick={onClick}
      className={`w-16 h-16 border dark:border-white border-black flex justify-center items-center text-4xl`}
    >
      {board &&
        (isPending ? (
          <>
            <span className="dark:hidden block">
              <PuffLoader color="#ffffff" size={20} />
            </span>
            <span className="hidden dark:block">
              <PuffLoader color="#000000" size={20} />
            </span>
          </>
        ) : board[index] === "-" ? (
          ""
        ) : (
          board[index]
        ))}
    </button>
  );
};

export default Cell;
