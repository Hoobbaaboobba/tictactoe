"use client";

import { useEffect, useState } from "react";
import { Progress } from "../ui/progress";
import { User } from "@prisma/client";
import { Separator } from "../ui/separator";

interface Props {
  user: User | null;
}

const ProgressBar = ({ user }: Props) => {
  const [wins, setWins] = useState(0);
  const [defeats, setDefeats] = useState(0);
  const [procent, setProcent] = useState(0);

  if (!user) {
    return;
  }

  const w = (user?.wins / user?.allGames) * 100;

  useEffect(() => {
    const win = setTimeout(() => setWins(w), 300);
    const def = setTimeout(
      () => setDefeats((user?.defeats / user?.allGames) * 100),
      600
    );
    const proc = setTimeout(
      () => setProcent((user?.wins / user.allGames) * 100),
      900
    );
    return () => {
      clearTimeout(win), clearTimeout(def), clearTimeout(proc);
    };
  }, [w]);

  return (
    <div className="flex w-full flex-col justify-start items-start gap-2">
      <div className="w-full">
        <h1 className="text-slate-600 mb-1">Победы</h1>
        <div className="relative w-full flex justify-center items-center">
          <Progress value={wins} className="rounded-md h-[40px] top-0 left-0" />
          <span
            className={`${
              wins < 55 ? "text-black" : "text-white"
            } absolute bottom-2`}
          >
            {user?.wins}
          </span>
        </div>
        <div className="text-slate-600 flex w-full justify-between items-center">
          <span>0</span>
          <span>{user?.allGames}</span>
        </div>
      </div>
      <Separator />
      <div className="w-full">
        <h1 className="text-slate-600 mb-1">Поражения</h1>
        <div className="relative w-full flex justify-center items-center">
          <Progress
            value={defeats}
            className="rounded-md h-[40px] top-0 left-0"
          />
          <span
            className={`${
              defeats < 55 ? "text-black" : "text-white"
            } absolute bottom-2`}
          >
            {user?.defeats}
          </span>
        </div>
        <div className="text-slate-600 flex w-full justify-between items-center">
          <span>0</span>
          <span>{user?.allGames}</span>
        </div>
      </div>
      <Separator />
      <div className="w-full">
        <h1 className="text-slate-600 mb-1">Процент побед %</h1>
        <div className="relative w-full flex justify-center items-center">
          <Progress
            value={procent}
            className="rounded-md h-[40px] top-0 left-0"
          />
          <span
            className={`${
              procent < 55 ? "text-black" : "text-white"
            } absolute bottom-2`}
          >
            {procent.toFixed(0)}%
          </span>
        </div>
        <div className="text-slate-600 flex w-full justify-between items-center">
          <span>0</span>
          <span>100</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
