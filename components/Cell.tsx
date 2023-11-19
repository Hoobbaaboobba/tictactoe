interface Props {
  handleClick: (index: number) => void;
  isWinner: boolean | undefined;
  cell: string | null;
  renderSymbol: (cell: any) => JSX.Element;
  index: number;
}

const Cell = ({ handleClick, isWinner, cell, renderSymbol, index }: Props) => {
  return (
    <button
      onClick={() => handleClick(index)}
      className={`${
        isWinner && "bg-green-100"
      } w-16 h-16 border border-black flex justify-center items-center text-4xl`}
    >
      {cell ? renderSymbol(cell) : null}
    </button>
  );
};

export default Cell;
