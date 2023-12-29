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
import { clerkClient } from "@clerk/nextjs";

export const revalidate = 60;

const LeadersPage = async () => {
  const users = await clerkClient.users.getUserList();

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
                {" "}
                <Avatar>
                  <AvatarImage className="w-12 h-12" src={player.imageUrl} />
                  <AvatarFallback>X|O</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="max-w-[130px] text-center text-ellipsis overflow-x-hidden whitespace-nowrap">
                {player.firstName}
              </TableCell>
              <TableCell className="text-center">{}</TableCell>
              <TableCell className="text-center">{index}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeadersPage;
