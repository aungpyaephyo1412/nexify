'use client';
import { follow, unfollow } from '@/app/(user)/[slug]/_action';
import LoadingCircle from '@/components/loading-circle';
import { Button } from '@/components/ui/button';
import { useAction } from 'next-safe-action/hooks';
import { useParams } from 'next/navigation';

interface Props {
  followingId: string;
  unfollowId?: string;
}
const FollowBtn = ({ followingId, unfollowId }: Props) => {
  const { slug } = useParams();
  const { execute: follow_user, status: follow_user_status } = useAction(follow);
  const { execute: unfollow_user, status: unfollow_user_status } = useAction(unfollow);
  if (unfollowId) {
    return (
      <Button
        onClick={() => {
          unfollow_user({
            unfollowId: unfollowId,
            slug: slug as string,
            followingId,
          });
        }}
        disabled={unfollow_user_status === 'executing'}
        variant={'outline'}
        className="rounded-full px-6 min-w-[100px] py-1 w-auto"
      >
        {unfollow_user_status === 'executing' ? (
          <LoadingCircle className="size-4 mr-0" />
        ) : (
          'Unfollow'
        )}
      </Button>
    );
  }
  return (
    <Button
      onClick={() => {
        follow_user({
          followingId,
          slug: slug as string,
        });
      }}
      disabled={follow_user_status === 'executing'}
      variant={'outline'}
      className="rounded-full px-6 min-w-[100px] py-1 w-auto"
    >
      {follow_user_status === 'executing' ? <LoadingCircle className="size-4 mr-0" /> : 'Follow'}
    </Button>
  );
};

export default FollowBtn;
