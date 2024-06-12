"use client";
import Loading from "@/app/(user)/posts/loading";
import LoadingCircle from "@/components/loading-circle";
import PostLists from "@/components/post-lists";
import safeFetch from "@/lib/safeFetch";
import { PostsSchema } from "@/types/post.types";
import { InView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";

const Page = () => {
  const fetchPosts = async ({ pageParam = 1 }) => {
    const { data } = await safeFetch(
      PostsSchema,
      `/posts?sort[createdAt]=desc&page=${pageParam}`,
      {
        cache: "no-store",
      }
    );
    return data;
  };

  const { data, fetchNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["home-posts"],
      queryFn: async ({ pageParam }) => await fetchPosts({ pageParam }),
      getNextPageParam: (lastPage) =>
        lastPage.meta.nextPage || lastPage.meta.currentPage,
    });
  if (isLoading) return <Loading />;
  return (
    <div className="space-y-5">
      {data?.pages.map((postList, index) => (
        <PostLists posts={postList} key={index} />
      ))}
      <div className="w-full flex justify-center items-center">
        {(isLoading || isFetchingNextPage) && <LoadingCircle />}
        {!isLoading &&
          !isFetchingNextPage &&
          !data?.pages[data?.pages.length - 1].meta.isLastPage && (
            <InView
              as="div"
              onChange={async (inView) => inView && (await fetchNextPage())}
            ></InView>
          )}
      </div>
    </div>
  );
};

export default Page;
