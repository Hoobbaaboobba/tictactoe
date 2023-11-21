"use client";

import { usePathname } from "next/navigation";

const PlayPage = () => {
  const pathname = usePathname().split("/");
  return <div className="mt-20">{pathname[1]}</div>;
};

export default PlayPage;
