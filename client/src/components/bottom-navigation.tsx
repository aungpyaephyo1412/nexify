"use client";
import PostCreateForm from "@/components/post-create-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Home, Plus, Search, Settings, UserRound } from "lucide-react";
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
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant={"ghost"}
              size={"icon"}
              className="hover:bg-transparent hover:text-slate-600"
            >
              <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <PostCreateForm />
          </DialogContent>
        </Dialog>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="hover:bg-transparent hover:text-slate-600"
        >
          <Settings />
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
      </div>
    </div>
  );
};

export default BottomNavigation;
