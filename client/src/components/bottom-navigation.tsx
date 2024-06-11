"use client";
import { logout } from "@/app/(auth)/_action";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Ellipsis,
  GalleryVertical,
  Home,
  Search,
  UserRound,
} from "lucide-react";
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
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant={"ghost"}
              size={"icon"}
              className="hover:bg-transparent hover:text-slate-600"
            >
              <GalleryVertical />
            </Button>
          </SheetTrigger>
          <SheetContent className="h-dvh overflow-y-auto flex justify-center items-center flex-col">
            <SheetHeader>
              <SheetClose asChild>
                <Link
                  href={`/${session?.data?.user.username}`}
                  className="w-full flex justify-between items-center gap-5 mt-5"
                >
                  <div className="flex-1 w-full flex gap-2 items-center">
                    <Avatar className="size-[50px] rounded-full bg-white">
                      <AvatarFallback>
                        {session?.data?.user?.name?.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 fspace-y-1 w-fit">
                      <h1 className="text-sm text-start">
                        {session?.data?.user.name}
                      </h1>
                      <p className="text-xs max-w-full">
                        @{session?.data?.user.username}
                      </p>
                    </div>
                  </div>
                  <Ellipsis />
                </Link>
              </SheetClose>
            </SheetHeader>
            <div></div>
            <div className="mt-auto w-full">
              <SheetFooter className="mt-auto w-full">
                <Button
                  variant="destructive"
                  onClick={async () => await logout()}
                >
                  Log out
                </Button>
              </SheetFooter>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default BottomNavigation;
