import AuthLayout from '@/app/(auth)/layout';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (session?.user.isVerified) {
    redirect('/home');
  }
  return <AuthLayout>{children}</AuthLayout>;
};

export default Layout;
