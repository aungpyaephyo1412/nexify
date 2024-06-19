import NotFound from '@/app/(user)/not-found';
import { auth } from '@/auth';
import EditProfile from '@/components/edit-profile';
import FollowBtn from '@/components/follow-btn';
import HeaderNav from '@/components/header-nav';
import QueryProvider from '@/components/query-provider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import safeFetch from '@/lib/safeFetch';
import { concatString, fullImagePath, generateBearerToken } from '@/lib/utils';
import { USER_BY_ID_SCHEMA } from '@/types/user.types';
import { BadgeCheck, Calendar } from 'lucide-react';
import moment from 'moment';
import { ReactNode } from 'react';
const Layout = async ({
  params: { slug },
  children,
}: {
  params: { slug: string };
  children: ReactNode;
}) => {
  const session = await auth();
  const { data, error } = await safeFetch(USER_BY_ID_SCHEMA, `/users/${slug}`, {
    next: {
      tags: [concatString(['profile', slug], '-')],
      revalidate: false,
    },
    headers: {
      Authorization: generateBearerToken(session?.user.jwt),
    },
  });
  if (error) return <NotFound />;
  const alreadyFollow = data.data.Followers.find((p) => p.followerId === session?.user.id);
  return (
    <>
      <HeaderNav
        currentUserId={data.data.id}
        title={data.data.name}
        description={concatString([data.data._count.Post.toString(), 'posts'], ' ')}
      />
      <div>
        <div className="h-[150px] w-full bg-neutral-400"></div>
        <div className="w-full flex justify-between items-center screen-padding mb-2">
          <div className="size-[100px] lg:size-[150px] rounded-full bg-black -mt-[45px] lg:-mt-[70px] border-4 border-white">
            <Avatar className="size-full rounded-full bg-white">
              {data.data.profilePicture && (
                <AvatarImage src={fullImagePath(data.data.profilePicture)} />
              )}
              <AvatarFallback>{session?.user?.name?.substring(0, 2)}</AvatarFallback>
            </Avatar>
          </div>
          {session?.user.username === slug ? (
            <EditProfile user={data} />
          ) : (
            <FollowBtn followingId={data.data.id} unfollowId={alreadyFollow?.id} />
          )}
        </div>
        <div className="screen-padding space-y-2 mb-5">
          <div className="space-y-1">
            <h1 className="text-lg font-semibold flex items-center gap-x-1">
              {data.data.name}{' '}
              {data.data.isAdmin && <BadgeCheck size={16} className="text-blue-500" />}
            </h1>
            <p className="text-xs text-gray-600">@{data.data.username}</p>
          </div>
          {data.data.bio && <p className="text-sm text-gray-600"> {data.data.bio}</p>}
          <p className="flex items-center gap-x-2 text-xs">
            <Calendar size={13} /> {data.data.dateOfBirth ? 'Date of birth' : 'Joined at'}{' '}
            {moment(data.data.dateOfBirth || data.data.createdAt).format('ll')}
          </p>
        </div>
        <div className="w-full flex gap-x-5 items-center screen-padding mb-7">
          <div className="hover:underline text-sm">{data.data._count.Following} Following</div>
          <div className="hover:underline text-sm">{data.data._count.Followers} Followers</div>
        </div>
      </div>
      <Tabs defaultValue="posts" className="w-full flex-1 flex flex-col">
        <TabsList className="h-fit flex justify-start items-center w-full  rounded-none px-2 lg:px-4">
          <TabsTrigger value="posts" className="py-1 text-gray-950">
            Posts
          </TabsTrigger>
          <TabsTrigger value="followings" className="py-1 text-gray-950">
            Following
          </TabsTrigger>
          <TabsTrigger value="followers" className="py-1 text-gray-950">
            Followers
          </TabsTrigger>
        </TabsList>
        <TabsList className="w-full h-full p-0 bg-transparent flex-1">
          <QueryProvider>{children}</QueryProvider>
        </TabsList>
      </Tabs>
    </>
  );
};

export default Layout;
