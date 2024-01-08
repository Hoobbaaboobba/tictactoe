import { Crown, GraduationCap } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { currentUser } from "@/lib/auth";

const AccountInfo = async () => {
  const user = await currentUser();
  return (
    <div className="flex gap-4 justify-center items-center">
      <div className="relative">
        {user?.role === "GOD" && (
          <Crown className="absolute -top-[17px] left-2 text-yellow-400" />
        )}
        {user?.role === "ADMIN" && (
          <GraduationCap className="absolute -top-[20px] left-2" />
        )}
        <Avatar>
          <AvatarImage src={user?.image || "https://github.com/shadcn.png"} />
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
  );
};

export default AccountInfo;
