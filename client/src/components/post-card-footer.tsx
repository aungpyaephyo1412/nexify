"use client";
import { likePost, unlikePost } from "@/app/(user)/home/_action";
import { queryClient } from "@/components/query-provider";
import { PostData } from "@/types/post.types";
import { Bookmark, Heart, MessageSquareMore } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const PostCardFooter = ({ post }: { post: PostData }) => {
  const { data } = useSession({ required: true });
  const likeByUser = post.Like.find((p) => p.userId === data?.user?.id);
  return (
    <div className="flex w-full justify-between items-center">
      <div className="flex gap-5 items-center ">
        <div className="flex items-center gap-1">
          {likeByUser ? (
            <button
              onClick={async () => {
                await unlikePost(likeByUser.id, post.id);
                await queryClient.invalidateQueries("home-posts");
              }}
              className="cursor-pointer p-2 rounded-full hover:bg-blue-300/50 flex justify-center items-center"
            >
              <Heart size={15} className="fill-black" />
            </button>
          ) : (
            <button
              onClick={async () => {
                await likePost(post.id);
                await queryClient.invalidateQueries("home-posts");
              }}
              className="cursor-pointer p-2 rounded-full hover:bg-blue-300/50 flex justify-center items-center"
            >
              <Heart size={15} />
            </button>
          )}
          <span className="text-xs">{post._count.Like}</span>
        </div>
        <div className="flex items-center gap-1">
          <Link
            href={`/posts/${post.id}`}
            className="cursor-pointer p-2 rounded-full hover:bg-blue-300/50 flex justify-center items-center"
          >
            <MessageSquareMore size={15} />
          </Link>
          <span className="text-xs">{post._count.Comment}</span>
        </div>
      </div>
      <button className="cursor-pointer p-2 rounded-full hover:bg-blue-300/50 flex justify-center items-center">
        <Bookmark size={17} />
      </button>
    </div>
  );
};

export default PostCardFooter;
