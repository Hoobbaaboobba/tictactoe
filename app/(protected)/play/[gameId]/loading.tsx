import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <Skeleton className="rounded-2xl w-[278px] h-[200px]" />
      <Skeleton className="w-[320px] h-[320px] rounded-xl" />
    </div>
  );
}
