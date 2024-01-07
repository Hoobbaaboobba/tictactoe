"use client";

import { exitGame } from "@/actions/startGame";
import React, { useTransition } from "react";
import { Button } from "../ui/button";
import { ScaleLoader } from "react-spinners";

interface Props {
  gameId: string;
}
const DeleteRoomButton = ({ gameId }: Props) => {
  const [isPending, startTransition] = useTransition();

  const onDeleteRoom = () => {
    startTransition(async () => {
      await exitGame(gameId);
    });
  };
  return (
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
  );
};

export default DeleteRoomButton;
