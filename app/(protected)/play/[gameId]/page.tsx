import CheckWin from "@/components/Play/CheckWin";
import { GameFiled } from "@/components/Play/GameFiled";
import WinnderDialog from "@/components/Play/WinnderDialog";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface InviteCodeProps {
  params: {
    gameId: string;
  };
}

const InviteCodePage = async ({ params }: InviteCodeProps) => {
  const user = await currentUser();

  if (!user) {
    return redirect("/auth/login");
  }

  if (!params.gameId) {
    return redirect("/play");
  }

  const ticTacToeGamePlayers = await db.ticTacToePlayGround.findUnique({
    where: {
      id: params.gameId,
    },
    select: {
      players: true,
    },
  });

  const existingTicTacToeGame = await db.ticTacToePlayGround.findFirst({
    where: {
      id: params.gameId,
    },
  });

  if (!existingTicTacToeGame) {
    return redirect("/play");
  }

  const board = existingTicTacToeGame?.board.split("");

  const currentStep = existingTicTacToeGame.currentSymbol;

  return (
    <>
      <GameFiled
        players={ticTacToeGamePlayers?.players}
        gameId={params.gameId}
        board={board}
        currentSymbol={currentStep}
      />
      <WinnderDialog
        players={ticTacToeGamePlayers?.players}
        gameId={params.gameId}
      />
    </>
  );
};

export default InviteCodePage;
