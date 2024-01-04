"use client";

import { useState, useTransition } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { startGame } from "@/actions/startGame";
import { redirect, useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { ScaleLoader } from "react-spinners";
import { Check, Copy } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Label } from "./ui/label";

interface Props {
  playGroundId: string | null;
  inviteCode: string | undefined;
}

const TicTacToePlayGround = ({ playGroundId, inviteCode }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [copied, setCopied] = useState(false);

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

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  return (
    <Tabs defaultValue="link" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="link">Присоединиться</TabsTrigger>
        <TabsTrigger value="make">Создать комнату</TabsTrigger>
      </TabsList>
      <TabsContent value="link">
        <Card>
          <CardHeader>
            <CardTitle className="w-full text-center">
              Присоединиться к комнате
            </CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="username">Ссылка</Label>
              <Input value={inputValue} onChange={handleInputChange} />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link href={inputValue}>Играть</Link>
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="make">
        <Card>
          <CardHeader>
            <CardTitle className="w-full text-center">
              Создать новую комнату X|O
            </CardTitle>
            <CardDescription></CardDescription>
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
                <Button className="w-full" asChild>
                  <Link href={`/play/${playGroundId}`}>Играть</Link>
                </Button>
              </CardFooter>
            </>
          )}
          {!playGroundId && (
            <CardFooter>
              <Button
                disabled={isPending}
                className="w-full"
                type="submit"
                onClick={onMakeRoom}
              >
                {isPending ? (
                  <ScaleLoader color="#ffffff" height={20} width={3} />
                ) : (
                  "Создать"
                )}
              </Button>
            </CardFooter>
          )}
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default TicTacToePlayGround;
