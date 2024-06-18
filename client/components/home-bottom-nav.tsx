'use client';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { scrollToTop } from '@/lib/utils';

const HomeBottomNav = () => {
  return (
    <TabsList className="max-w-[580px] bg-gray-300/50 h-fit w-full  grid grid-cols-2 rounded-none px-3 lg:px-6 backdrop-blur">
      <TabsTrigger onClick={scrollToTop} value="foryou" className="px-4 py-2 text-gray-950 w-full">
        For you
      </TabsTrigger>
      <TabsTrigger
        onClick={scrollToTop}
        value="following"
        className="px-4 py-2 text-gray-950 w-full"
      >
        Following
      </TabsTrigger>
    </TabsList>
  );
};

export default HomeBottomNav;
