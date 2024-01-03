import { cellState } from "@/actions/cellState";
import { useTransition } from "react";

interface Props {
  cell: string | null;
  index: number;
  currentStep: string;
}

const Cell = ({ cell, index, currentStep }: Props) => {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      cellState(index, currentStep);
    });
  };
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`w-16 h-16 border dark:border-white border-black flex justify-center items-center text-4xl`}
    >
      {cell === "-" ? "" : cell}
    </button>
  );
};

export default Cell;
