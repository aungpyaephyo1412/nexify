'use server';
import { auth } from '@/auth';
import safeFetch from '@/lib/safeFetch';
import { generateBearerToken } from '@/lib/utils';
import { DEFAULT_RETURN_SCHEMA } from '@/types/default';
import { revalidatePath, revalidateTag } from 'next/cache';

export const createPost = async (formData: {}) => {
  const session = await auth();
  const { data, error } = await safeFetch(DEFAULT_RETURN_SCHEMA, '/posts', {
    method: 'POST',
    body: JSON.stringify({ ...formData, userId: session!.user.id }),
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: generateBearerToken(session!.user.jwt),
    },
  });
  if (error) return null;
  revalidateTag('home-posts');
  revalidatePath('/home');
  return data;
};
