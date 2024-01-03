"use client";

import { cellState } from "@/actions/cellState";
import { useEffect, useState, useTransition } from "react";
import { useSocket } from "./providers/SocketProvider";
import { getBoard } from "@/actions/getBoard";
import { useRouter } from "next/navigation";

interface Props {
  cell: string | null;
  index: number;
  currentStep: string;
  board: string[] | null | undefined;
}

const Cell = ({ cell, index, currentStep, board }: Props) => {
  const [isPending, startTransition] = useTransition();
  // const [data, setData] = useState<string[] | null | undefined>([]);
  const { socket } = useSocket();

  const router = useRouter();

  // useEffect(() => {
  //   if (socket) {
  //     socket.on("dataUpdated", (updatedData: any) => {
  //       setData(updatedData);
  //     });
  //   }
  // }, []);

  const onClick = () => {
    startTransition(() => {
      cellState(index, currentStep);
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
