import { Skeleton } from "@/components/ui/skeleton";

const ModesPage = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="max-w-[1300px] w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-4">
        <Skeleton className="h-[250px]" />
        <Skeleton className="h-[250px]" />
        <Skeleton className="h-[250px]" />
        <Skeleton className="h-[250px]" />
        <Skeleton className="h-[250px]" />
        <Skeleton className="h-[250px]" />
        <Skeleton className="h-[250px]" />
        <Skeleton className="h-[250px]" />
        <Skeleton className="h-[250px]" />
        <Skeleton className="h-[250px]" />
        <Skeleton className="h-[250px]" />
        <Skeleton className="h-[250px]" />
        <Skeleton className="h-[250px]" />
        <Skeleton className="h-[250px]" />
      </div>
    </div>
  );
};

export default ModesPage;
