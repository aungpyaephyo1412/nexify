"use client";
import Loading from "@/app/(user)/posts/loading";
import FollowingLists from "@/components/following-lists";
import LoadingCircle from "@/components/loading-circle";
import safeFetch from "@/lib/safeFetch";
import { FollowingSchema } from "@/types/follow.types";
import { useSession } from "next-auth/react";
import { InView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";

const Page = () => {
  const { data: session } = useSession({ required: true });
  const fetchPosts = async ({ pageParam = 1 }) => {
    const { data } = await safeFetch(
      FollowingSchema,
      `/followings?sort[createdAt]=desc&followerId=${session?.user?.id}&page=${pageParam}`,
      {
        cache: "no-store",
      }
    );
    return data;
  };

  const { data, fetchNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["following"],
      queryFn: async ({ pageParam }) => await fetchPosts({ pageParam }),
      getNextPageParam: (lastPage) =>
        lastPage.meta.nextPage || lastPage.meta.currentPage,
    });
  if (isLoading) return <Loading />;
  return (
    <div className="space-y-5">
      {data?.pages.map((postList, index) => (
        <FollowingLists users={postList.data} key={index} />
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
