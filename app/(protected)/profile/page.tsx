import ProfileComponent from "@/components/Profile/ProfileComponet";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

const ProfilePage = async () => {
  const user = await currentUser();

  const uniqueUser = await db.user.findUnique({
    where: {
      id: user?.id,
    },
  });

  return <ProfileComponent user={uniqueUser} />;
};

export default ProfilePage;
