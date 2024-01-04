import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface Props {
  params: {
    inviteCode: string;
  };
}

const InvitePage = async ({ params }: Props) => {
  const user = await currentUser();

  if (!user) {
    return redirect("/auth/login");
  }

  if (!params.inviteCode) {
    return redirect("/play");
  }

  const amountOfPlayes = await db.ticTacToePlayGround.findFirst({
    where: {
      id: user.id,
    },
    select: {
      players: true,
    },
  });

  if (amountOfPlayes?.players) {
    if (amountOfPlayes.players.length > 2) {
      return redirect("/play");
    }
  }

  const existingTicTacToeGame = await db.ticTacToePlayGround.findFirst({
    where: {
      inviteCode: params.inviteCode,
      players: {
        some: {
          userId: user.id,
        },
      },
    },
  });

  const ticTacToeGame = await db.ticTacToePlayGround.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      players: {
        create: [
          {
            name: user.name,
            userId: user.id,
            role: user.role,
            image: user.image,
          },
        ],
      },
    },
  });

  if (existingTicTacToeGame) {
    return redirect(`/play/${existingTicTacToeGame.id}`);
  }

  if (ticTacToeGame) {
    return redirect(`/play/${ticTacToeGame.id}`);
  }

  return null;
};

export default InvitePage;
