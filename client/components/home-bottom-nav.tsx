'use client';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';

const HomeBottomNav = () => {
  return (
    <TabsList className="bg-gray-300 h-fit min-w-[200px] w-full md:w-auto  lg:min-w-[400px] gri grid-cols-2 rounded-none md:rounded-full">
      <TabsTrigger value="foryou" className="px-4 py-1 rounded-full text-gray-950 w-full">
        For you
      </TabsTrigger>
      <TabsTrigger value="following" className="px-4 py-1 rounded-full text-gray-950 w-full">
        Following
      </TabsTrigger>
    </TabsList>
  );
};

export default HomeBottomNav;
