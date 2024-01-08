interface Props {
  currentStep: string;
}

const GameInfo = ({ currentStep }: Props) => {
  return (
    <div className={`text-4xl flex gap-2 justify-center items-center`}>
      <div className="flex justify-center items-center gap-2">
        <span className="font-medium">Ход: </span>
        <span
          className={`text-5xl font-medium ${
            currentStep === "O" ? "text-green-600" : "text-rose-600"
          }`}
        >
          {currentStep}
        </span>
      </div>
    </div>
  );
};

export default GameInfo;
