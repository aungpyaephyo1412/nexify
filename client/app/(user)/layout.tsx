import { auth } from '@/auth';
import BottomNavigation from '@/components/bottom-navigation';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (!session?.user.isVerified) {
    redirect('/verify');
  }
  return (
    <>
      <main className="max-w-screen-xl mx-auto flex w-full">
        <aside className="hidden lg:block w-[300px] h-screen sticky top-0 border-e border-e-gray-500"></aside>
        <section className="flex flex-1 flex-col min-h-dvh pb-[65px]">
          {children}
          <BottomNavigation />
        </section>
        <aside className="hidden lg:block w-[300px] h-screen sticky top-0 border-s border-s-gray-500"></aside>
      </main>
    </>
  );
};

export default Layout;
