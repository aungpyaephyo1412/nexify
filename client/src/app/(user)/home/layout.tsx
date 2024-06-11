import PostCreateForm from "@/components/form/post-create-form";
import HomeNavigation from "@/components/home-navigation";
import QueryProvider from "@/components/query-provider";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex-1 w-full">
      <HomeNavigation />
      <PostCreateForm />
      <QueryProvider>
        <div>{children}</div>
      </QueryProvider>
    </div>
  );
};

export default Layout;
