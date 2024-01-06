import TicTacToePlayGround from "@/components/StartTicTacToe";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Skeleton } from "@/components/ui/skeleton";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import Image from "next/image";

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
    <div className="flex flex-col justify-center items-center gap-4">
      <Drawer>
        <DrawerTrigger>
          <Card className="w-[400px] group h-[200px] relative hover:border-yellow-400 transition">
            <CardContent className="flex justify-center items-center">
              <Image
                src={require("../../../public/rick-bg.png")}
                alt="rick and morty background"
                fill
                placeholder="blur"
                style={{ objectFit: "cover" }}
                className="rounded-md z-0 grayscale group-hover:grayscale-0 transition"
              />
            </CardContent>
            <CardFooter className="absolute rounded-b-md p-2 w-full flex justify-center items-center bottom-0 left-0 bg-white">
              <h1 className="z-20 text-black text-2xl font-semibold group-hover:text-black transition">
                Крестики | нОлики
              </h1>
            </CardFooter>
          </Card>
        </DrawerTrigger>
        <DrawerContent className="w-full h-[85%] flex justify-start items-center">
          <TicTacToePlayGround
            playGroundId={playgruond?.id || null}
            inviteCode={playgruond?.inviteCode}
          />
        </DrawerContent>
      </Drawer>
      <Skeleton className="w-[400px] h-[200px]" />
      <Skeleton className="w-[400px] h-[200px]" />
    </div>
  );
}
