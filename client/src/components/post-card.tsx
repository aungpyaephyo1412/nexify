import PostDialog from "@/components/post-dialog";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Bookmark, Heart, MessageSquareMore, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const PostCard = () => {
  return (
    <div className="h-auto py-5 rounded-md flex gap-3">
      <div className="flex justify-between items-start">
        <div className="flex gap-2">
          <div className="size-[45px] bg-black rounded relative overflow-hidden">
            <Image
              src={"/hello.jpeg"}
              alt={"image"}
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="w-full flex justify-between items-start mb-3">
          <div className="space-y-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={"/profile/hello"}
                  className="font-semibold text-lg hover:underline leading-none"
                >
                  Typle
                </Link>
              </TooltipTrigger>
              <TooltipContent
                align={"start"}
                side={"bottom"}
                sideOffset={5}
                className="bg-black shadow-md shadow-white"
              >
                <div className="lg:min-w-96 py-4">
                  <div className="flex items-center gap-5 mb-5">
                    <div className="size-[45px] rounded-full bg-white"></div>
                    <h1 className="font-semibold text-lg">Typle</h1>
                  </div>
                  <div className="grid grid-cols-3 gap-5 mb-3">
                    <div className="flex flex-col justify-center items-center gap-y-1">
                      <h1 className="font-semibold">123</h1>
                      <p>posts</p>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-y-1">
                      <h1 className="font-semibold">123</h1>
                      <p>followers</p>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-y-1">
                      <h1 className="font-semibold">123</h1>
                      <p>following</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    <div className="h-[100px] bg-white rounded"></div>
                    <div className="h-[100px] bg-white rounded"></div>
                    <div className="h-[100px] bg-white rounded"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant={"secondary"}>
                      Message
                      <Send size={15} className="ml-2" />
                    </Button>
                    <Button>Following</Button>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
            <div className="flex gap-1 font-mono">
              <h1 className="text-xs">. 10hr</h1>
            </div>
          </div>
          <PostDialog />
        </div>
        <Link href={"/posts/hello"}>
          <p className="text-sm mb-5 ">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
            asperiores, aut exercitationem expedita fuga, harum in incidunt ipsa
            magni, natus odit pariatur quasi qui quisquam rerum sed sequi vitae
            voluptate.
          </p>
          <div className="h-[280px] bg-slate-300 mb-5 relative overflow-hidden rounded">
            <Image
              src={"/hello.jpeg"}
              alt={"image"}
              fill
              priority
              className="object-cover"
            />
          </div>
        </Link>
        <div className="flex w-full justify-between items-center">
          <div className="flex gap-5 items-center ">
            <div className="flex items-center gap-1">
              <button className="cursor-pointer p-2 rounded-full hover:bg-blue-300/50 flex justify-center items-center">
                <Heart size={18} />
              </button>
              <span>1</span>
            </div>
            <div className="flex items-center gap-1">
              <button className="cursor-pointer p-2 rounded-full hover:bg-blue-300/50 flex justify-center items-center">
                <MessageSquareMore size={18} />
              </button>
              <span>1</span>
            </div>
          </div>
          <button className="cursor-pointer p-2 rounded-full hover:bg-blue-300/50 flex justify-center items-center">
            <Bookmark />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
