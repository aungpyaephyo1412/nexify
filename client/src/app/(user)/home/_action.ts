"use server";

import { auth } from "@/auth";
import safeFetch from "@/lib/safeFetch";
import { PostCreateReturnSchema } from "@/types/post.types";
import { RegisterReturnSchema } from "@/types/user.types";
import { revalidatePath, revalidateTag } from "next/cache";

export const createPost = async (formData: {}) => {
  const session = await auth();
  const { data, error } = await safeFetch(PostCreateReturnSchema, "/posts", {
    method: "POST",
    body: JSON.stringify({ ...formData, userId: session!.user.id }),
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

export const likePost = async (postId: string) => {
  const session = await auth();
  const { data, error } = await safeFetch(RegisterReturnSchema, "/likes", {
    method: "POST",
    body: JSON.stringify({ postId, userId: session?.user.id }),
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (!error) {
    revalidateTag("home-posts");
    revalidatePath("/home");
  }
};

export const unlikePost = async (postId: string) => {
  const { data, error } = await safeFetch(
    RegisterReturnSchema,
    `/likes/${postId}`,
    {
      method: "DELETE",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  if (!error) {
    revalidateTag("home-posts");
    revalidatePath("/home");
  }
};
