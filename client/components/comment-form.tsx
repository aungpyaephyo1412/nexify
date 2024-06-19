'use client';
import { createComment } from '@/app/(user)/home/_action';
import { concatString, revalidateKeys } from '@/lib/utils';
import { CREATE_COMMENT_SCHEMA } from '@/types/post.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

const CommentForm = ({ postId, username }: { postId: string; username: string }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(CREATE_COMMENT_SCHEMA),
  });
  return (
    <div className="screen-padding flex gap-5 py-5 mb-5">
      <form
        onSubmit={handleSubmit(async (data) => {
          const res = await createComment({
            caption: data.caption,
            postId,
          });
          if (res) {
            reset();
            await revalidateKeys([
              'for-you',
              'followings',
              concatString(['comments', postId]),
              concatString(['user', username, 'posts'], '-'),
            ]);
          }
        })}
        className="flex-1"
      >
        <TextareaAutosize
          {...register('caption')}
          maxLength={250}
          minRows={2}
          className="resize-none text-sm outline-none border-b border-b-gray-500 bg-transparent w-full py-3 pr-2 mb-3"
          placeholder={'Write your comment'}
        />
        <div className="w-full flex justify-end items-center">
          <button className="text-xs px-8 py-2 rounded-full text-white bg-blue-500">
            {isSubmitting ? <Loader2 size={15} className="text-white animate-spin" /> : 'Reply'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
