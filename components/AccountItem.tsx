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
import { Crown, GraduationCap } from "lucide-react";
import AccountInfo from "./AccountInfo";

const AccountItem = async () => {
  const user = await currentUser();

  return (
    <DropdownMenu>
      {user && (
        <DropdownMenuTrigger>
          <AccountInfo />
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
