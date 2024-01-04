"use client";

import { cellState } from "@/actions/cellState";
import { useEffect, useState, useTransition } from "react";
import { useSocket } from "./providers/SocketProvider";
import { getBoard } from "@/actions/getBoard";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";

interface Props {
  cell: string | null;
  index: number;
  currentStep: string;
  board: string[] | null | undefined;
  gameId: string;
}

const Cell = ({ cell, index, currentStep, board, gameId }: Props) => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const onClick = () => {
    startTransition(() => {
      cellState(index, currentStep, gameId);
    });
  };

  return (
    <button
      key={index}
      type="submit"
      onClick={onClick}
      className={`w-16 h-16 border dark:border-white border-black flex justify-center items-center text-4xl`}
    >
      {board && (board[index] === "-" ? "" : board[index])}
    </button>
  );
};

export default Cell;
