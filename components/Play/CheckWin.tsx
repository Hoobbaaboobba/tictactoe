"use client";

import { decrementPoints, incrementPoints } from "@/actions/getPlayers";
import { exitGame } from "@/actions/startGame";
import useWinnderDialog from "@/hooks/useWinnerDialog";
import { Player } from "@prisma/client";
import { redirect } from "next/navigation";

interface Props {
  board: string[];
  players: Player[] | undefined;
  gameId: string;
}

const CheckWin = ({ board, players, gameId }: Props) => {
  const { onEnd, onWinnerO, onWinnerX, resetEnd, resetWinner } =
    useWinnderDialog();

  if (board && players) {
    if (
      (board[0] && board[1] && board[2] === "O") ||
      (board[3] && board[4] && board[5] === "O") ||
      (board[6] && board[7] && board[8] === "O") ||
      (board[0] && board[3] && board[6] === "O") ||
      (board[1] && board[4] && board[7] === "O") ||
      (board[2] && board[5] && board[8] === "O") ||
      (board[0] && board[4] && board[8] === "O") ||
      (board[2] && board[4] && board[6] === "O")
    ) {
      onWinnerO();
      onEnd();

      incrementPoints(players[0]?.userId, gameId);
      decrementPoints(players[1]?.userId, gameId);

      exitGame(gameId);

      setTimeout(() => {
        resetEnd();
        resetWinner();
        redirect("/play");
      }, 8000);

      return null;
    }
    if (
      (board[0] && board[1] && board[2] === "X") ||
      (board[3] && board[4] && board[5] === "X") ||
      (board[6] && board[7] && board[8] === "X") ||
      (board[0] && board[3] && board[6] === "X") ||
      (board[1] && board[4] && board[7] === "X") ||
      (board[2] && board[5] && board[8] === "X") ||
      (board[0] && board[4] && board[8] === "X") ||
      (board[2] && board[4] && board[6] === "X")
    ) {
      onWinnerX();
      onEnd();

      incrementPoints(players[1]?.userId, gameId);
      decrementPoints(players[0]?.userId, gameId);

      exitGame(gameId);

      setTimeout(() => {
        resetEnd();
        resetWinner();
        redirect("/play");
      }, 8000);

      return null;
    }
    return null;
  }
};

export default CheckWin;
