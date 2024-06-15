'use client';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';

const HomeBottomNav = () => {
  return (
    <TabsList className="bg-gray-300/50 h-fit w-full  grid grid-cols-2 rounded-none px-3 lg:px-6 mb-5 sticky top-0 py-2 z-50 backdrop-blur">
      <TabsTrigger value="foryou" className="px-4 py-2 text-gray-950 w-full">
        For you
      </TabsTrigger>
      <TabsTrigger value="following" className="px-4 py-2 text-gray-950 w-full">
        Following
      </TabsTrigger>
    </TabsList>
  );
};

export default HomeBottomNav;
