"use server";

import safeFetch from "@/lib/safeFetch";
import { PostCreateReturnSchema } from "@/types/post.types";
import { RegisterReturnSchema } from "@/types/user.types";
import { revalidatePath, revalidateTag } from "next/cache";

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

interface commentForm {
  postId: string;
  userId: string;
  caption: string;
}
export const createComment = async (form: commentForm) => {
  const { data, error } = await safeFetch(RegisterReturnSchema, "/comments", {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(form),
  });
  if (error) return null;
  revalidateTag(`comments-${form.postId}`);
  revalidatePath("/home");
  return data;
};
