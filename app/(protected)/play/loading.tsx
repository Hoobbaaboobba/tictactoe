import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  <div className="w-[400px] flex flex-col gap-1">
    <Skeleton className="w-full" />
    <Skeleton className="w-full h-[236px]" />
  </div>;
}
