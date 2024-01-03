import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const currentUser = async () => {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  return session.user;
};
