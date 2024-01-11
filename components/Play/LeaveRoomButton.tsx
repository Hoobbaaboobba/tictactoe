"use client";

import { leaveRoom } from "@/actions/startGame";
import React, { useTransition } from "react";
import { Button } from "../ui/button";
import { ScaleLoader } from "react-spinners";

interface Props {
  gameId: string;
}
const LeaveRoomButton = ({ gameId }: Props) => {
  const [isPending, startTransition] = useTransition();

  const onDeleteRoom = () => {
    startTransition(async () => {
      await leaveRoom(gameId);
    });
  };
  return (
    <form action={onDeleteRoom}>
      <Button type="submit" onClick={onDeleteRoom} variant="destructive">
        {isPending ? (
          <ScaleLoader color="#ffffff" height={20} width={4} />
        ) : (
          "Выйти"
        )}
      </Button>
    </form>
  );
};

export default LeaveRoomButton;
