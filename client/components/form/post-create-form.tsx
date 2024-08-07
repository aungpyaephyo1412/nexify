'use client';
import { createPost } from '@/app/(user)/home/_action';
import FileInput from '@/components/file-input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import supabase from '@/lib/supabase';
import { cn, concatString, fullImagePath, revalidateKeys } from '@/lib/utils';
import { POST_CREATE_SCHEMA } from '@/types/post.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { Loader2, X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
const PostCreateForm = ({
  fullImage = false,
  sideImage = true,
  setOpen,
}: {
  fullImage?: boolean;
  sideImage?: boolean;
  setOpen?: (b: boolean) => void;
}) => {
  const [imageUrl, setImageUrl] = useState<null | string>();
  const {
    register,
    handleSubmit,
    reset,
    resetField,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(POST_CREATE_SCHEMA),
  });
  const image = watch('image');
  useEffect(() => {
    if (image) {
      image.length > 0 && setImageUrl(URL.createObjectURL(image[0]));
    }
  }, [image]);
  const { data: session } = useSession();
  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        if (!data.caption && data.image.length === 0) return null;
        let supabaseUrl;
        if (data.image && data.image.length > 0) {
          const file = data.image[0];
          const { data: d, error } = await supabase.storage
            .from('loopfeed')
            .upload(`posts/${Date.now()}-----${file.name}`, file, {
              cacheControl: '3600',
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
          await revalidateKeys([
            'for-you',
            'followings',
            concatString(['user', session?.user?.id, 'posts'], '-'),
          ]);
          setOpen && setOpen(false);
          return null;
        }
        throw new Error('Something went wrong');
      })}
      className="px-3 lg:px-6 mb-9  pt-5"
    >
      <div className={cn('bg-white rounded-lg shadow p-5', fullImage && 'shadow-none')}>
        {fullImage && (
          <div className="mb-4">
            <FileInput {...register('image')} imageUrl={imageUrl} />
          </div>
        )}
        <div className="flex items-start gap-x-5">
          {sideImage && (
            <div className="size-[50px] rounded-full bg-gray-900">
              <Avatar className="size-full  mb-5 rounded overflow-hidden relative border-2 border-black">
                <AvatarFallback className="rounded-none">
                  {session?.user?.name?.substring(0, 2)}
                </AvatarFallback>
                {session?.user.profilePicture && (
                  <AvatarImage
                    alt={'bl bla'}
                    src={fullImagePath(session?.user.profilePicture)}
                    className="w-full h-full object-cover rounded-none absolute inset-0"
                  />
                )}
              </Avatar>
            </div>
          )}
          <div className="flex-1">
            <TextareaAutosize
              {...register('caption')}
              minRows={1}
              maxRows={3}
              maxLength={350}
              className="resize-none text-sm outline-none border-b border-b-gray-500 bg-transparent w-full py-3 pr-2 mb-3"
              placeholder="What’s Happening?"
            />
            {imageUrl && !fullImage && (
              <Avatar className="w-full h-[250px] rounded overflow-hidden relative mb-2">
                <AvatarImage
                  alt={'bl bla'}
                  src={imageUrl}
                  className="w-full h-full object-cover rounded-none absolute inset-0"
                />
              </Avatar>
            )}
            <p className="text-xs font-medium text-red-500 mb-5">
              {(errors?.image?.message as string) || ''}
            </p>
            <div className="w-full flex justify-between items-center">
              <div className="flex items-center gap-2">
                {!fullImage && (
                  <FileInput {...register('image')} imageUrl={imageUrl} fullImage={false} />
                )}
                {imageUrl && (
                  <button
                    onClick={() => {
                      resetField('image');
                      setImageUrl(null);
                    }}
                    className="w-fit cursor-pointer p-2 rounded-full hover:bg-blue-300/50 flex justify-center items-center"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>
              <button
                type={'submit'}
                disabled={isSubmitting}
                className="text-xs px-8 py-2 rounded-full text-white bg-blue-500"
              >
                {isSubmitting ? <Loader2 size={15} className="text-white animate-spin" /> : 'Post'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PostCreateForm;
