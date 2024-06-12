import { auth } from "@/auth";
import CommentDropdown from "@/components/comment-dropdown";
import NotFound from "@/components/not-found";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import safeFetch from "@/lib/safeFetch";
import { fullImagePath } from "@/lib/utils";
import { PostsSchema } from "@/types/comment.types";
import { BadgeCheck } from "lucide-react";
import Link from "next/link";

const Comments = async ({
  postId,
  ownerId,
}: {
  postId: string;
  ownerId: string;
}) => {
  const session = await auth();
  const { data, error } = await safeFetch(
    PostsSchema,
    `/comments?sort[createdAt]=desc&postId=${postId}`,
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
        <div key={c.id} className="px-3 lg:px-6 flex gap-3">
          <Avatar className="size-[35px] border border-gray-500 rounded">
            {c.user.profilePicture && (
              <AvatarImage src={fullImagePath(c.user.profilePicture)} />
            )}
            <AvatarFallback className=" rounded">
              {c.user.name.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2 w-full">
            <div className="space-y-1 w-full flex justify-between">
              <Link
                href={`/${c.user.username}`}
                className="hover:underline font-semibold text-xs flex items-center gap-x-2"
              >
                {c.user.name}
                <BadgeCheck size={14} className="text-blue-500" />
              </Link>
              {(c.userId === session?.user.id ||
                ownerId === session?.user.id) && (
                <CommentDropdown commentId={c.id} postId={postId} />
              )}
            </div>
            <p className="resize-none text-xs w-full">{c.caption}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
