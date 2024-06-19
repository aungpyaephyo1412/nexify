import { deleteComment } from '@/app/(user)/home/_action';
import { concatString, revalidateKeys } from '@/lib/utils';
import { Loader2, Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';

const DeleteComment = ({
  id,
  postId,
  username,
}: {
  id: string;
  postId: string;
  username: string;
}) => {
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
          await revalidateKeys([
            'for-you',
            'followings',
            concatString(['comments', postId]),
            concatString(['user', username, 'posts'], '-'),
          ]);
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
