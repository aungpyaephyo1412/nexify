"use server";

import { auth } from "@/auth";
import safeFetch from "@/lib/safeFetch";
import { PostCreateReturnSchema } from "@/types/post.types";
import { revalidatePath, revalidateTag } from "next/cache";

export const createPost = async (formData: {}) => {
  const session = await auth();
  const { data, error } = await safeFetch(PostCreateReturnSchema, "/posts", {
    method: "POST",
    body: JSON.stringify({ ...formData, user: session!.user.id }),
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (error) return null;
  revalidateTag("home-posts");
  revalidatePath("/home");
  return data;
};
