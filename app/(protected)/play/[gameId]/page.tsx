import { GameFiled } from "@/components/Play/GameFiled";
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

  const board = existingTicTacToeGame?.board.split("");

  return (
    <GameFiled
      players={ticTacToeGamePlayers?.players}
      gameId={params.gameId}
      board={board}
    />
  );
};

export default InviteCodePage;
