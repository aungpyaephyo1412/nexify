import PostCard from "@/components/post-card";
import safeFetch from "@/lib/safeFetch";
import { PostsSchema } from "@/types/post.types";

const Page = async () => {
  const { data, error } = await safeFetch(PostsSchema, "/posts", {
    next: {
      revalidate: false,
      tags: ["home-posts"],
    },
  });
  return (
    <div className="space-y-5">
      {data.data.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Page;
