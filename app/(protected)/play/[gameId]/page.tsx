import { GameFiled } from "@/components/Play/GameFiled";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface InviteCodeProps {
  params: {
    gameId: string;
  };
}

export const revalidate = 1;
export const runtime = "edge";

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

  return (
    <GameFiled players={ticTacToeGamePlayers?.players} gameId={params.gameId} />
  );
};

export default InviteCodePage;
