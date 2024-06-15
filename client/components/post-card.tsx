'use client';
import { likePost, unlikePost } from '@/app/(user)/home/_action';
import Comments from '@/components/comments';
import DialogDrawer from '@/components/dialog-drawer';
import { queryClient } from '@/components/query-provider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn, concatString, fullImagePath } from '@/lib/utils';
import { POSTS_DATA_TYPE } from '@/types/post.types';
import { BadgeCheck, Bookmark, Ellipsis, Heart, MessageSquareMore, X } from 'lucide-react';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

const PostCard = ({ post }: { post: POSTS_DATA_TYPE }) => {
  const { data } = useSession({ required: true });
  const likeByUser = post.Like.find((p) => p.userId === data?.user?.id);
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white shadow rounded-lg py-5">
      <header className="w-full flex justify-between items-center mb-5 px-3 md:px-5">
        <div className="flex gap-2 items-center">
          <Avatar className="size-[40px] rounded-full  overflow-hidden relative bg-white shadow">
            <AvatarFallback>{post.user.name.substring(0, 2)}</AvatarFallback>
            {post.user.profilePicture && (
              <AvatarImage
                alt={'bl bla'}
                src={fullImagePath(post.user.profilePicture)}
                className="w-full h-full object-cover rounded-none absolute inset-0"
              />
            )}
          </Avatar>
          <div>
            <Link
              href={concatString(['/', post.user.username])}
              className="text-sm font-semibold hover:underline flex items-center gap-x-2"
            >
              {post.user.name}
              {post.user.isAdmin && <BadgeCheck size={14} className="text-blue-500" />}
            </Link>
            <p className="text-xs font-mono">{moment(post.createdAt).startOf('hour').fromNow()}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="border-none outline-none">
            <button>
              <Ellipsis size={18} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align={'end'}>
            <DropdownMenuItem>Delete</DropdownMenuItem>
            <DropdownMenuItem>Report</DropdownMenuItem>
            <DropdownMenuItem>Follow</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      {post.caption && (
        <p className={cn('text-sm font-normal px-3 md:px-5', 'mb-3')}>{post.caption}</p>
      )}
      {post.imageUrl && (
        <Avatar className="h-[300px] w-full rounded-none mb-5">
          <AvatarImage src={fullImagePath(post.imageUrl)} className="rounded-none" />
        </Avatar>
      )}
      <footer className="px-3 md:px-5">
        <div className="flex w-full justify-between items-center">
          <div className="flex gap-5 items-center ">
            <div className="flex items-center gap-1">
              {likeByUser ? (
                <button
                  onClick={async () => {
                    await unlikePost(likeByUser.id, post.id);
                    await queryClient.invalidateQueries({
                      queryKey: ['for-you'],
                    });
                    await queryClient.invalidateQueries({
                      queryKey: ['followings'],
                    });
                  }}
                  className="cursor-pointer p-2 rounded-full hover:bg-blue-300/50 flex justify-center items-center"
                >
                  <Heart size={15} className="fill-black" />
                </button>
              ) : (
                <button
                  onClick={async () => {
                    await likePost(post.id);
                    await queryClient.invalidateQueries({
                      queryKey: ['for-you'],
                    });
                    await queryClient.invalidateQueries({
                      queryKey: ['followings'],
                    });
                  }}
                  className="cursor-pointer p-2 rounded-full hover:bg-blue-300/50 flex justify-center items-center"
                >
                  <Heart size={15} />
                </button>
              )}
              <span className="text-xs">{post._count.Like}</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setOpen((p) => !p)}
                className="cursor-pointer p-2 rounded-full hover:bg-blue-300/50 flex justify-center items-center"
              >
                <MessageSquareMore size={15} />
              </button>
              <span className="text-xs">{post._count.Comment}</span>
              <DialogDrawer open={open} setOpen={setOpen}>
                <div className="size-full flex flex-col">
                  <div className="w-full flex justify-between items-center screen-padding">
                    <h1>Comments</h1>
                    <button
                      onClick={() => setOpen((p) => !p)}
                      className="cursor-pointer p-2 rounded-full hover:bg-blue-300/50 flex justify-center items-center"
                    >
                      <X size={17} />
                    </button>
                  </div>
                  <Comments postId={post.id} />
                </div>
              </DialogDrawer>
            </div>
          </div>
          <button className="cursor-pointer p-2 rounded-full hover:bg-blue-300/50 flex justify-center items-center">
            <Bookmark size={17} />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default PostCard;
