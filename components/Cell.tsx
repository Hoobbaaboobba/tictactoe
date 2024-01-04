import { cellState } from "@/actions/cellState";
import axios from "axios";

interface Props {
  cell: string | null;
  index: number;
  currentStep: string;
  board: string[] | null | undefined;
  gameId: string;
}

const Cell = ({ cell, index, currentStep, board, gameId }: Props) => {
  const onClick = async () => {
    await cellState(index, currentStep, gameId);
  };
  let input = "X";

  // const makeMove = async (move: string) => {
  //   await axios.post("/api/symbol", { move, gameId, index });
  // };

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
