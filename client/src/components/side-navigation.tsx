"use client";
import Logo from "@/components/logo";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import sideNavigationData from "@/configs/side-navigation-data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideNavigation = () => {
  const path = usePathname();
  return (
    <section className="sticky top-0 h-screen border-e border-e-gray-500/50 hidden lg:block">
      <Link href={"/"} className="flex gap-2 items-center p-6">
        <Logo />
      </Link>
      <ScrollArea className="w-[320px] h-[calc(100vh-100px)] px-3">
        <div className="py-2 space-y-3">
          {sideNavigationData.map((tag) => (
            <Link
              href={tag.href}
              className={cn(
                "flex gap-3 items-center hover:bg-black/10 py-3 px-5 rounded",
                path === tag.href && "text-blue-500 font-semibold"
              )}
              key={tag.href}
            >
              <tag.icon />
              <span className="capitalize">{tag.title}</span>
            </Link>
          ))}
        </div>
        <ScrollBar orientation={"vertical"} />
      </ScrollArea>
    </section>
  );
};

export default SideNavigation;
