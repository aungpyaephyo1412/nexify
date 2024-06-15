import { TabsContent } from '@/components/ui/tabs';

const Page = () => {
  return (
    <div className="">
      <div className="w-full flex-1 ">
        <TabsContent value={'posts'} className="pb-[35px] space-y-5">
          Posts
        </TabsContent>
      </div>
    </div>
  );
};

export default Page;
