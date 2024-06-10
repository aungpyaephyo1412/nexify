import { Skeleton } from "@/components/ui/skeleton";

const PostProfileSkeleton = () => {
  return (
    <div className="space-y-5">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full lg:w-[250px]" />
          <Skeleton className="h-4 w-full lg:w-[200px]" />
        </div>
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
    </div>
  );
};

export default PostProfileSkeleton;