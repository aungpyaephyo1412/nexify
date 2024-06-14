import HomeBottomNav from '@/components/home-bottom-nav';
import { Tabs, TabsList } from '@/components/ui/tabs';
import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Tabs defaultValue="foryou" className="w-full flex-1 flex screen-padding">
      <TabsList className="w-full flex-1 h-full p-0 flex flex-col bg-transparent">
        {children}
      </TabsList>
      <div className="screen-padding fixed z-50 inset-x-0 flex justify-center items-center bottom-[78px]">
        <HomeBottomNav />
      </div>
    </Tabs>
  );
};

export default Layout;
