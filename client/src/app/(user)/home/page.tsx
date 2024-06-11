import PostCard from "@/components/post-card";
import safeFetch from "@/lib/safeFetch";
import { PostsSchema } from "@/types/post.types";

const Page = async () => {
  const { data, error } = await safeFetch(
    PostsSchema,
    "/posts?sort[createdAt]=desc",
    {
      next: {
        revalidate: false,
        tags: ["home-posts", "sort-desc"],
      },
    }
  );
  return (
    <div className="space-y-5">
      {data.data.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Page;
