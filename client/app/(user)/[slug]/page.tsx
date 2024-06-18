'use client';
import { TabsContent } from '@/components/ui/tabs';
import UserPosts from '@/components/user-posts';
import { useParams } from 'next/navigation';

const Page = () => {
  const { slug } = useParams();
  return (
    <div className="">
      <div className="w-full flex-1 ">
        <TabsContent value={'posts'} className="pb-[35px] space-y-5">
          <UserPosts userId={slug as string} />
        </TabsContent>
      </div>
    </div>
  );
};

export default Page;
