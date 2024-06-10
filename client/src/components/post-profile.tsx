import NotFound from "@/components/not-found";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import safeFetch from "@/lib/safeFetch";
import { UserByIdDataSchema } from "@/types/user.types";

const PostProfile = async ({ userName }: { userName: string }) => {
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
        <div className="size-[45px] rounded bg-gray-950">
          <Avatar className="size-full rounded-none">
            <AvatarFallback className="rounded-none">
              {data.data.name.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="space-y-1">
          <h1 className="font-semibold text-lg">{data.data.name}</h1>
          <h1 className="text-xs">@{data.data.username}</h1>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5 mb-3">
        <div className="flex flex-col justify-center items-center gap-y-1">
          <h1 className="font-semibold">{data.data.posts.length}</h1>
          <p>posts</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-y-1">
          <h1 className="font-semibold">{data.data.followers.length}</h1>
          <p>followers</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-y-1">
          <h1 className="font-semibold">{data.data.following.length}</h1>
          <p>following</p>
        </div>
      </div>
    </div>
  );
};

export default PostProfile;
