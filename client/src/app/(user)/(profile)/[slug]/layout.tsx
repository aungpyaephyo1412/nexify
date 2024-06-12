import { auth } from "@/auth";
import BackNavigation from "@/components/back-navigation";
import EditProfileDialog from "@/components/edit-profile-dialog";
import NavButton from "@/components/nav-button";
import NotFound from "@/components/not-found";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import safeFetch from "@/lib/safeFetch";
import { fullImagePath } from "@/lib/utils";
import { UserByIdDataSchema } from "@/types/user.types";
import { BadgeCheck, Calendar } from "lucide-react";
import moment from "moment";
import { ReactNode } from "react";

const Layout = async ({
  children,
  params: { slug },
}: {
  children: ReactNode;
  params: { slug: string };
}) => {
  const session = await auth();
  const { data, error } = await safeFetch(
    UserByIdDataSchema,
    `/users/${slug}`,
    {
      next: {
        tags: [`profile-${slug}`],
        revalidate: false,
      },
    }
  );
  if (error) return <NotFound />;
  console.log(data.data.profilePicture);
  return (
    <div className="w-full h-full">
      <BackNavigation title={data.data.name} />
      <div>
        <div className="h-[200px] w-full bg-neutral-400"></div>
        <div className="w-full flex justify-between items-center px-3 lg:px-6 mb-7">
          <div className="size-[100px] lg:size-[150px] rounded-full bg-black -mt-[45px] lg:-mt-[70px] border border-blue-500">
            <Avatar className="size-full rounded-full bg-white">
              {data.data.profilePicture && (
                <AvatarImage src={fullImagePath(data.data.profilePicture)} />
              )}
              <AvatarFallback>
                {session?.user?.name?.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
          </div>
          {session?.user.username === slug && (
            <EditProfileDialog data={data.data} />
          )}
        </div>
        <div className="px-3 lg:px-6 space-y-5 mb-5">
          <div className="space-y-1">
            <h1 className="text-lg font-semibold flex items-center gap-x-1">
              {data.data.name}{" "}
              <BadgeCheck size={16} className="text-blue-500" />
            </h1>
            <p className="text-sm text-gray-600">@{data.data.username}</p>
          </div>
          {data.data.bio && (
            <p className="text-sm text-gray-600"> {data.data.bio}</p>
          )}
          <p className="flex items-center gap-x-2 text-sm">
            <Calendar size={15} /> Joined at{" "}
            {moment(data.data.createdAt).format("ll")}
          </p>
        </div>
        <div className="w-full flex gap-x-5 items-center px-3 lg:px-6 mb-7">
          <div className="hover:underline text-sm">
            {data.data._count.Following} Following
          </div>
          <div className="hover:underline text-sm">
            {data.data._count.Followers} Followers
          </div>
        </div>
        <div className="flex w-full items-center overflow-y-hidden border-b border-b-gray-400 mb-7">
          <NavButton
            href={`/${data.data.username}`}
            name={"Posts"}
            className="px-6 "
          />
          <NavButton
            href={`/${data.data.username}/following`}
            name={"Following"}
            className="px-6 "
          />
          <NavButton
            href={`/${data.data.username}/followers`}
            name={"Follower"}
            className="px-6 "
          />
        </div>
      </div>
      <div className="px-3 lg:px-6">{children}</div>
    </div>
  );
};

export default Layout;
