import BackNavigation from "@/components/back-navigation";
import Comments from "@/components/comments";
import CommentForm from "@/components/form/comment-form";
import NotFound from "@/components/not-found";
import PostCard from "@/components/post-card";
import safeFetch from "@/lib/safeFetch";
import { PostDataSchema } from "@/types/post.types";

const Page = async ({ params: { slug } }: { params: { slug: string } }) => {
  const { data, error } = await safeFetch(PostDataSchema, `/posts/${slug}`, {
    cache: "no-store",
    // next: {
    //   revalidate: false,
    //   tags: [`post-${slug}`],
    // },
  });
  if (error) return <NotFound />;
  return (
    <div>
      <BackNavigation title={"Home"} />
      <PostCard post={data} />
      <CommentForm postId={slug} />
      <Comments postId={slug} />
    </div>
  );
};

export default Page;
