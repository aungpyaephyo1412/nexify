import { Ellipsis } from "lucide-react";
import Link from "next/link";

const RightNavigation = () => {
  return (
    <div className="border-s border-s-gray-500/50 w-[320px] h-screen sticky top-0 p-6 hidden lg:block ">
      <Link
        href={"/profile"}
        className="w-full flex justify-between items-center"
      >
        <div className="flex gap-2 items-center">
          <div className="size-[50px] rounded-full bg-white"></div>
          <div className="space-y-1">
            <h1 className="text-sm text-start">Typle</h1>
            <p className="text-xs">@typle_x</p>
          </div>
        </div>
        <Ellipsis />
      </Link>
    </div>
  );
};

export default RightNavigation;
