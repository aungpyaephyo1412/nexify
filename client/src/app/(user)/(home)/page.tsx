"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Bookmark,
  Ellipsis,
  Heart,
  MessageSquareMore,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  return (
    <div className="space-y-5">
      {Array.from({ length: 50 }).map((_, index) => (
        <div key={index} className="h-auto  text-black py-5 rounded-md flex gap-3">
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
            <div className="w-full flex justify-between items-center mb-3">
              <div className="space-y-1">
                <Link href={"/profile/hello"} className="font-semibold text-lg hover:underline leading-none">
                  Typle
                </Link>
                <div className="flex gap-1 font-mono">
                  <h1 className="text-xs">. 10hr</h1>
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="text-black">
                    <Ellipsis />
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Share link</DialogTitle>
                    <DialogDescription>
                      Anyone who has this link will be able to view this.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex items-center space-x-2">Hello Dialog</div>
                </DialogContent>
              </Dialog>
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
                  <button
                    className="cursor-pointer p-2 rounded-full hover:bg-blue-300/50 flex justify-center items-center">
                    <Heart size={18} />
                  </button>
                  <span>1</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    className="cursor-pointer p-2 rounded-full hover:bg-blue-300/50 flex justify-center items-center">
                    <MessageSquareMore size={18}/>
                  </button>
                  <span>1</span>
                </div>
              </div>
              <button
                className="cursor-pointer p-2 rounded-full hover:bg-blue-300/50 flex justify-center items-center">
                <Bookmark />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Page;
