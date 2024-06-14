import PostCreateForm from '@/components/form/post-create-form';
import HomeBottomNav from '@/components/home-bottom-nav';
import QueryProvider from '@/components/query-provider';
import { Tabs, TabsList } from '@/components/ui/tabs';
import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="w-full flex flex-col flex-1 pt-5 bg-gray-100">
      <PostCreateForm />
      <Tabs defaultValue="foryou" className="w-full flex-1 flex flex-col px-2 lg:px-4">
        <TabsList className="w-full flex-1 h-full p-0 flex flex-col bg-transparent">
          <QueryProvider>{children}</QueryProvider>
        </TabsList>
        <div className="fixed bottom-[63px] inset-x-0 flex justify-center items-center">
          <HomeBottomNav />
        </div>
      </Tabs>
    </section>
  );
};

export default Layout;
