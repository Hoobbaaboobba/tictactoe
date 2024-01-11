"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LogOutButton } from "../auth/LogOutButton";
import Stats from "./Stats";
import { useRouter, useSearchParams } from "next/navigation";
import TwoFactorButton from "../auth/TwoFactorButton";
import { User } from "@prisma/client";

interface Props {
  user: User | null;
}

const ProfileComponent = ({ user }: Props) => {
  const searchParams = useSearchParams();

  const query = searchParams?.get("q");

  const router = useRouter();

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full h-[200px] relative -mt-4">
        <div className="bg-black/60 absolute top-0 left-0 w-full h-full z-10"></div>
        <Image
          src={require("/public/profile-img.webp")}
          alt="profile img"
          fill
          placeholder="blur"
          style={{ objectFit: "cover" }}
        />
        <div className="w-full px-4 z-20 flex gap-2 absolute -bottom-8 justify-center items-center">
          <div className="max-w-[1300px] w-full justify-between items-center flex gap-4">
            <div className="rounded-full flex justify-center relative items-center">
              <Image
                src={user?.image || "https://github.com/shadcn.png"}
                alt="profile icon"
                width={100}
                height={100}
                className={`${
                  user?.role === "GOD" && "border-2 border-yellow-300"
                } z-20 rounded-full`}
              />
              <h1 className="text-3xl absolute top-8 left-8 w-full h-full justify-center items-center">
                X|O
              </h1>
            </div>
            <div className="flex flex-col justify-start gap-2">
              <div className="w-full text-white rounded-sm">
                <h1 className="text-2xl font-bold">{user?.name} 🏴‍☠️</h1>
                <p className="opacity-60">С нами с 23 ноября 2023 года</p>
              </div>
              <div className="bg-transparent w-full flex justify-betweem items-center gap-1 rounded-sm">
                <Button
                  variant="outline"
                  onClick={() => router.push("?q=review")}
                >
                  Обзор
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push("?q=stats")}
                >
                  Статистика
                </Button>
                <LogOutButton />
              </div>
            </div>
          </div>
        </div>
      </div>
      {query === "review" ? (
        <div className="max-w-[1300px] w-full mt-12 px-4 flex flex-col gap-2">
          <div
            className={`flex flex-row items-center justify-between rounded-lg border ${
              user?.role === "GOD" && "border-yellow-400"
            } p-3 shadow-sm`}
          >
            <p className="text-sm font-medium">ID</p>
            <p className="truncate text-sm max-w-[180px] font-mono p-1 bg-slate-100 dark:bg-transparent dark:border rounded-md">
              {user?.id}
            </p>
          </div>{" "}
          <div
            className={`flex flex-row items-center justify-between rounded-lg border ${
              user?.role === "GOD" && "border-yellow-400"
            } p-3 shadow-sm`}
          >
            <p className="text-sm font-medium">Имя</p>
            <p className="truncate text-sm max-w-[180px] font-mono p-1 bg-slate-100 dark:bg-transparent dark:border rounded-md">
              {user?.name}
            </p>
          </div>
          <div
            className={`flex flex-row items-center justify-between rounded-lg border ${
              user?.role === "GOD" && "border-yellow-400"
            } p-3 shadow-sm`}
          >
            <p className="text-sm font-medium">Почта</p>
            <p className="truncate text-sm max-w-[180px] font-mono p-1 bg-slate-100 dark:bg-transparent dark:border rounded-md">
              {user?.email}
            </p>
          </div>
          <div
            className={`flex flex-row items-center justify-between rounded-lg border ${
              user?.role === "ADMIN" && "border-emerald-500"
            } ${user?.role === "GOD" && "border-yellow-400"} p-3 shadow-sm`}
          >
            <p className="text-sm font-medium">Статус</p>
            <p
              className={`truncate text-sm max-w-[180px] font-mono p-1 ${
                user?.role === "ADMIN" && "bg-emerald-500 text-white"
              } ${user?.role === "GOD" && "bg-yellow-400 text-white"} ${
                user?.role === "PLAYER" && "bg-slate-100"
              } dark:bg-transparent dark:border rounded-md`}
            >
              {user?.role}
            </p>
          </div>
          {user?.role === "GOD" && (
            <div
              className={`flex flex-row items-center justify-between rounded-lg border ${
                user?.role === "GOD" && "border-yellow-400"
              } p-3 shadow-sm`}
            >
              <p className="text-sm font-medium">
                Двухфакторная аутентификация
              </p>
              <TwoFactorButton
                isTwoFactor={user?.isTwoFactorEnabled || false}
              />
            </div>
          )}
        </div>
      ) : (
        <Stats user={user} />
      )}
    </div>
  );
};

export default ProfileComponent;
