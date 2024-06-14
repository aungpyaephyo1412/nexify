'use server';

import { auth } from '@/auth';
import { AUTH_USER } from '@/types/user.types';

export const getAuthUser = async (): Promise<AUTH_USER> => {
  const session = await auth();
  return session!.user;
};
