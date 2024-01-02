"use client";

import { useSocket } from "./SocketProvider";
import { WifiOff } from "lucide-react";

export const SocketIndicator = () => {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return (
      <div className="bg-rose-600 animate-bounce shadow-md shadow-rose-400 transition flex justify-center items-center text-white border-none rounded-full w-10 h-10">
        <WifiOff className="w-6 h-6" />
      </div>
    );
  }
};
