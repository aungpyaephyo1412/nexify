"use client";
import { cn } from "@/lib/utils";
import { LayoutGroup, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const BottomNavigation = () => {
  const session = useSession({ required: true });
  const path = usePathname();
  return (
    <LayoutGroup>
      <div className="block lg:hidden fixed bottom-0 z-50 w-full  bg-white border-t border-gray-300 inset-x-0">
        <div className="w-full">
          <div
            className="grid max-w-xs grid-cols-2 gap-1 p-1 mx-auto my-2 bg-gray-200 rounded-lg dark:bg-gray-600"
            role="group"
          >
            <Link
              href={"/home"}
              className={cn(
                "relative flex text-center w-full font-semibold align-middle transition-all bg-transparent",
                path === "/home" && "text-white"
              )}
            >
              <span className="w-full bg-transparent text-center  px-4 relative z-[5] py-1 text-sm capitalize">
                For you
              </span>
              {path === "/home" && (
                <motion.div
                  className="absolute inset-0  rounded-full  bg-gray-900 "
                  layoutId="sidebar"
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 30,
                  }}
                />
              )}
            </Link>
            <Link
              href={"/home/following"}
              type="button"
              className={cn(
                "relative flex text-center w-full font-semibold align-middle transition-all bg-transparent",
                path === "/home/following" && "text-white"
              )}
            >
              <span className=" w-full bg-transparent text-center  px-4 relative z-[5] py-1 text-sm capitalize">
                Following
              </span>
              {path === "/home/following" && (
                <motion.div
                  className="absolute inset-0 rounded-full  bg-gray-900 "
                  layoutId="sidebar"
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 30,
                  }}
                />
              )}
            </Link>
          </div>
        </div>
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
          <Link
            href={"/home"}
            className="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <svg
              className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
            <span className="sr-only">Home</span>
          </Link>
          <button className="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <svg
              className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
          <button className="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <svg
              className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
            <span className="sr-only">New post</span>
          </button>
          <button className="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <svg
              className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 14 20"
            >
              <path d="M13 20a1 1 0 0 1-.64-.231L7 15.3l-5.36 4.469A1 1 0 0 1 0 19V2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v17a1 1 0 0 1-1 1Z" />
            </svg>
            <span className="sr-only">Bookmark</span>
          </button>
          <Link
            href={`/${session.data?.user?.username}`}
            className="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <svg
              className={cn(
                "w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500",
                path === `/${session.data?.user?.username}` && "text-blue-500"
              )}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
          </Link>
        </div>
      </div>
    </LayoutGroup>
  );
};

export default BottomNavigation;
