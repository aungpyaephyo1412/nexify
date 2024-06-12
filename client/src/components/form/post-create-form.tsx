"use client";
import { createPost } from "@/app/(user)/home/_action";
import { queryClient } from "@/components/query-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fullImagePath } from "@/lib/utils";
import { PostCreateSchema } from "@/types/post.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image as Img, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";

const PostCreateForm = () => {
  const session = useSession({ required: true });
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(PostCreateSchema),
  });
  return (
    <div className="pt-7 lg:pt-0 px-3 lg:px-6 flex gap-5 border-b border-b-gray-400 pb-5 mb-5">
      <div className="size-[45px] bg-black rounded relative overflow-hidden border border-gray-500">
        <Avatar className="size-full rounded-none">
          {session.data?.user.profilePicture && (
            <AvatarImage
              src={fullImagePath(session.data?.user.profilePicture)}
            />
          )}
          <AvatarFallback className="rounded-none">
            {session?.data?.user.name.substring(0, 2)}
          </AvatarFallback>
        </Avatar>
      </div>
      <form
        onSubmit={handleSubmit(async (data) => {
          const res = await createPost(data);
          if (res) {
            reset();
            await queryClient.invalidateQueries("home-posts");
            return null;
          }
          throw new Error("Something went wrong");
        })}
        className="flex-1"
      >
        <TextareaAutosize
          {...register("caption")}
          maxLength={250}
          minRows={2}
          className="text-sm outline-none border-b border-b-gray-500 bg-transparent w-full py-3 pr-2 mb-3"
          placeholder={"What is happening?"}
        />
        <div className="w-full flex justify-between items-center">
          <div>
            <label
              htmlFor="image"
              className="w-fit cursor-pointer p-2 rounded-full hover:bg-blue-300/50 flex justify-center items-center"
            >
              <Img size={15} />
            </label>
            <input
              id="image"
              type="file"
              hidden
              accept={"image/jpeg,image/jpg,image/png"}
              multiple={false}
            />
          </div>
          <button className="text-xs px-8 py-2 rounded-full text-white bg-blue-500">
            {isSubmitting ? (
              <Loader2 size={15} className="text-white animate-spin" />
            ) : (
              "Post"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostCreateForm;
