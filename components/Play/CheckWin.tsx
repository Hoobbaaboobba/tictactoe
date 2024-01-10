"use client";

import useWinnderDialog from "@/hooks/useWinnerDialog";

interface Props {
  board: string[];
}

const CheckWin = ({ board }: Props) => {
  const { onEnd, onWinnerO, onWinnerX } = useWinnderDialog();

  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      if (board[a] === "O") {
        onWinnerO();
        onEnd();
        return;
      } else if (board[a] === "X") {
        onWinnerX();
        onEnd();
      }
    }
  }

  return null;
};

export default CheckWin;
