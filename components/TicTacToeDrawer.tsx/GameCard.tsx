"use client";

import { Card, CardContent, CardFooter } from "../ui/card";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Player } from "@prisma/client";
import { useTransition } from "react";
import { start } from "repl";
import { useRouter } from "next/navigation";
import LoadingState from "../LoadingState";

interface Props {
  playground: {
    id: string;
    inviteCode: string;
    players: Player[];
  };
}

const GameCard = ({ playground }: Props) => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handlePlay = () => {
    startTransition(() => {
      router.push(
        `${process.env.NEXT_PUBLIC_APP_URL}/invite/${playground.inviteCode}`
      );
    });
  };
  return (
    <Card>
      <CardContent className="flex flex-col justify-center items-center py-2">
        <div className="">
          1 - {playground.players[0]?.name}{" "}
          <span className="text-green-600"> O</span>
        </div>
        {playground.players[1] && (
          <div>
            2 - {playground.players[1]?.name}{" "}
            <span className="text-rose-600">X</span>
          </div>
        )}
        <Separator className="my-2" />
        <div>{playground.players.length} / 2</div>
      </CardContent>
      <CardFooter>
        <Button disabled={isPending} className="w-full" onClick={handlePlay}>
          {isPending ? <LoadingState /> : "Играть"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GameCard;
