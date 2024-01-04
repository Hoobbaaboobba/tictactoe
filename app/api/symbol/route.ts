import { db } from "@/lib/db";
import { pusherServer } from "@/pusher";

export async function POST(req: Request) {
  const { move, gameId, index } = await req.json();

  pusherServer.trigger(gameId, "incoming-moves", move);

  const playgruond = await db.ticTacToePlayGround.findFirst({
    where: {
      id: gameId,
    },
  });

  const newBoard =
    playgruond?.board.slice(0, index) +
    "X" +
    playgruond?.board.slice(index + 1);

  await db.ticTacToePlayGround.update({
    where: {
      id: playgruond?.id,
    },
    data: {
      board: newBoard,
    },
  });

  return new Response(JSON.stringify({ success: true }));
}
