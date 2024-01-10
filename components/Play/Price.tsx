import { db } from "@/lib/db";

interface Props {
  gameId: string;
  minus?: boolean;
}

const Price = async ({ gameId, minus }: Props) => {
  const playground = await db.ticTacToePlayGround.findUnique({
    where: {
      id: gameId,
    },
  });
  return minus ? `-${playground?.minus}` : `+${playground?.prise}`;
};

export default Price;
