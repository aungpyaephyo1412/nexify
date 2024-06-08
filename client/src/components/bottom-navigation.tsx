import { Button } from "@/components/ui/button";
import { PersonIcon } from "@radix-ui/react-icons";
import { Home, Plus, Search, Settings } from "lucide-react";
import Link from "next/link";

const BottomNavigation = () => {
  return (
    <div className="fixed bottom-0 bg-black inset-x-0 block lg:hidden">
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
          variant={"ghost"}
          size={"icon"}
          className="hover:bg-transparent hover:text-slate-600"
        >
          <Plus />
        </Button>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="hover:bg-transparent hover:text-slate-600"
        >
          <Settings />
        </Button>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="hover:bg-transparent hover:text-slate-600"
        >
          <PersonIcon />
        </Button>
      </div>
    </div>
  );
};

export default BottomNavigation;
