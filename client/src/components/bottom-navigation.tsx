"use client";
import { logout } from "@/app/(auth)/_action";
import { Button } from "@/components/ui/button";
import { Home, LogOut, Search, Settings, UserRound } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const BottomNavigation = () => {
  const session = useSession({ required: true });
  return (
    <div className="fixed bottom-0 bg-white inset-x-0 block lg:hidden">
      <hr />
      <div className="py-3 px-3 flex w-full justify-between items-center">
        <Button
          asChild
          variant={"ghost"}
          size={"icon"}
          className="hover:bg-transparent hover:text-slate-600"
        >
          <Link href={"/"}>
            <Home />
          </Link>
        </Button>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="hover:bg-transparent hover:text-slate-600"
        >
          <Search />
        </Button>
        <Button
          asChild
          variant={"ghost"}
          size={"icon"}
          className="hover:bg-transparent hover:text-slate-600"
        >
          <Link href={`/${session!.data?.user?.username}`}>
            <UserRound />
          </Link>
        </Button>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="hover:bg-transparent hover:text-slate-600"
        >
          <Settings />
        </Button>
        <Button
          onClick={async () => await logout()}
          variant={"ghost"}
          size={"icon"}
          className="hover:bg-transparent hover:text-slate-600"
        >
          <LogOut />
        </Button>
      </div>
    </div>
  );
};

export default BottomNavigation;
