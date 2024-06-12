import LogOut from "@/components/log-out";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Ellipsis } from "lucide-react";
import Link from "next/link";
import { auth } from "../../auth";

const RightNavigation = async () => {
  const session = await auth();
  return (
    <div className="col-span-2 h-screen  border-s border-s-gray-500/50 max-w-[300px] flex-col sticky top-0 p-6 hidden lg:flex ">
      <Link
        href={`/${session?.user.username}`}
        className="w-full flex justify-between items-center gap-5"
      >
        <div className="flex-1 w-full flex gap-2 items-center">
          <Avatar className="size-[50px] rounded-full bg-white">
            <AvatarFallback>
              {session?.user?.name?.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 fspace-y-1 w-fit">
            <h1 className="text-sm text-start">{session?.user.name}</h1>
            <p className="text-xs max-w-full">@{session?.user.username}</p>
          </div>
        </div>
        <Ellipsis />
      </Link>
      <div className="mt-auto w-full">
        <LogOut />
      </div>
    </div>
  );
};

export default RightNavigation;
