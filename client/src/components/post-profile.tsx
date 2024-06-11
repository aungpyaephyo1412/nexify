import PostProfileSkeleton from "@/components/fallback-ui/post-profile-skeleton";
import NotFound from "@/components/not-found";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import safeFetch from "@/lib/safeFetch";
import { UserByIdDataSchema } from "@/types/user.types";
import { Suspense } from "react";

const Profile = async ({ userName }: { userName: string }) => {
  const { data, error } = await safeFetch(
    UserByIdDataSchema,
    `/users/${userName}`,
    {
      next: {
        tags: [`profile-${userName}`],
        revalidate: false,
      },
    }
  );
  if (error) return <NotFound />;
  return (
    <div className="lg:min-w-96 py-4 text-black">
      <div className="flex items-center gap-5 mb-5">
        <Avatar className="size-[45px] border border-gray-500">
          <AvatarFallback>{data.data.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h1 className="font-semibold text-lg">{data.data.name}</h1>
          <h1 className="text-xs">@{data.data.username}</h1>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5 mb-3">
        <div className="flex flex-col justify-center items-center gap-y-1">
          <h1 className="font-semibold">{data.data._count.Post}</h1>
          <p>posts</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-y-1">
          <h1 className="font-semibold">{data.data._count.Followers}</h1>
          <p>followers</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-y-1">
          <h1 className="font-semibold">{data.data._count.Following}</h1>
          <p>following</p>
        </div>
      </div>
    </div>
  );
};

const PostProfile = ({ userName }: { userName: string }) => {
  return (
    <Suspense fallback={<PostProfileSkeleton />}>
      <Profile userName={userName} />
    </Suspense>
  );
};

export default PostProfile;
