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

  const prise = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
  };

  const randomPrise: number = parseInt(prise(24, 34).toFixed(0), 10);
  const randomMinus: number = parseInt(prise(8, 15).toFixed(0), 10);

  await db.ticTacToePlayGround.update({
    where: {
      id: params.gameId,
    },
    data: {
      prise: randomPrise,
      minus: randomMinus,
    },
  });

  return (
    <>
      <GameFiled
        players={ticTacToeGamePlayers?.players}
        gameId={params.gameId}
        board={board}
        currentSymbol={currentStep}
      />
      <WinnderDialog
        board={board}
        players={ticTacToeGamePlayers?.players}
        gameId={params.gameId}
        prise={existingTicTacToeGame.prise}
        minus={existingTicTacToeGame.minus}
      />
      <CheckWin board={board} />
    </>
  );
};

export default InviteCodePage;
