import BackNavigation from "@/components/back-navigation";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <BackNavigation title={"Home"} />
      {children}
    </div>
  );
};

export default Layout;
