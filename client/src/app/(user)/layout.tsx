import BottomNavigation from "@/components/bottom-navigation";
import Provider from "@/components/provider";
import RightNavigation from "@/components/right-navigation";
import SideNavigation from "@/components/side-navigation";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Provider>
      <main className="flex bg-black text-white">
        <SideNavigation />
        <div className="w-full lg:w-auto flex-1">
          <div className="max-w-screen-sm mx-auto lg:mx-0  px-3 md:px-6 py-5 min-h-screen">
            {children}
            <BottomNavigation />
          </div>
        </div>
        <RightNavigation />
      </main>
    </Provider>
  );
};

export default Layout;
