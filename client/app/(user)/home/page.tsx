import { TabsContent } from '@/components/ui/tabs';

const Page = () => {
  return (
    <div className="w-full flex-1 ">
      <TabsContent value={'foryou'}>for you</TabsContent>
      <TabsContent value={'following'}>following</TabsContent>
    </div>
  );
};

export default Page;
