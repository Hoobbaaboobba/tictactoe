"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const PlayersField = () => {
  const [time, setTime] = useState(60);
  useEffect(() => {
    const update = () => {
      setTime((second) => second - 1);
    };
    if (time === 0) {
      return;
    }
    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [time]);
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-8 items-center border-2 border-black p-4 rounded-2xl shadow-lg mb-4">
      <div className="flex gap-6 justify-center items-center">
        <div className="flex gap-4 justify-center items-center">
          <Avatar>
            <AvatarImage
              className="w-12 h-12"
              src="https://github.com/shadcn.png"
            />
            <AvatarFallback>X|O</AvatarFallback>
          </Avatar>
          <div className="">
            <h1 className="text-lg dots font-bold">Alexey Matveev</h1>
            <p className="opacity-50 text-sm">
              Рейтинг: <span>1</span>
            </p>
          </div>
        </div>
        <div className="w-8 h-8 flex justify-center items-center text-green-600">
          {time}
        </div>
      </div>
      <div className="text-3xl font-bold">VS</div>
      <div className="flex gap-6 justify-center items-center">
        <div className="flex gap-4 justify-center items-center">
          <Avatar>
            <AvatarImage
              className="w-12 h-12"
              src="https://github.com/shadcn.png"
            />
            <AvatarFallback>X|O</AvatarFallback>
          </Avatar>
          <div className="">
            <h1 className="text-lg dots font-bold">Enemy</h1>
            <p className="opacity-50 text-sm">
              Рейтинг: <span>2</span>
            </p>
          </div>
        </div>
        <div className="w-8 h-8 flex justify-center items-center text-rose-600">
          {time}
        </div>
      </div>
    </div>
  );
};

export default PlayersField;
