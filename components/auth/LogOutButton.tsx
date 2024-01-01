"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

interface Props {
  isTitle?: boolean;
}

export const LogOutButton = ({ isTitle }: Props) => {
  const onClick = () => {
    signOut();
  };

  return (
    <Button
      type="submit"
      onClick={onClick}
      size={!isTitle ? "icon" : "default"}
      className={`${isTitle && "w-full flex justify-between items-center"}`}
      variant="destructive"
    >
      {isTitle && <span>Выйти</span>}
      <LogOut className="w-4 h-4" />
    </Button>
  );
};
