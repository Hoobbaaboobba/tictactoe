import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import { currentUser } from "@/lib/auth";
import { LogOutButton } from "./auth/LogOutButton";
import { Crown } from "lucide-react";

const AccountItem = async () => {
  const user = await currentUser();

  return (
    <DropdownMenu>
      {user && (
        <DropdownMenuTrigger>
          <div className="flex gap-4 justify-center items-center">
            <div className="relative">
              {user?.role === "GOD" && (
                <Crown className="absolute -top-[17px] left-2 text-yellow-400" />
              )}
              <Avatar>
                <AvatarImage
                  src={user?.image || "https://github.com/shadcn.png"}
                />
                <AvatarFallback>X|O</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col justify-start items-start">
              <h1 className="text-lg font-bold dots">{user?.name}</h1>
              <p className="opacity-50 text-sm">
                Рейтинг: <span>1</span>
              </p>
            </div>
          </div>
        </DropdownMenuTrigger>
      )}
      <DropdownMenuContent className="w-[150px]">
        <DropdownMenuItem className="text-lg">
          <Button className="w-full">Играть</Button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-md">Профиль</DropdownMenuItem>
        <DropdownMenuItem className="text-md">Пригласить</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-md w-full flex justify-between items-center">
          <LogOutButton isTitle />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountItem;
