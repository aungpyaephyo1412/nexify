import { deleteComment } from '@/app/(user)/home/_action';
import LoadingCircle from '@/components/loading-circle';
import { queryClient } from '@/components/query-provider';
import { concatString } from '@/lib/utils';
import { Trash } from 'lucide-react';
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
        {isSubmitting ? <LoadingCircle className={'size-3'} /> : <Trash size={15} />}
      </button>
    </form>
  );
};

export default DeleteComment;
