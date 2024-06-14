import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const HeaderNav = ({
  title,
  href,
  description,
}: {
  title: string;
  href?: string;
  description?: string;
}) => {
  return (
    <div className="sticky top-0  z-50 py-4 bg-neutral-300/20 backdrop-blur px-3 lg:px-6">
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
    </div>
  );
};

export default HeaderNav;
