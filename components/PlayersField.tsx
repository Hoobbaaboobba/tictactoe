import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { redirect } from "next/navigation";
import { ScaleLoader } from "react-spinners";
import { Crown, GraduationCap } from "lucide-react";
import { io } from "socket.io-client";
import { Player } from "@prisma/client";

interface Props {
  players: Player[] | undefined;
}

const PlayersField = ({ players }: Props) => {
  if (players === undefined) {
    return;
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-8 items-center border-2 dark:bg-slate-900 border-black p-4 rounded-2xl shadow-lg mb-4">
      <div className="flex gap-6 justify-center items-center">
        <div className="flex relative gap-4 justify-center items-center">
          {players[0]?.role === "GOD" && (
            <Crown className="absolute -top-[17px] left-2 text-yellow-400" />
          )}
          {players[0]?.role === "ADMIN" && (
            <GraduationCap className="absolute -top-[17px] left-2" />
          )}
          <Avatar>
            <AvatarImage
              src={players[0]?.image || "https://github.com/shadcn.png"}
            />
            <AvatarFallback>X|O</AvatarFallback>
          </Avatar>
          <div className="">
            <h1 className="text-lg dots font-bold">{players[0]?.name}</h1>
            <p className="opacity-50 text-sm">
              Рейтинг: <span>{players[0]?.points}</span>
            </p>
          </div>
        </div>
        <div className="w-8 h-8 flex justify-center items-center text-green-600">
          {}
        </div>
      </div>
      <div className="text-3xl font-bold">VS</div>
      <div className="flex gap-6 justify-center items-center">
        {players[1] ? (
          <>
            <div className="flex relative gap-4 justify-center items-center">
              {players[1]?.role === "GOD" && (
                <Crown className="absolute -top-[17px] left-2 text-yellow-400" />
              )}
              {players[1]?.role === "ADMIN" && (
                <GraduationCap className="absolute -top-[17px] left-2" />
              )}
              <Avatar>
                <AvatarImage
                  src={players[1]?.image || "https://github.com/shadcn.png"}
                />
                <AvatarFallback>X|O</AvatarFallback>
              </Avatar>
              <div className="">
                <h1 className="text-lg dots font-bold">{players[1]?.name}</h1>
                <p className="opacity-50 text-sm">
                  Рейтинг: <span>2</span>
                </p>
              </div>
            </div>
            <div className="w-8 h-8 flex justify-center items-center text-rose-600">
              {}
            </div>
          </>
        ) : (
          <ScaleLoader color="#000000" height={20} width={4} />
        )}
      </div>
    </div>
  );
};

export default PlayersField;
