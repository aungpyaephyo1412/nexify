'use server';
import { getAuthUser } from '@/app/(user)/_action';
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

export const likePost = async (postId: string) => {
  const session = await auth();
  const { data, error } = await safeFetch(DEFAULT_RETURN_SCHEMA, '/likes', {
    method: 'POST',
    body: JSON.stringify({ postId, userId: session?.user.id }),
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: generateBearerToken(session?.user.jwt),
    },
  });
  if (!error) {
    revalidateTag(`post-${postId}`);
    revalidatePath('/home');
  }
  return data;
};

export const unlikePost = async (likeId: string, postId: string) => {
  const session = await auth();
  const { data, error } = await safeFetch(DEFAULT_RETURN_SCHEMA, `/likes/${likeId}`, {
    method: 'DELETE',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: generateBearerToken(session?.user.jwt),
    },
  });
  if (!error) {
    revalidateTag(`post-${postId}`);
    revalidatePath('/home');
  }
  return data;
};
interface commentForm {
  postId: string;
  caption: string;
}
export const createComment = async (form: commentForm) => {
  const user = await getAuthUser();
  console.log(form.postId);
  const { data, error } = await safeFetch(DEFAULT_RETURN_SCHEMA, '/comments', {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: generateBearerToken(user.jwt),
    },
    body: JSON.stringify({
      userId: user.id,
      postId: form.postId,
      caption: form.caption,
    }),
  });
  if (error) return null;
  revalidatePath('/home');
  return data;
};
