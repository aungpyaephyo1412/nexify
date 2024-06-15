'use server';

import { getAuthUser } from '@/app/(user)/_action';
import { signOut } from '@/auth';
import safeFetch from '@/lib/safeFetch';
import { action, concatString, generateBearerToken } from '@/lib/utils';
import { DEFAULT_RETURN_SCHEMA } from '@/types/default';
import { USER_FOLLOW_SCHEMA, USER_UNFOLLOW_SCHEMA } from '@/types/user.types';
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export const follow = action(USER_FOLLOW_SCHEMA, async (parsedInput) => {
  const user = await getAuthUser();
  const { data, error } = await safeFetch(DEFAULT_RETURN_SCHEMA, '/followings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: generateBearerToken(user.jwt),
    },
    cache: 'no-store',
    body: JSON.stringify({
      followingId: parsedInput.followingId,
      followerId: user.id,
    }),
  });
  if (error) throw new Error(error);
  revalidateTag(concatString(['profile', parsedInput.slug], '-'));
  revalidateTag(concatString(['profile', user.username], '-'));
  revalidatePath(concatString(['profile', user.username], '-'));
  revalidatePath(concatString(['profile', parsedInput.slug], '-'));
  return data;
});

export const unfollow = action(USER_UNFOLLOW_SCHEMA, async (parsedInput) => {
  const user = await getAuthUser();
  const { data, error } = await safeFetch(
    DEFAULT_RETURN_SCHEMA,
    `/followings/${parsedInput.unfollowId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: generateBearerToken(user.jwt),
      },
      cache: 'no-store',
    },
  );
  if (error) throw new Error(error);
  revalidateTag(concatString(['profile', parsedInput.slug], '-'));
  revalidateTag(concatString(['profile', user.username], '-'));
  revalidatePath(concatString(['profile', parsedInput.slug], '-'));
  revalidatePath(concatString(['profile', user.username], '-'));
  return data;
});

export const logout = async () => {
  await signOut();
  redirect('/login');
};
