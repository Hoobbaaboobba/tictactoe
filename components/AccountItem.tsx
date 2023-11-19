import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const AccountItem = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex gap-4 justify-center items-center">
          <Avatar>
            <AvatarImage
              className="w-12 h-12"
              src="https://github.com/shadcn.png"
            />
            <AvatarFallback>X|O</AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-start items-start">
            <h1 className="text-lg font-bold dots">Alexey Matveev</h1>
            <p className="opacity-50 text-sm">
              Рейтинг: <span>1</span>
            </p>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[150px]">
        <DropdownMenuItem className="text-lg">
          <Button className="w-full">Играть</Button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-md">Профиль</DropdownMenuItem>
        <DropdownMenuItem className="text-md">Пригласить</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-md">Выйти</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountItem;
