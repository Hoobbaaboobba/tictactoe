import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Loading() {
  return (
    <div className="px-2">
      <Table className="px-2">
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
          <TableRow className="h-[73px]">
            <TableCell className="font-medium">
              <Skeleton className="ml-2 w-[40px] h-[40px] rounded-full" />
            </TableCell>
            <TableCell className="max-w-[130px] text-center text-ellipsis overflow-x-hidden whitespace-nowrap">
              <Skeleton className="w-[100px] h-[40px] rounded-full" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="w-[40px] h-[40px] rounded-full" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="w-[40px] h-[40px] rounded-full" />
            </TableCell>
          </TableRow>
          <TableRow className="h-[73px]">
            <TableCell className="font-medium">
              <Skeleton className="ml-2 w-[40px] h-[40px] rounded-full" />
            </TableCell>
            <TableCell className="max-w-[130px] text-center text-ellipsis overflow-x-hidden whitespace-nowrap">
              <Skeleton className="w-[100px] h-[40px] rounded-full" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="w-[40px] h-[40px] rounded-full" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="w-[40px] h-[40px] rounded-full" />
            </TableCell>
          </TableRow>
          <TableRow className="h-[73px]">
            <TableCell className="font-medium">
              <Skeleton className="ml-2 w-[40px] h-[40px] rounded-full" />
            </TableCell>
            <TableCell className="max-w-[130px] text-center text-ellipsis overflow-x-hidden whitespace-nowrap">
              <Skeleton className="w-[100px] h-[40px] rounded-full" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="w-[40px] h-[40px] rounded-full" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="w-[40px] h-[40px] rounded-full" />
            </TableCell>
          </TableRow>
          <TableRow className="h-[73px]">
            <TableCell className="font-medium">
              <Skeleton className="ml-2 w-[40px] h-[40px] rounded-full" />
            </TableCell>
            <TableCell className="max-w-[130px] text-center text-ellipsis overflow-x-hidden whitespace-nowrap">
              <Skeleton className="w-[100px] h-[40px] rounded-full" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="w-[40px] h-[40px] rounded-full" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="w-[40px] h-[40px] rounded-full" />
            </TableCell>
          </TableRow>
          <TableRow className="h-[73px]">
            <TableCell className="font-medium">
              <Skeleton className="ml-2 w-[40px] h-[40px] rounded-full" />
            </TableCell>
            <TableCell className="max-w-[130px] text-center text-ellipsis overflow-x-hidden whitespace-nowrap">
              <Skeleton className="w-[100px] h-[40px] rounded-full" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="w-[40px] h-[40px] rounded-full" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="w-[40px] h-[40px] rounded-full" />
            </TableCell>
          </TableRow>
          <TableRow className="h-[73px]">
            <TableCell className="font-medium">
              <Skeleton className="ml-2 w-[40px] h-[40px] rounded-full" />
            </TableCell>
            <TableCell className="max-w-[130px] text-center text-ellipsis overflow-x-hidden whitespace-nowrap">
              <Skeleton className="w-[100px] h-[40px] rounded-full" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="w-[40px] h-[40px] rounded-full" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="w-[40px] h-[40px] rounded-full" />
            </TableCell>
          </TableRow>
          <TableRow className="h-[73px]">
            <TableCell className="font-medium">
              <Skeleton className="ml-2 w-[40px] h-[40px] rounded-full" />
            </TableCell>
            <TableCell className="max-w-[130px] text-center text-ellipsis overflow-x-hidden whitespace-nowrap">
              <Skeleton className="w-[100px] h-[40px] rounded-full" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="w-[40px] h-[40px] rounded-full" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="w-[40px] h-[40px] rounded-full" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
