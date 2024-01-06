import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-[400px] flex flex-col gap-4">
      <Skeleton className="w-[400px] h-[200px]" />
      <Skeleton className="w-[400px] h-[200px]" />
      <Skeleton className="w-[400px] h-[200px]" />
    </div>
  );
}
