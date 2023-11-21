"use client";

import { Joystick, Play, Store, Trophy, UserCircle2Icon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
    href: "",
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
  const pathname = usePathname().split("/");

  return (
    <div className="w-full flex justify-center gap-6 items-center sm:hidden bg-white py-2 px-4 fixed border-t bottom-0 left-0">
      {Buttons.map((button, index) => (
        <div key={index} className="flex flex-col justify-center items-center">
          <Button
            size="icon"
            variant={pathname[0] === `${button.href}` ? "default" : "ghost"}
            asChild
          >
            <Link href={`/${button.href}`}>{button.icon}</Link>
          </Button>
          <span
            className={`${
              pathname[0] === `${button.href}` ? "mt-2" : ""
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
