import { cellState } from "@/actions/cellState";
import Cell from "../Cell";
import { currentUser } from "@/lib/auth";
import { getBoard } from "@/actions/getBoard";

interface Props {
  currentStep: string;
}

export const GameBoard = async ({ currentStep }: Props) => {
  const cells = ["", "", "", "", "", "", "", "", ""];

  const board = await getBoard();

  return (
    <div
      className={`border-2 border-black rounded-xl flex justify-center items-center p-4 relative w-[320px] h-[320px] shadow-2xl dark:bg-slate-900`}
    >
      <div className="grid grid-cols-3">
        {cells.map((cell, index) => {
          return (
            <Cell
              key={index}
              index={index}
              cell={cell}
              currentStep={currentStep}
              board={board}
            />
          );
        })}
      </div>
    </div>
  );
};
