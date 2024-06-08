"use client";
import PostCard from "@/components/post-card";

const Page = () => {
  return (
    <div className="space-y-5">
      {Array.from({ length: 50 }).map((_, index) => (
        <PostCard key={index} />
      ))}
    </div>
  );
};

export default Page;
