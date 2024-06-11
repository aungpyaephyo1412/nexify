import PostCard from "@/components/post-card";
import { Posts } from "@/types/post.types";

const PostLists = ({ posts: { data } }: { posts: Posts }) => {
  return (
    <>
      {data.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
};

export default PostLists;
