"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavButton = ({
  href,
  name,
  className,
}: {
  href: string;
  name: string;
  className?: string;
}) => {
  const path = usePathname();
  return (
    <Link
      href={href}
      className={cn(
        "flex justify-center items-center flex-col px-4 py-5 text-center hover:bg-black/10 backdrop-blur relative before:absolute before:w-[45px] before:rounded-full before:h-[5px] before:bg-blue-500 before:inline-block before:bottom-0 before:transition-transform before:duration-200",
        path === href ? "before:translate-y-0" : "before:translate-y-[7px]",
        className
      )}
    >
      {name}
    </Link>
  );
};

export default NavButton;
