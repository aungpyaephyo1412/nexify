import NotFound from '@/app/(user)/not-found';
import { auth } from '@/auth';
import EditProfile from '@/components/edit-profile';
import HeaderNav from '@/components/header-nav';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
  return (
    <>
      <HeaderNav
        title={data.data.name}
        description={concatString([data.data._count.Post.toString(), 'posts'], ' ')}
      />
      <div className="">
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
          {session?.user.username === slug ? <EditProfile user={data} /> : <button>Follow</button>}
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
            <Calendar size={13} /> Joined at {moment(data.data.createdAt).format('ll')}
          </p>
        </div>
        <div className="w-full flex gap-x-5 items-center px-3 lg:px-6 mb-7">
          <div className="hover:underline text-sm">{data.data._count.Followers} Following</div>
          <div className="hover:underline text-sm">{data.data._count.Following} Followers</div>
        </div>
      </div>
      <div>{children}</div>
    </>
  );
};

export default Layout;
