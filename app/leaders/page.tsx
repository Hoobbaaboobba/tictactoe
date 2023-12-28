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

// const Players = [
//   {
//     src: "https://github.com/shadcn.png",
//     name: "Alexey Matveev",
//     points: "100",
//     place: "1",
//   },
//   {
//     src: "https://github.com/shadcn.png",
//     name: "Enemy",
//     points: "90",
//     place: "2",
//   },
//   {
//     src: "https://github.com/shadcn.png",
//     name: "Enemy",
//     points: "80",
//     place: "3",
//   },
//   {
//     src: "https://github.com/shadcn.png",
//     name: "Enemy",
//     points: "70",
//     place: "4",
//   },
//   {
//     src: "https://github.com/shadcn.png",
//     name: "Enemy",
//     points: "60",
//     place: "5",
//   },
//   {
//     src: "https://github.com/shadcn.png",
//     name: "Enemy",
//     points: "50",
//     place: "6",
//   },
//   {
//     src: "https://github.com/shadcn.png",
//     name: "Enemy",
//     points: "40",
//     place: "7",
//   },
//   {
//     src: "https://github.com/shadcn.png",
//     name: "Enemy",
//     points: "30",
//     place: "8",
//   },
//   {
//     src: "https://github.com/shadcn.png",
//     name: "Enemy",
//     points: "20",
//     place: "9",
//   },
//   {
//     src: "https://github.com/shadcn.png",
//     name: "Enemy",
//     points: "10",
//     place: "10",
//   },
//   {
//     src: "https://github.com/shadcn.png",
//     name: "Enemy",
//     points: "0",
//     place: "11",
//   },
//   {
//     src: "https://github.com/shadcn.png",
//     name: "Enemy",
//     points: "0",
//     place: "12",
//   },
//   {
//     src: "https://github.com/shadcn.png",
//     name: "Enemy",
//     points: "0",
//     place: "13",
//   },
//   {
//     src: "https://github.com/shadcn.png",
//     name: "Enemy",
//     points: "0",
//     place: "14",
//   },
//   {
//     src: "https://github.com/shadcn.png",
//     name: "Enemy",
//     points: "0",
//     place: "15",
//   },
// ];

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
                {player.firstName ? player.firstName : "LORD"}
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
