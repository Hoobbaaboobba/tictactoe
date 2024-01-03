import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full h-[200px] relative -mt-4">
        <Skeleton className="absolute bg-slate-600 w-full h-full rounded-none" />
        <div className="w-full px-4 z-20 flex gap-2 absolute -bottom-8 justify-center items-center">
          <div className="max-w-[1300px] w-full justify-between items-center flex gap-4">
            <div className="rounded-full flex justify-center relative items-center">
              <Skeleton className="w-[100px] h-[100px] rounded-full" />
              <h1 className="text-3xl absolute top-8 left-6 w-full text-slate-400 h-full justify-center items-center">
                X|O
              </h1>
            </div>
            <div className="flex flex-col justify-start gap-2">
              <div className="w-full flex flex-col gap-2 text-white rounded-sm">
                <Skeleton className="w-[100px] h-[35px] rounded-md" />
                <Skeleton className="w-[240px] h-[25px] rounded-md" />
              </div>
              <div className="bg-transparent w-full flex justify-betweem items-center gap-1 rounded-sm">
                <Skeleton className="w-[77px] h-[40px] rounded-md" />
                <Skeleton className="w-[114px] h-[40px] rounded-md" />
                <Skeleton className="w-[40px] h-[40px] rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1300px] w-full mt-12 px-4 flex flex-col gap-2">
        <div
          className={`flex flex-row h-[54px] items-center justify-between rounded-lg border p-3 shadow-sm`}
        >
          <Skeleton className="truncate w-[13px] h-[20px] p-1 rounded-md" />

          <Skeleton className="truncate w-[180px] h-[28px] p-1 rounded-md" />
        </div>
        <div
          className={`flex flex-row h-[54px] items-center justify-between rounded-lg border p-3 shadow-sm`}
        >
          <Skeleton className="truncate w-[29px] h-[28px] p-1 rounded-md" />

          <Skeleton className="truncate w-[67px] h-[28px] p-1 rounded-md" />
        </div>
        <div
          className={`flex flex-row h-[54px] items-center justify-between rounded-lg border p-3 shadow-sm`}
        >
          <Skeleton className="truncate w-[42px] h-[28px] p-1 rounded-md" />

          <Skeleton className="truncate w-[168px] h-[28px] p-1 rounded-md" />
        </div>
        <div
          className={`flex flex-row h-[54px] items-center justify-between rounded-lg border p-3 shadow-sm`}
        >
          <Skeleton className="truncate w-[48px] h-[28px] p-1 rounded-md" />

          <Skeleton className="truncate w-[58px] h-[28px] p-1 rounded-md" />
        </div>
        <div
          className={`flex flex-row h-[54px] items-center justify-between rounded-lg border p-3 shadow-sm`}
        >
          <Skeleton className="truncate w-[50px] h-[28px] p-1 rounded-md" />

          <Skeleton className="truncate w-[40px] h-[28px] p-1 rounded-md" />
        </div>
      </div>
    </div>
  );
}
