'use client';
import HomeError from '@/app/(user)/home/error';
import HomeLoading from '@/app/(user)/home/loading';
import CommentForm from '@/components/comment-form';
import DeleteComment from '@/components/delete-comment';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import safeFetch from '@/lib/safeFetch';
import { concatString, fullImagePath, generateBearerToken } from '@/lib/utils';
import { COMMENTS_SCHEMA } from '@/types/post.types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { BadgeCheck } from 'lucide-react';
import moment from 'moment/moment';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { QueryInfiniteScroll } from 'react-query-infinite-scroll';

interface Props {
  postId: string;
}
const Comments = ({ postId }: Props) => {
  const { data: session } = useSession({ required: true });
  const fetchPosts = async ({ pageParam = 1 }) => {
    const { data, error } = await safeFetch(
      COMMENTS_SCHEMA,
      `/comments?postId=${postId}&page=${pageParam}`,
      {
        cache: 'no-store',
        headers: {
          Authorization: generateBearerToken(session?.user.jwt),
        },
      },
    );
    if (error) throw new Error(error);
    return data;
  };
  const query = useInfiniteQuery({
    queryKey: [concatString(['comments', postId])],
    queryFn: fetchPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.meta.nextPage || null,
  });
  return (
    <div className="w-full flex-1 screen-padding py-5">
      <div className="space-y-5">
        <QueryInfiniteScroll
          query={query}
          loading={<HomeLoading />}
          error={<HomeError />}
          observer={<HomeLoading />}
        >
          {(res) => {
            return res.data.map((data) => (
              <div key={data.id}>
                <header className="w-full flex justify-between items-start mb-2">
                  <div className="flex gap-2 items-center">
                    <Avatar className="size-[30px] rounded  overflow-hidden relative bg-white shadow">
                      <AvatarFallback>{data.user.name.substring(0, 2)}</AvatarFallback>
                      {data.user.profilePicture && (
                        <AvatarImage
                          alt={'bl bla'}
                          src={fullImagePath(data.user.profilePicture)}
                          className="w-full h-full object-cover rounded-none absolute inset-0"
                        />
                      )}
                    </Avatar>
                    <div>
                      <Link
                        href={concatString(['/', data.user.username])}
                        className="text-xs font-semibold hover:underline flex items-center gap-x-2"
                      >
                        {data.user.name}
                        {data.user.isAdmin && <BadgeCheck size={14} className="text-blue-500" />}
                      </Link>
                      <p className="text-[10px] font-mono">
                        {moment(data.createdAt).startOf('hour').fromNow()}
                      </p>
                    </div>
                  </div>
                  {data.userId === session?.user.id && (
                    <DeleteComment id={data.id} postId={postId} />
                  )}
                </header>
                <p className="text-sm font-normal">{data.caption}</p>
              </div>
            ));
          }}
        </QueryInfiniteScroll>
      </div>
      <CommentForm postId={postId} />
    </div>
  );
};

export default Comments;
