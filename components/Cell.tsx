import axios from "axios";

interface Props {
  cell: string | null;
  index: number;
  currentStep: string;
  board: string[] | null | undefined;
  gameId: string;
  incomingMoves: string[];
}

const Cell = ({
  cell,
  index,
  currentStep,
  incomingMoves,
  board,
  gameId,
}: Props) => {
  let input = "X";

  const makeMove = async (move: string) => {
    await axios.post("/api/symbol", { move, gameId, index });
  };

  return (
    <button
      key={index}
      type="submit"
      onClick={() => makeMove("X")}
      className={`w-16 h-16 border dark:border-white border-black flex justify-center items-center text-4xl`}
    >
      {board && (board[index] === "-" ? incomingMoves[index] : board[index])}
    </button>
  );
};

export default Cell;
