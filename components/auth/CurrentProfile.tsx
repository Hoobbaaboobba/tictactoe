import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const CurrentProfile = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const profile = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  return profile;
};
