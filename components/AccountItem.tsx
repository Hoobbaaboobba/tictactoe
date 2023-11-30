import Link from "next/link";
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
import useAuthModal from "@/hooks/useAuthModal";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";

const AccountItem = () => {
  const authMddal = useAuthModal();
  const router = useRouter();

  const { onClose, isOpen, onOpen } = useAuthModal();

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();

    router.refresh();

    if (error) {
      console.log(error);
    }
  };

  const logIn = () => {
    onOpen();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex gap-4 justify-center items-center">
          <Avatar>
            <AvatarImage
              className="w-12 h-12"
              src={"https://github.com/shadcn.png"}
            />
            <AvatarFallback>X|O</AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-start items-start">
            <h1 className="text-lg font-bold dots">Alex</h1>
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
        <DropdownMenuItem className="text-md">
          {user ? (
            <div onClick={handleLogout}>Выйти</div>
          ) : (
            <div onClick={logIn}>Войти</div>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountItem;
