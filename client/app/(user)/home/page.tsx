import ForYou from '@/components/for-you';
import { TabsContent } from '@/components/ui/tabs';

const Page = () => {
  return (
    <div className="w-full flex-1 ">
      <TabsContent value={'foryou'} className="pb-[35px] space-y-2">
        <ForYou />
      </TabsContent>
      <TabsContent value={'following'} className="pb-[35px] space-y-2">
        following
      </TabsContent>
    </div>
  );
};

export default Page;
