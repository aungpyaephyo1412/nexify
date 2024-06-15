'use client';
import HomeError from '@/app/(user)/home/error';
import HomeLoading from '@/app/(user)/home/loading';
import PostCard from '@/components/post-card';
import safeFetch from '@/lib/safeFetch';
import { generateBearerToken } from '@/lib/utils';
import { POSTS_SCHEMA } from '@/types/post.types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { QueryInfiniteScroll } from 'react-query-infinite-scroll';

const Followings = () => {
  const { data: session } = useSession({ required: true });
  const fetchPosts = async ({ pageParam = 1 }) => {
    const { data, error } = await safeFetch(
      POSTS_SCHEMA,
      `/posts/followings/${session?.user?.id}?sort[createdAt]=desc&page=${pageParam}`,
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
    queryKey: ['followings'],
    queryFn: fetchPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.meta.nextPage || null,
  });

  return (
    <QueryInfiniteScroll
      query={query}
      loading={<HomeLoading />}
      error={<HomeError />}
      observer={<HomeLoading />}
    >
      {(res) => {
        return res.data.map((data) => <PostCard post={data} key={data.id} />);
      }}
    </QueryInfiniteScroll>
  );
};

export default Followings;
