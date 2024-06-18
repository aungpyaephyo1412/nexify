import PostCreateForm from '@/components/form/post-create-form';
import HomeBottomNav from '@/components/home-bottom-nav';
import QueryProvider from '@/components/query-provider';
import { Tabs, TabsList } from '@/components/ui/tabs';
import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="w-full flex flex-col flex-1 bg-gray-100">
      <Tabs orientation="vertical" defaultValue="foryou" className="w-full flex-1 flex flex-col">
        <PostCreateForm />
        <TabsList className="w-full flex-1 h-full p-0 flex flex-col bg-transparent  px-3 lg:px-8">
          <QueryProvider>{children}</QueryProvider>
        </TabsList>
        <div className="fixed bottom-[65px] inset-x-0 flex justify-center items-center">
          <HomeBottomNav />
        </div>
      </Tabs>
    </section>
  );
};

export default Layout;
