import NavButton from "@/components/nav-button";
import safeFetch from "@/lib/safeFetch";
import { UserByIdDataSchema } from "@/types/user.types";
import { ArrowLeft, Calendar } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { ReactNode } from "react";

const Layout = async ({
  children,
  params: { slug },
}: {
  children: ReactNode;
  params: { slug: string };
}) => {
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
  return (
    <div className="w-full h-full">
      <div className="py-4 bg-neutral-300/20 backdrop-blur px-3 lg:px-6">
        <div className="flex gap-5 items-center">
          <Link
            href={"/home"}
            className="p-2 rounded-full backdrop-blur hover:bg-black/10 inline-flex"
          >
            <ArrowLeft size={18} />
          </Link>
          <div className="flex-1">
            <h1>{data.data.name}</h1>
          </div>
        </div>
      </div>
      <div>
        <div className="h-[250px] w-full bg-neutral-400"></div>
        <div className="w-full flex justify-between items-center px-3 lg:px-6 mb-7">
          <div className="size-[100px] lg:size-[150px] rounded-full bg-black -mt-[70px] "></div>
          <button className="border border-gray-500 px-4 py-2 rounded-full text-sm">
            Edit Profile
          </button>
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
