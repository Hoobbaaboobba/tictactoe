import { Skeleton } from "./ui/skeleton";

export default function Loading() {
  return (
    <header className="w-full fixed z-50 dark:bg-slate-900 bg-white backdrop-blur-lg top-0 left flex justify-center items-center border-b shadow-sm">
      <div className="max-w-[1300px] w-full flex justify-between items-center p-4">
        <div className="flex flex-col justify-center items-center gap-2">
          <Skeleton className="w-[48px] h-[48px] rounded-full" />
        </div>
        <div className="flex justify-center items-center gap-4">
          <div className="w-[133px] h-[40px] flex justify-center items-center gap-4">
            <Skeleton className="w-[40px] h-[40px] rounded-full" />
            <div className="flex flex-col gap-2 justify-start items-start">
              <Skeleton className="w-[77px] h-[20px]" />
              <Skeleton className="w-[77px] h-[20px]" />
            </div>
          </div>
          <Skeleton className="w-[40px] h-[40px]" />
        </div>
      </div>
    </header>
  );
}
