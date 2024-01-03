import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import Cell from "../Cell";

interface BoardProps {
  currentStep: string;
}

const GameBoard = async ({ currentStep }: BoardProps) => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const playgruond = await db.ticTacToePlayGround.findFirst({
    where: {
      players: {
        some: {
          userId: user?.id,
        },
      },
    },
  });

  if (!playgruond) {
    return null;
  }

  const board = await playgruond.board.split("");

  return (
    <div
      className={`border-2 border-black rounded-xl flex justify-center items-center p-4 relative w-[320px] h-[320px] shadow-2xl dark:bg-slate-900`}
    >
      <div className="grid grid-cols-3">
        {board.map((cell, index) => {
          return (
            <Cell
              key={index}
              cell={cell}
              index={index}
              currentStep={currentStep}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GameBoard;
