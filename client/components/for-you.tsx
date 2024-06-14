'use client';
import HomeLoading from '@/app/(user)/home/loading';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import safeFetch from '@/lib/safeFetch';
import { cn, fullImagePath, generateBearerToken } from '@/lib/utils';
import { POSTS_SCHEMA } from '@/types/post.types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Ellipsis } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { QueryInfiniteScroll } from 'react-query-infinite-scroll';

const ForYou = () => {
  const { data: session } = useSession({ required: true });
  const fetchPosts = async ({ pageParam = 1 }) => {
    const { data } = await safeFetch(
      POSTS_SCHEMA,
      `/posts?sort[createdAt]=desc&sort[Like[_count]]=desc&page=${pageParam}`,
      {
        cache: 'no-store',
        headers: {
          Authorization: generateBearerToken(session?.user.jwt),
        },
      },
    );
    return data;
  };
  const query = useInfiniteQuery({
    queryKey: ['for-you'],
    queryFn: fetchPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.meta.nextPage || null,
  });

  return (
    <QueryInfiniteScroll
      query={query}
      loading={<HomeLoading />}
      error={<HomeLoading />}
      observer={<HomeLoading />}
    >
      {(res) => {
        return res.data.map((data) => (
          <div key={data.id} className="bg-white shadow rounded-lg py-5">
            <header className="w-full flex justify-between items-center mb-5 px-5">
              <div className="flex gap-2 items-center">
                <Avatar className="size-[40px] rounded-full  overflow-hidden relative bg-white shadow">
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
                  <h1 className="text-sm font-semibold">{data.user.name}</h1>
                  <p className="text-xs font-mono">@{data.user.username}</p>
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
            {data.caption && (
              <p className={cn('text-sm font-normal px-5', data.imageUrl && 'mb-3')}>
                {data.caption}
              </p>
            )}
            {data.imageUrl && (
              <Avatar className="h-[200px] w-full rounded-none">
                <AvatarImage src={fullImagePath(data.imageUrl)} className="rounded-none" />
              </Avatar>
            )}
          </div>
        ));
      }}
    </QueryInfiniteScroll>
  );
};

export default ForYou;
