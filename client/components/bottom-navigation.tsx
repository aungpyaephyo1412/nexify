'use client';
import DialogDrawer from '@/components/dialog-drawer';
import PostCreateForm from '@/components/form/post-create-form';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn, concatString } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const BottomNavigation = () => {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const { data } = useSession({ required: true });
  const profileLink = concatString(['/', data?.user.username]);
  return (
    <footer className="fixed inset-x-0 bottom-0 bg-transparent">
      <nav className="w-full h-16 max-w-[580px]  mx-auto bg-white border border-gray-400 border-x-0">
        <div className="grid h-full max-w-[580px] grid-cols-5 mx-auto">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={'/'}
                className="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 group"
              >
                <svg
                  className={cn(
                    'size-5 text-gray-800 group-hover:text-blue-600',
                    path === '/home' && 'text-blue-600',
                  )}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Home</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={'/'}
                className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group"
              >
                <svg
                  className={cn(
                    'size-5 text-gray-800 group-hover:text-blue-600',
                    path === '/bookmark' && 'text-blue-600',
                  )}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 14 20"
                >
                  <path d="M13 20a1 1 0 0 1-.64-.231L7 15.3l-5.36 4.469A1 1 0 0 1 0 19V2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v17a1 1 0 0 1-1 1Z" />
                </svg>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Bookmark</p>
            </TooltipContent>
          </Tooltip>
          <div onClick={() => setOpen((p) => !p)} className="flex items-center justify-center">
            <button className="inline-flex items-center justify-center w-10 h-10 font-medium bg-green-500 rounded-full group focus:ring-4 focus:ring-blue-300 focus:outline-none">
              <svg
                className={cn('size-5 text-white')}
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
            </button>
          </div>
          <DialogDrawer open={open} setOpen={setOpen}>
            <PostCreateForm fullImage sideImage={false} />
          </DialogDrawer>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group">
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
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Search</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={profileLink}
                className="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-gray-50 group"
              >
                <svg
                  className={cn(
                    'size-5 text-gray-800 group-hover:text-blue-600',
                    path === profileLink && 'text-blue-600',
                  )}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Profile</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </nav>
    </footer>
  );
};

export default BottomNavigation;
