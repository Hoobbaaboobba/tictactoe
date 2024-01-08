import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Player } from "@prisma/client";
import { givePoints } from "@/actions/getPlayers";
import AccountInfo from "../AccountInfo";
import { Crown, GraduationCap } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { exitGame } from "@/actions/startGame";
import DeleteRoomButton from "./DeleteRoomButton";

interface Props {
  board: string[] | undefined;
  players: Player[] | undefined;
  gameId: string;
}

const WinnderDialog = async ({ board, players, gameId }: Props) => {
  if (board) {
    if (
      (board[0] && board[1] && board[2] === "O") ||
      (board[3] && board[4] && board[5] === "O") ||
      (board[6] && board[7] && board[8] === "O") ||
      (board[0] && board[3] && board[6] === "O") ||
      (board[1] && board[4] && board[7] === "O") ||
      (board[2] && board[5] && board[8] === "O")
    ) {
      if (players) {
        await givePoints(players[0].userId, players[0].points || 0);

        setTimeout(() => {
          const leaveRoom = async () => {
            await exitGame(gameId);
          };
        }, 10000);

        return (
          <Dialog open>
            <DialogContent className="w-[400px] rounded-md">
              <DialogHeader>
                <DialogTitle className="text-3xl">Победил</DialogTitle>
                <DialogDescription className="w-full flex justify-center items-center py-2 gap-4">
                  <div className="flex flex-col justify-center items-center">
                    <div className="flex relative gap-4 justify-center items-center">
                      {players[0]?.role === "GOD" && (
                        <Crown className="absolute -top-[17px] left-2 text-yellow-400" />
                      )}
                      {players[0]?.role === "ADMIN" && (
                        <GraduationCap className="absolute -top-[17px] left-2" />
                      )}
                      <Avatar>
                        <AvatarImage
                          src={
                            players[0]?.image || "https://github.com/shadcn.png"
                          }
                        />
                        <AvatarFallback>X|O</AvatarFallback>
                      </Avatar>
                      <div className="">
                        <h1 className="text-lg dots font-bold">
                          {players[0]?.name}
                        </h1>
                        <div className="opacity-50 text-sm flex gap-2 justify-center items-center">
                          Рейтинг: <span>{players[0]?.points || 0}</span>{" "}
                          <span className="text-xl font-medium text-yellow-400">
                            +10
                          </span>
                        </div>
                      </div>
                    </div>
                    <DeleteRoomButton gameId={gameId} />
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        );
      }
    }
    if (
      (board[0] && board[1] && board[2] === "X") ||
      (board[3] && board[4] && board[5] === "X") ||
      (board[6] && board[7] && board[8] === "X") ||
      (board[0] && board[3] && board[6] === "X") ||
      (board[1] && board[4] && board[7] === "X") ||
      (board[2] && board[5] && board[8] === "X")
    ) {
      if (players) {
        await givePoints(players[1].userId, players[1].points || 0);

        return (
          <Dialog open>
            <DialogContent className="w-[400px] rounded-md">
              <DialogHeader>
                <DialogTitle className="text-3xl">Победил</DialogTitle>
                <DialogDescription className="w-full flex justify-center items-center py-2 gap-4">
                  <div className="flex flex-col justify-center items-center gap-2">
                    <div className="flex relative gap-4 justify-center items-center">
                      {players[1]?.role === "GOD" && (
                        <Crown className="absolute -top-[17px] left-2 text-yellow-400" />
                      )}
                      {players[1]?.role === "ADMIN" && (
                        <GraduationCap className="absolute -top-[17px] left-2" />
                      )}
                      <Avatar>
                        <AvatarImage
                          src={
                            players[1]?.image || "https://github.com/shadcn.png"
                          }
                        />
                        <AvatarFallback>X|O</AvatarFallback>
                      </Avatar>
                      <div className="">
                        <h1 className="text-lg dots font-bold">
                          {players[1]?.name}
                        </h1>
                        <div className="opacity-50 text-sm flex gap-2 justify-center items-center">
                          Рейтинг: <span>{players[1]?.points || 0}</span>{" "}
                          <span className="text-xl font-medium text-yellow-400">
                            +10
                          </span>
                        </div>
                      </div>
                    </div>
                    <DeleteRoomButton gameId={gameId} />
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        );
      }
    }
  }
};

export default WinnderDialog;
