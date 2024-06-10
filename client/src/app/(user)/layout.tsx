import { auth } from "@/auth";
import BottomNavigation from "@/components/bottom-navigation";
import RightNavigation from "@/components/right-navigation";
import SideNavigation from "@/components/side-navigation";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (!session?.user.isVerified) {
    redirect("/verify");
  }
  return (
    <main className="grid lg:grid-cols-8 max-w-screen-xl mx-auto">
      <SideNavigation />
      <div className="w-full lg:w-auto col-span-4">
        <div className="min-h-screen pb-24 ">
          {children}
          <BottomNavigation />
        </div>
      </div>
      <RightNavigation />
    </main>
  );
};

export default Layout;
