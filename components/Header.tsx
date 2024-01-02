import { currentUser } from "@/lib/auth";
import AccountItem from "./AccountItem";
import { ModeToggle } from "./ModeToggle";
import { SocketIndicator } from "./providers/SocketIndicator";

const Header = async () => {
  const user = await currentUser();
  return (
    <header className="w-full fixed z-50 dark:bg-slate-900 bg-white backdrop-blur-lg top-0 left flex justify-center items-center border-b shadow-sm">
      <div className="max-w-[1300px] w-full flex justify-between items-center p-4">
        <div className="flex flex-col justify-center items-center gap-2">
          <h1 className="font-bold dark:text-white text-black text-3xl">X|O</h1>
          <div
            className={`w-10 h-1 dark:bg-white ${
              user?.role === "GOD" ? "bg-yellow-400" : "bg-black"
            }`}
          ></div>
        </div>
        <SocketIndicator />
        <div className="flex justify-center items-center gap-4">
          <AccountItem />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
