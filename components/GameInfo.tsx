interface Props {
  isDraw: boolean;
  renderSymbol: (cell: any) => JSX.Element;
  winnerSequence: number[] | undefined;
  Symbol_o: string;
  currentStep: string;
  winnerSymbol: string | null | undefined;
}

const GameInfo = ({
  isDraw,
  renderSymbol,
  winnerSequence,
  Symbol_o,
  currentStep,
  winnerSymbol,
}: Props) => {
  return (
    <div className={`text-4xl flex gap-2`}>
      <span className="font-bold">
        {isDraw ? "Ничья" : winnerSequence ? `Победитель: ` : "Ход: "}{" "}
      </span>
      <span
        className={`${
          currentStep === Symbol_o || winnerSequence
            ? "text-green-600"
            : "text-rose-600"
        }`}
      >
        {!isDraw && renderSymbol(winnerSymbol ?? currentStep)}
      </span>
    </div>
  );
};

export default GameInfo;
