import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/lib/db";
import { Crown } from "lucide-react";

const LeadersPage = async () => {
  const users = await db.user.findMany({
    orderBy: {
      points: "desc",
    },
    select: {
      name: true,
      image: true,
      points: true,
      role: true,
    },
  });

  return (
    <div className="px-2">
      <Table>
        <TableCaption>Список лидеров</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="max-w-[130px] w-full text-center"></TableHead>
            <TableHead className="text-center">Ник</TableHead>
            <TableHead className="text-center">Очки</TableHead>
            <TableHead className="text-center">Место</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((player, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                <div className="relative">
                  {player.role === "GOD" && (
                    <Crown className="absolute -top-[17px] left-2 text-yellow-400" />
                  )}
                  <Avatar>
                    <AvatarImage
                      src={player.image || "https://github.com/shadcn.png"}
                    />
                    <AvatarFallback>X|O</AvatarFallback>
                  </Avatar>
                </div>
              </TableCell>
              <TableCell className="max-w-[130px] text-center text-ellipsis overflow-x-hidden whitespace-nowrap">
                {player.name}
              </TableCell>
              <TableCell className="text-center">{player.points}</TableCell>
              <TableCell className="text-center">{index + 1}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeadersPage;
