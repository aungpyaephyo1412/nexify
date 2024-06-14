import safeFetch from '@/lib/safeFetch';
import { DEFAULT_RETURN_SCHEMA } from '@/types/default';
import { ReactNode } from 'react';

const Layout = async ({
  params: { slug },
  children,
}: {
  params: { slug: string };
  children: ReactNode;
}) => {
  const { error } = await safeFetch(DEFAULT_RETURN_SCHEMA, `/auth/verify/${slug}`, {
    cache: 'no-store',
  });
  if (error) throw new Error(error);
  return <>{children}</>;
};

export default Layout;
