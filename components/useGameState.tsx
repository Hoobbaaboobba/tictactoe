import { useState } from "react";
import { computerWinnder } from "./ComputerWinner";
import { useRouter } from "next/navigation";

const useGameState = () => {
  const SYMBOL_X = "X";
  const SYMBOL_O = "O";
  const [cells, setCells] = useState<null[] | string[]>([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const [currentStep, setCurrentStep] = useState(SYMBOL_X);
  const [winnerSequence, setWinnerSequence] = useState<number[]>();

  const handleClick = (index: number) => {
    if (cells[index] || winnerSequence) {
      return;
    }

    const cellsCopy = cells.slice();
    cellsCopy[index] = currentStep;

    const winner: any = computerWinnder(cellsCopy);

    setCells(cellsCopy);
    setCurrentStep(currentStep === SYMBOL_O ? SYMBOL_X : SYMBOL_O);
    setWinnerSequence(winner);
  };

  const router = useRouter();

  const resetGame = () => {
    setCells(Array.from({ length: 9 }, () => null));
    setCurrentStep(SYMBOL_X);
    setWinnerSequence(undefined);
    router.refresh();
  };

  const isDraw: boolean =
    !winnerSequence && cells.filter((value) => value).length === 9;

  const winnerSymbol = winnerSequence ? cells[winnerSequence[0]] : undefined;
  return {
    cells,
    currentStep,
    winnerSequence,
    handleClick,
    resetGame,
    isDraw,
    winnerSymbol,
    SYMBOL_O,
    SYMBOL_X,
  };
};

export default useGameState;
