import { deleteComment } from '@/app/(user)/home/_action';
import { queryClient } from '@/components/query-provider';
import { concatString } from '@/lib/utils';
import { Loader2, Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';

const DeleteComment = ({ id, postId }: { id: string; postId: string }) => {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  return (
    <form
      className="inline-flex"
      onSubmit={handleSubmit(async () => {
        const res = await deleteComment(id);
        if (res) {
          await queryClient.invalidateQueries({
            queryKey: ['for-you'],
          });
          await queryClient.invalidateQueries({
            queryKey: [concatString(['comments', postId])],
          });
          await queryClient.invalidateQueries({
            queryKey: ['followings'],
          });
        }
      })}
    >
      <button disabled={isSubmitting}>
        {isSubmitting ? (
          <Loader2 className={'size-4 text-blue-500 animate-spin'} />
        ) : (
          <Trash size={15} />
        )}
      </button>
    </form>
  );
};

export default DeleteComment;
