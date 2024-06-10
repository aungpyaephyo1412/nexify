"use server";

import safeFetch from "@/lib/safeFetch";
import { PostCreateReturnSchema } from "@/types/post.types";
import { revalidateTag } from "next/cache";

export const deletePost = async (id: string) => {
  const { data, error } = await safeFetch(
    PostCreateReturnSchema,
    `/posts/${id}`,
    {
      method: "DELETE",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  if (error) throw new Error(error);
  revalidateTag("home-posts");
};
