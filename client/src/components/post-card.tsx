import PostProfileSkeleton from "@/components/fallback-ui/post-profile-skeleton";
import PostDialog from "@/components/post-dialog";
import PostProfile from "@/components/post-profile";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { PostData } from "@/types/post.types";
import { Bookmark, Heart, MessageSquareMore } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

const PostCard = ({
  post,
  className,
}: {
  post: PostData;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "px-3 lg:px-6 h-auto py-5 flex gap-3 border-b border-b-gray-400",
        className
      )}
    >
      <div className="flex justify-between items-start">
        <div className="flex gap-2">
          <Avatar className="size-[45px] border border-gray-500">
            <AvatarFallback>{post.user.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="flex-1">
        <div className="w-full flex justify-between items-start mb-3">
          <div className="space-y-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={`/${post.user.username}`}
                  className="font-semibold text-lg hover:underline leading-none"
                >
                  {post.user.name}
                </Link>
              </TooltipTrigger>
              <TooltipContent
                align={"start"}
                side={"bottom"}
                sideOffset={5}
                className="shadow-md bg-neutral-200"
              >
                <Suspense fallback={<PostProfileSkeleton />}>
                  <PostProfile userName={post.user.username} />
                </Suspense>
              </TooltipContent>
            </Tooltip>
            <div className="flex gap-1 font-mono">
              <h1 className="text-xs">
                {moment(post.createdAt, "YYYYMMDD").fromNow()}
              </h1>
            </div>
          </div>
          <PostDialog postId={post._id} />
        </div>
        <Link href={`/posts/${post._id}`}>
          {post.caption && <p className="text-sm mb-5 ">{post.caption}</p>}
          {post.imageUrl && (
            <div className="h-[280px] w-full bg-slate-300 mb-5 relative overflow-hidden rounded">
              <Image
                src={"/hello.jpeg"}
                alt={"image"}
                fill
                priority
                className="object-cover"
              />
            </div>
          )}
        </Link>
        <div className="flex w-full justify-between items-center">
          <div className="flex gap-5 items-center ">
            <div className="flex items-center gap-1">
              <button className="cursor-pointer p-2 rounded-full hover:bg-blue-300/50 flex justify-center items-center">
                <Heart size={18} />
              </button>
              <span>{post.likes.length}</span>
            </div>
            <div className="flex items-center gap-1">
              <button className="cursor-pointer p-2 rounded-full hover:bg-blue-300/50 flex justify-center items-center">
                <MessageSquareMore size={18} />
              </button>
              <span>{post.comments.length}</span>
            </div>
          </div>
          <button className="cursor-pointer p-2 rounded-full hover:bg-blue-300/50 flex justify-center items-center">
            <Bookmark />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
