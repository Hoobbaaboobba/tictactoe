"use client";

import { exitGame } from "@/actions/startGame";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { Button } from "../ui/button";
import { ScaleLoader } from "react-spinners";

const DeleteRoomButton = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onDeleteRoom = () => {
    startTransition(() => {
      exitGame();
      router.refresh();
    });
  };
  return (
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
  );
};

export default DeleteRoomButton;
