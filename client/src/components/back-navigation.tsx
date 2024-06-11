import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const BackNavigation = ({ title, href }: { title: string; href?: string }) => {
  return (
    <div className="sticky top-0  z-50 py-4 bg-neutral-300/20 backdrop-blur px-3 lg:px-6">
      <div className="flex gap-5 items-center">
        <Link
          scroll={false}
          href={href || "/home"}
          className="p-2 rounded-full backdrop-blur hover:bg-black/10 inline-flex"
        >
          <ArrowLeft size={18} />
        </Link>
        <div className="flex-1">
          <h1>{title}</h1>
        </div>
      </div>
    </div>
  );
};

export default BackNavigation;
