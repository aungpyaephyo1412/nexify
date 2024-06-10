import { auth } from "@/auth";
import BackNavigation from "@/components/back-navigation";
import NavButton from "@/components/nav-button";
import NotFound from "@/components/not-found";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import safeFetch from "@/lib/safeFetch";
import { UserByIdDataSchema } from "@/types/user.types";
import { Calendar } from "lucide-react";
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
  return (
    <div className="w-full h-full">
      <BackNavigation title={data.data.name} />
      <div>
        <div className="h-[250px] w-full bg-neutral-400"></div>
        <div className="w-full flex justify-between items-center px-3 lg:px-6 mb-7">
          <div className="size-[100px] lg:size-[150px] rounded-full bg-black -mt-[45px] lg:-mt-[70px] border border-blue-500">
            <Avatar className="size-full rounded-full bg-white">
              <AvatarFallback>
                {session?.user?.name?.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
          </div>
          {session?.user.username === slug && (
            <button className="border border-gray-500 px-4 py-2 rounded-full text-sm">
              Edit Profile
            </button>
          )}
        </div>
        <div className="px-3 lg:px-6 space-y-3 mb-5">
          <h1 className="text-lg font-semibold">{data.data.name}</h1>
          <p className="text-sm text-gray-600">@{data.data.username}</p>
          <p className="flex items-center gap-x-2 text-sm">
            <Calendar size={15} /> Joined at{" "}
            {moment(data.data.createdAt).format("ll")}
          </p>
        </div>
        <div className="w-full flex gap-x-5 items-center px-3 lg:px-6 mb-7">
          <div className="hover:underline text-sm">
            {data.data.following.length} Following
          </div>
          <div className="hover:underline text-sm">
            {data.data.followers.length} Followers
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
