import NotFound from "@/components/not-found";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import safeFetch from "@/lib/safeFetch";
import { PostsSchema } from "@/types/comment.types";

const Comments = async ({ postId }: { postId: string }) => {
  const { data, error } = await safeFetch(
    PostsSchema,
    "/comments?sort[createdAt]=desc",
    {
      next: {
        tags: [`comments-${postId}`],
        revalidate: false,
      },
    }
  );
  if (error) return <NotFound />;
  return (
    <div className="space-y-5">
      {data.data.map((c) => (
        <div key={c.id} className="px-3 lg:px-6 flex gap-5">
          <Avatar className="size-[35px] border border-gray-500 rounded">
            <AvatarFallback className=" rounded">
              {c.user.name.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <div className="space-y-1">
              <h1 className="font-semibold text-xs">{c.user.name}</h1>
            </div>
            <p className="text-xs">{c.caption}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
