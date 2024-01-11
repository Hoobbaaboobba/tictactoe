"use client";

import { Joystick, Play, Store, Trophy, UserCircle2Icon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useEffect, useState } from "react";

const Buttons = [
  {
    label: "Магазин",
    href: "store",
    icon: <Store />,
  },
  {
    label: "Режимы",
    href: "modes",
    icon: <Joystick />,
  },
  {
    label: "Играть",
    href: "play",
    icon: <Play />,
  },
  {
    label: "Лидеры",
    href: "leaders",
    icon: <Trophy />,
  },
  {
    label: "Профиль",
    href: "profile",
    icon: <UserCircle2Icon />,
  },
];

const MobileMenu = () => {
  const [nav, setNav] = useState<boolean>(false);
  const pathname = usePathname()?.split("/") || "";

  const user = useCurrentUser();

  useEffect(() => {
    setTimeout(() => {
      if (user) {
        setNav(true);
      }
    }, 200);
  }, [user]);

  return (
    <div
      className={`${
        nav ? "translate-y-0" : "translate-y-[100%]"
      } transition duration-500 ease-in-out w-full flex justify-center gap-5 items-center dark:bg-slate-900 bg-white py-2 px-4 fixed border-t bottom-0 left-0`}
    >
      {Buttons.map((button, index) => (
        <div key={index} className="flex flex-col justify-center items-center">
          <Button
            size="icon"
            variant={
              pathname[1] === `${button.href}` && user?.role !== "GOD"
                ? "default"
                : pathname[1] === `${button.href}` && user?.role === "GOD"
                ? "gold"
                : "ghost"
            }
            asChild
          >
            <Link href={`/${button.href}`}>{button.icon}</Link>
          </Button>
          <span
            className={`${
              pathname[1] === `${button.href}` ? "mt-2" : ""
            } text-sm`}
          >
            {button.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default MobileMenu;
