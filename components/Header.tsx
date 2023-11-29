"use client";

import { useSession } from "next-auth/react";
import AccountItem from "./AccountItem";
import { redirect } from "next/navigation";

const Header = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/client");
    },
  });
  return (
    <header className="w-full fixed z-50 bg-white backdrop-blur-lg top-0 left flex justify-center items-center border-b shadow-sm">
      <div className="max-w-[1300px] w-full flex justify-between items-center p-4">
        <div className="flex flex-col justify-center items-center gap-2">
          <h1 className="font-bold text-black text-3xl">X|O</h1>
          <div className="w-10 h-1 bg-black"></div>
        </div>
        <AccountItem user={session?.user} pagetype={"Client"} />
      </div>
    </header>
  );
};

export default Header;
