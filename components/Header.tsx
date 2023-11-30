"use client";

import useAuthModal from "@/hooks/useAuthModal";
import AccountItem from "./AccountItem";
import { ModeToggle } from "./ModeToggle";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";

const Header = () => {
  return (
    <header className="w-full fixed z-50 dark:bg-slate-900 bg-white backdrop-blur-lg top-0 left flex justify-center items-center border-b shadow-sm">
      <div className="max-w-[1300px] w-full flex justify-between items-center p-4">
        <div className="flex flex-col justify-center items-center gap-2">
          <h1 className="font-bold dark:text-white text-black text-3xl">X|O</h1>
          <div className="w-10 h-1 dark:bg-white bg-black"></div>
        </div>
        <div className="flex justify-center items-center gap-4">
          <AccountItem />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
