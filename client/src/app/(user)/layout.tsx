import SideNavigation from "@/components/side-navigation";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex bg-slate-200">
      <SideNavigation />
      <section className="flex-1 px-6 py-5 h-screen overflow-y-auto">
        <div className="max-w-screen-sm">{children}</div>
      </section>
    </main>
  );
};

export default Layout;
