import HomeNavigation from "@/components/home-navigation";
import PostCreateForm from "@/components/post-create-form";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <HomeNavigation />
      <PostCreateForm />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
