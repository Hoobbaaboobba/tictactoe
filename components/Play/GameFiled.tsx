import { exitGame } from "@/actions/startGame";
import Cell from "@/components/Cell";
import GameInfo from "@/components/GameInfo";
import PlayersField from "@/components/PlayersField";
import ResetButton from "@/components/ResetButton";
import useGameState from "@/components/useGameState";
import { redirect, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { ScaleLoader } from "react-spinners";
import { GameBoard } from "./GameBoard";

interface Props {
  players:
    | {
        id: string;
        symbol: string;
        name: string | null;
        image: string | null;
        points: number | null;
        role: "GOD" | "ADMIN" | "PLAYER";
        userId: string;
        playGroundId: string;
        createdAt: Date;
        updatedAt: Date;
      }[]
    | undefined;
}

export const GameFiled = ({ players }: Props) => {
  // const [isPending, startTransition] = useTransition();
  const renderSymbol = (cell: any) => (
    <span className={`w-full h-full flex justify-center items-center`}>
      {cell}
    </span>
  );

  // const router = useRouter();

  // const onDeleteRoom = () => {
  //   startTransition(() => {
  //     exitGame();
  //     router.refresh();
  //   });
  // };

  if (players === undefined) {
    return redirect("/play");
  }

  return (
    <div className="w-full flex flex-col gap-4 justify-center items-center overflow-y-auto">
      <PlayersField players={players} />
      {players[1] && (
        <>
          {/* <GameInfo
            isDraw={isDraw}
            renderSymbol={renderSymbol}
            winnerSequence={winnerSequence}
            Symbol_o={SYMBOL_O}
            currentStep={currentStep}
            winnerSymbol={winnerSymbol}
          /> */}
          <GameBoard currentStep={"X"} />
          {/* <ResetButton
            winnerSequence={winnerSequence}
            isDraw={isDraw}
            resetGame={resetGame}
          /> */}
        </>
      )}
      {/* <Button
        type="submit"
        onClick={onDeleteRoom}
        variant="destructive"
        className="w-[300px]"
      >
        {isPending ? (
          <ScaleLoader color="#000000" height={20} width={4} />
        ) : (
          "Покинуть комнату"
        )}
      </Button> */}
    </div>
  );
};
