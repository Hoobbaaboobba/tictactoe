"use client";

import ProfileComponent from "@/components/ProfileComponet";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const ProfilePage = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/client");
    },
  });

  return <ProfileComponent user={session?.user} pagetype={"Client"} />;
};

export default ProfilePage;
