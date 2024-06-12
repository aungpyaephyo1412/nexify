"use client";
import { createPost } from "@/app/(user)/home/_action";
import { queryClient } from "@/components/query-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import supabase from "@/lib/supabase";
import { fullImagePath } from "@/lib/utils";
import { PostCreateSchema } from "@/types/post.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image as Img, Loader2, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";

const PostCreateForm = () => {
  const [imageUrl, setImageUrl] = useState<null | string>();
  const { data } = useSession({ required: true });
  const {
    register,
    handleSubmit,
    reset,
    resetField,
    watch,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(PostCreateSchema),
  });
  const image = watch("image");
  useEffect(() => {
    if (image) {
      image.length > 0 && setImageUrl(URL.createObjectURL(image[0]));
    }
  }, [image]);
  return (
    <div className="pt-7 lg:pt-0 px-3 lg:px-6 flex gap-5 border-b border-b-gray-400 pb-5 mb-5">
      <div className="size-[45px] bg-black rounded relative overflow-hidden border border-gray-500">
        <Avatar className="size-full rounded-none">
          {data?.user.profilePicture && (
            <AvatarImage src={fullImagePath(data?.user.profilePicture)} />
          )}
          <AvatarFallback className="rounded-none">
            {data?.user?.name?.substring(0, 2) || "User"}
          </AvatarFallback>
        </Avatar>
      </div>
      <form
        onSubmit={handleSubmit(async (data) => {
          if (!data.caption && data.image && data.image.length === 0)
            return null;
          let supabaseUrl;
          if (data.image && data.image.length > 0) {
            const file = data.image[0];
            const { data: d, error } = await supabase.storage
              .from("loopfeed")
              .upload(`posts/${Date.now()}-----${file.name}`, file, {
                cacheControl: "3600",
                upsert: false,
              });
            if (error) return null;
            supabaseUrl = d?.path;
          }
          const res = await createPost({
            ...(supabaseUrl && { imageUrl: supabaseUrl }),
            ...(data.caption && { caption: data.caption }),
          });
          if (res) {
            reset();
            setImageUrl(null);
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
          className="resize-none text-sm outline-none border-b border-b-gray-500 bg-transparent w-full py-3 pr-2 mb-3"
          placeholder={"What is happening?"}
        />
        {imageUrl && (
          <Avatar className="w-full h-[250px]  mb-5 rounded overflow-hidden relative">
            <AvatarImage
              alt={"bl bla"}
              src={imageUrl}
              className="w-full h-full object-cover rounded-none absolute inset-0"
            />
          </Avatar>
        )}
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-2">
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
                {...register("image")}
              />
            </div>
            {imageUrl && (
              <button
                onClick={() => {
                  resetField("image");
                  setImageUrl(null);
                }}
                className="w-fit cursor-pointer p-2 rounded-full hover:bg-blue-300/50 flex justify-center items-center"
              >
                <X size={15} />
              </button>
            )}
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
