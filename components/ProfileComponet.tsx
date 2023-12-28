import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { currentUser } from "@clerk/nextjs";

export const revalidate = 60;

const ProfileComponent = async () => {
  const user = await currentUser();

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
            <div className="rounded-full bg-white flex justify-center relative items-center">
              {}
              <h1 className="text-3xl absolute top-8 left-8 w-full h-full justify-center items-center">
                X|O
              </h1>
            </div>
            <div className="flex flex-col justify-start gap-2">
              <div className="w-full text-white rounded-sm">
                <h1 className="text-2xl font-bold">{user?.firstName} 🏴‍☠️</h1>
                <p className="opacity-60">С нами с {user?.createdAt}</p>
              </div>
              <div className="bg-transparent w-full flex justify-betweem items-center gap-1 rounded-sm">
                <Button variant="outline" className="">
                  Обзор
                </Button>
                <Button variant="outline">Статистика</Button>
                <Button variant="destructive" size="icon">
                  <LogOut />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1300px] w-full mt-12 px-4 flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <Skeleton className="w-full h-16" />
          <Skeleton className="w-full h-16" />
          <Skeleton className="w-full h-16" />
          <Skeleton className="w-full h-16" />
          <Skeleton className="w-full h-16" />
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
