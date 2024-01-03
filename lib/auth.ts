import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const currentUser = async () => {
  const session = await auth();

  return session?.user;
};
