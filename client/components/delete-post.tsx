import { deletePost } from '@/app/(user)/home/_action';
import { queryClient } from '@/components/query-provider';
import { Button } from '@/components/ui/button';
import supabase from '@/lib/supabase';
import { concatString } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';

const DeletePost = ({ postId, imageUrl }: { postId: string; imageUrl?: string | null }) => {
  const { data } = useSession({ required: true });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  return (
    <Button
      disabled={isSubmitting}
      variant="outline"
      className="w-full"
      onClick={handleSubmit(async () => {
        if (imageUrl) {
          await supabase.storage.from('loopfeed').remove([imageUrl]);
        }
        const res = await deletePost(postId);
        if (res) {
          await queryClient.invalidateQueries({
            queryKey: ['for-you'],
          });
          await queryClient.invalidateQueries({
            queryKey: ['followings'],
          });
          await queryClient.invalidateQueries({
            queryKey: [concatString(['user', data?.user?.username, 'posts'], '-')],
          });
        }
      })}
    >
      {isSubmitting ? <Loader2 className="text-blue-500 animate-spin size-4" /> : 'Delete'}
    </Button>
  );
};

export default DeletePost;
