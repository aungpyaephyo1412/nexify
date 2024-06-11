"use client";
import { createComment } from "@/app/(user)/posts/_action";
import { commentCreateSchema } from "@/types/comment.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";

const PostCreateForm = ({ postId }: { postId: string }) => {
  const { data: session } = useSession({ required: true });
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(commentCreateSchema),
  });
  return (
    <div className="px-3 lg:px-6 flex gap-5 py-5 mb-5">
      <form
        onSubmit={handleSubmit(async (data) => {
          const res = await createComment({
            caption: data.caption,
            userId: session?.user?.id as string,
            postId,
          });
          if (res) {
            reset();
          }
        })}
        className="flex-1"
      >
        <TextareaAutosize
          {...register("caption")}
          maxLength={250}
          minRows={2}
          className="text-sm outline-none border-b border-b-gray-500 bg-transparent w-full py-3 pr-2 mb-3"
          placeholder={"Write your comment"}
        />
        <div className="w-full flex justify-end items-center">
          <button className="text-xs px-8 py-2 rounded-full text-white bg-blue-500">
            {isSubmitting ? (
              <Loader2 size={15} className="text-white animate-spin" />
            ) : (
              "Reply"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostCreateForm;
