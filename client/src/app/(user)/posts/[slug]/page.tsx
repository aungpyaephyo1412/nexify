import BackNavigation from "@/components/back-navigation";
import NotFound from "@/components/not-found";
import PostCard from "@/components/post-card";
import safeFetch from "@/lib/safeFetch";
import { PostDataSchema } from "@/types/post.types";

const Page = async ({ params: { slug } }: { params: { slug: string } }) => {
  const { data, error } = await safeFetch(PostDataSchema, `/posts/${slug}`, {
    next: {
      revalidate: false,
      tags: [`post-${slug}`],
    },
  });
  if (error) return <NotFound />;
  return (
    <div>
      <BackNavigation title={"Home"} />
      <PostCard post={data} />
    </div>
  );
};

export default Page;
