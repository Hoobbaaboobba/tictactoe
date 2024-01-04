"use client";

import { useSocket } from "./SocketProvider";

export const SocketIndicator = () => {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return <span className="text-xl text-rose-500 animate-pulse">{">"}1c</span>;
  }
};
