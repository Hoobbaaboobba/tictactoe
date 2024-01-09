import { Crown, GraduationCap, TrophyIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

const AccountInfo = async () => {
  const user = await currentUser();

  const getUser = await db.user.findFirst({
    where: {
      id: user?.id,
    },
  });
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
        <div className="opacity-50 text-sm flex gap-1 justify-center items-center">
          <p>Рейтинг:</p>
          <span className="flex gap-1 justify-center items-center text-yellow-500">
            <p className="font-medium">{getUser?.points}</p>{" "}
            <TrophyIcon className="w-4 h-4" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
