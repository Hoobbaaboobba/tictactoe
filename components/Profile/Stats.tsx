import { currentUser } from "@/lib/auth";
import ProgressBar from "./ProgressBar";
import { db } from "@/lib/db";
import { User } from "@prisma/client";

interface Props {
  user: User | null;
}

const Stats = ({ user }: Props) => {
  return (
    <div className="max-w-[1300px] w-full mt-12 px-4 flex flex-col gap-2">
      <ProgressBar user={user} />
    </div>
  );
};

export default Stats;
