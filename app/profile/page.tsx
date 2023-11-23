import Image from "next/image";
import profileImg from "../../public/profile-img.webp";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const ProfilePage = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full h-[200px] relative -mt-4">
        <div className="bg-black/60 absolute top-0 left-0 w-full h-full z-10"></div>
        <Image
          src={profileImg}
          alt="profile img"
          fill
          placeholder="blur"
          style={{ objectFit: "cover" }}
        />
        <div className="w-full px-4 z-20 flex gap-2 absolute -bottom-8 justify-center items-center">
          <div className="max-w-[1300px] w-full justify-between items-center flex gap-4">
            <Image
              src="https://github.com/shadcn.png"
              alt="icon"
              width={100}
              height={100}
              className="rounded-full"
            />
            <div className="flex flex-col justify-start gap-2">
              <div className="w-full text-white rounded-sm">
                <h1 className="text-2xl font-bold">Alexey Matveev 🏴‍☠️</h1>
                <p className="opacity-60">С нами с 23 ноября 2023 года</p>
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
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
