import PlayersField from "@/components/PlayersField";
import { redirect } from "next/navigation";
import { GameBoard } from "./GameBoard";
import DeleteRoomButton from "./DeleteRoomButton";

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
  gameId: string;
}

export const GameFiled = ({ players, gameId }: Props) => {
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
          <GameBoard currentStep={"X"} gameId={gameId} />
          {/* <ResetButton
            winnerSequence={winnerSequence}
            isDraw={isDraw}
            resetGame={resetGame}
          /> */}
        </>
      )}
      <DeleteRoomButton gameId={gameId} />
    </div>
  );
};
