import TicTacToePlayGround from "@/components/StartTicTacToe";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function PlayPage() {
  const user = await currentUser();

  const playgruond = await db.ticTacToePlayGround.findFirst({
    where: {
      players: {
        some: {
          userId: user?.id,
        },
      },
    },
  });

  return (
    <TicTacToePlayGround
      playGroundId={playgruond?.id || null}
      inviteCode={playgruond?.inviteCode}
    />
  );
}
