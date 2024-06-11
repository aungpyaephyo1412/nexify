import PostCreateForm from "@/components/form/post-create-form";
import HomeNavigation from "@/components/home-navigation";
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
