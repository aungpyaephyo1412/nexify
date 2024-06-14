import Image from 'next/image';
import { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="w-full grid lg:grid-cols-2 ">
      <div className="hidden lg:block sticky top-0 h-screen bg-cover bg-center py-6 screen-padding bg-auth bg-no-repeat">
        {' '}
      </div>
      <div className="min-h-dvh overflow-y-auto py-6 screen-padding">
        <div className="mb-9">
          <h1 className="font-semibold font-mono text-lg mb-6">Welcome from Nexify</h1>
          <div className="relative h-[200px]">
            <Image src={'/auth-1.png'} alt={'auth'} fill priority className="object-contain" />
          </div>
        </div>
        {children}
      </div>
    </section>
  );
};

export default AuthLayout;
