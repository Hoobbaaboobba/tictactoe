"use client";

import { Suspense, useEffect, useState, useTransition } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { startGame } from "@/actions/startGame";
import { Input } from "../ui/input";
import { ScaleLoader } from "react-spinners";
import { Check, Copy, RotateCw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Label } from "../ui/label";
import { Player } from "@prisma/client";
import { getTicTacToePlaygrounds } from "@/actions/getBoard";
import GameCard from "./GameCard";
import LoadingState from "../LoadingState";
import { useRouter } from "next/navigation";

interface Props {
  playGroundId: string | null;
  inviteCode: string | undefined;
  players: Player[] | undefined;
  playgrounds:
    | {
        id: string;
        inviteCode: string;
        players: Player[];
      }[]
    | undefined;
}

const TicTacToePlayGround = ({
  playGroundId,
  inviteCode,
  players,
  playgrounds,
}: Props) => {
  const [isPending, startTransition] = useTransition();
  const [copied, setCopied] = useState(false);
  const [reload, setReload] = useState(false);
  const [playgroundsData, setPlaygroundsData] = useState<
    {
      id: string;
      inviteCode: string;
      players: Player[];
    }[]
  >();

  useEffect(() => {
    setPlaygroundsData(playgrounds);
  }, []);

  const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL}/invite/${inviteCode}`;

  const onMakeRoom = () => {
    startTransition(async () => {
      await startGame();
    });
  };

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const reloadPlaygroundsData = async () => {
    setReload(true);

    const data = await getTicTacToePlaygrounds();

    setPlaygroundsData(data);

    setReload(false);
  };

  const router = useRouter();

  const handlePlay = () => {
    startTransition(() => {
      router.push(`/play/${playGroundId}`);
    });
  };

  return (
    <Tabs defaultValue="link" className="w-[400px] mt-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="link">Присоединиться</TabsTrigger>
        <TabsTrigger value="make">Создать комнату</TabsTrigger>
      </TabsList>
      <TabsContent value="link">
        <div className="flex flex-col gap-4">
          {playgroundsData?.map((playground, index) => (
            <Suspense key={index} fallback={<ScaleLoader color="#000000" />}>
              <GameCard
                playground={{
                  id: playground.id,
                  inviteCode: playground.inviteCode,
                  players: playground.players,
                }}
              />
            </Suspense>
          ))}
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          {playgroundsData && playgroundsData?.length > 0 ? (
            <button
              onClick={reloadPlaygroundsData}
              className="w-full flex justify-center items-center my-4"
            >
              <RotateCw
                strokeWidth={3}
                className={`${reload && "animate-spin"}`}
              />
            </button>
          ) : (
            <>
              <span className="text-sm text-slate-600 text-center">
                Комнат нет
              </span>
              <button
                onClick={reloadPlaygroundsData}
                className="w-full flex justify-center items-center my-4"
              >
                <RotateCw
                  strokeWidth={3}
                  className={`${reload && "animate-spin"}`}
                />
              </button>
            </>
          )}
        </div>
      </TabsContent>
      <TabsContent value="make">
        <Card>
          <form action={onMakeRoom}>
            <CardHeader>
              <CardTitle className="w-full text-center">
                Создать новую комнату X|O
              </CardTitle>
            </CardHeader>
            {playGroundId && (
              <>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="new">Ссылка приглашения</Label>
                    <div className="flex w-full gap-2">
                      <Input value={inviteUrl} />
                      <Button onClick={onCopy} variant="outline" size="icon">
                        {copied ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    disabled={isPending}
                    className="w-full"
                    onClick={handlePlay}
                  >
                    {isPending ? <LoadingState /> : "Играть"}
                  </Button>
                </CardFooter>
              </>
            )}
            {!playGroundId && (
              <CardFooter>
                <Button disabled={isPending} className="w-full">
                  {isPending ? <LoadingState /> : "Создать"}
                </Button>
              </CardFooter>
            )}
          </form>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default TicTacToePlayGround;
