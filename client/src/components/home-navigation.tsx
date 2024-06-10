"use client";
import NavButton from "@/components/nav-button";
import { usePathname } from "next/navigation";

const HomeNavigation = () => {
  const path = usePathname();
  return (
    <div className="grid grid-cols-2 border-b border-b-gray-400 mb-7 overflow-y-hidden">
      <NavButton href={"/home"} name={"For you"} />
      <NavButton href={"/home/following"} name={"Following"} />
    </div>
  );
};

export default HomeNavigation;
