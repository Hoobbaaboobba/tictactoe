import { Button } from "./ui/button";

interface Props {
  winnerSequence: number[] | undefined;
  isDraw: boolean;
  resetGame: () => void;
}

const ResetButton = ({ winnerSequence, isDraw, resetGame }: Props) => {
  return (
    <Button
      onClick={() => resetGame()}
      size="lg"
      className={`${
        winnerSequence || isDraw ? "scale-100" : "scale-0"
      } transition duration-300 text-lg bottom-5 mt-2`}
    >
      Играть заново
    </Button>
  );
};

export default ResetButton;
