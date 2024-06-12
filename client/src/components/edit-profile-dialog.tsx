"use client";
import { revaildate, revaildateP } from "@/app/(user)/home/_action";
import SubmitButton from "@/components/submit-button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ValidationInput from "@/components/validation-input";
import safeFetch from "@/lib/safeFetch";
import supabase from "@/lib/supabase";
import { fullImagePath } from "@/lib/utils";
import {
  RegisterReturnSchema,
  userByIdData,
  userUpdateSchema,
} from "@/types/user.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const EditProfileDialog = ({ data: user }: { data: userByIdData }) => {
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<null | string>();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userUpdateSchema),
  });
  const image = watch("image");
  useEffect(() => {
    if (image) {
      console.log(image);
      image.length > 0 && setImageUrl(URL.createObjectURL(image[0]));
    }
  }, [image]);
  const session = useSession({ required: true });
  return (
    <Dialog open={open}>
      <DialogTrigger asChild onClick={() => setOpen((p) => !p)}>
        <button className="border border-gray-500 px-4 py-2 rounded-full text-sm">
          Edit Profile
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(async (data) => {
            const userProfile = user.profilePicture;
            let supabaseUrl;
            if (data.image && data.image.length > 0) {
              if (userProfile) {
                await supabase.storage.from("loopfeed").remove([userProfile]);
              }
              const file = data.image[0];
              const { data: d, error } = await supabase.storage
                .from("loopfeed")
                .upload(`avatars/${Date.now()}-----${file.name}`, file, {
                  cacheControl: "3600",
                  upsert: false,
                });
              if (error) return null;
              supabaseUrl = d?.path;
            }
            const { error } = await safeFetch(
              RegisterReturnSchema,
              `/users/${user.id}`,
              {
                method: "PUT",
                cache: "no-store",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
                body: JSON.stringify({
                  name: data.name,
                  ...(data.bio && { bio: data.bio }),
                  ...(supabaseUrl && { profilePicture: supabaseUrl }),
                }),
              }
            );
            if (!error) {
              await session.update({
                user: {
                  isVerified: true,
                  profilePicture: supabaseUrl,
                  name: data.name,
                  bio: data.bio,
                },
              });
              await revaildate(`profile-${user.username}`);
              await revaildateP(`/${user.username}`);
              setOpen((p) => !p);
            }
          })}
          id={"edit-profile"}
          className="grid gap-4 py-4"
        >
          <div className="flex items-center justify-center w-full mb-4">
            <label
              htmlFor="dropzone-file"
              className="relative overflow-hidden flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              {imageUrl && <Image src={imageUrl} alt={""} fill priority />}
              {user.profilePicture && !imageUrl && (
                <Avatar className="rounded-none absolute inset-0 size-full ">
                  <AvatarImage
                    className="rounded-none absolute inset-0 size-full "
                    src={fullImagePath(user.profilePicture)}
                  />
                </Avatar>
              )}
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG or JPEG (MAX. 5MB)
                </p>
              </div>
              <input
                id="dropzone-file"
                multiple={false}
                accept={"image/jpeg,image/jpg,image/png"}
                type="file"
                className="hidden"
                {...register("image")}
              />
            </label>
          </div>
          <ValidationInput
            defaultValue={user.name}
            id="name"
            title="name"
            isError={!!errors?.name?.message}
            errorMessage={errors?.name?.message as string}
            {...register("name")}
            placeholder={"Enter name "}
            className="border border-gray-500"
          />
          <ValidationInput
            defaultValue={user.bio || ""}
            id="bio"
            title="bio"
            isError={!!errors?.bio?.message}
            errorMessage={errors?.bio?.message as string}
            {...register("bio")}
            placeholder={"Enter bio "}
            className="border border-gray-500"
          />
          {errors.root && (
            <p className="text-sm bg-red-300 border border-gray-500 py-2 text-center px-4">
              {errors.root.message}
            </p>
          )}
        </form>
        <DialogFooter className="grid grid-cols-2 gap-5">
          <DialogClose asChild onClick={() => setOpen((p) => !p)}>
            <Button variant={"outline"}>Close</Button>
          </DialogClose>
          <SubmitButton
            form={"edit-profile"}
            name={"Save changes"}
            isLoading={isSubmitting}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
