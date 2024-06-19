import { getAuthUser } from '@/app/(user)/_action';
import SignOut from '@/components/sign-out';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const HeaderNav = async ({
  title,
  href,
  description,
  currentUserId,
}: {
  title: string;
  href?: string;
  description?: string;
  currentUserId?: string;
}) => {
  const user = await getAuthUser();
  return (
    <div className="sticky top-0  z-50 py-4 bg-neutral-300/20 backdrop-blur px-3 lg:px-6 flex justify-between items-center">
      <div className="flex gap-5 items-center">
        <Link
          href={href || '/home'}
          className="p-2 rounded-full backdrop-blur hover:bg-black/10 inline-flex"
        >
          <ArrowLeft size={18} />
        </Link>
        <div className="flex-1">
          <h1 className="font-semibold mb-1">{title}</h1>
          <p className="text-xs text-gray-500 font-mono">{description}</p>
        </div>
      </div>
      {user.id === currentUserId && <SignOut />}
    </div>
  );
};

export default HeaderNav;
