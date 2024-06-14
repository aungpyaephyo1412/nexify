'use server';

import { signIn, unstable_update } from '@/auth';
import safeFetch from '@/lib/safeFetch';
import { action } from '@/lib/utils';
import { DEFAULT_RETURN_SCHEMA } from '@/types/default';
import {
  FORGOT_PASSWORD_SCHEMA,
  USER_EMAIL_VERIFY_SCHEMA,
  USER_LOGIN_SCHEMA,
  USER_PASSWORD_RESET_SCHEMA,
  USER_REGISTER_SCHEMA,
} from '@/types/user.types';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const register = action(USER_REGISTER_SCHEMA, async (parsedInput) => {
  const { error } = await safeFetch(DEFAULT_RETURN_SCHEMA, '/auth/register', {
    cache: 'no-store',
    method: 'POST',
    body: JSON.stringify(parsedInput),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  if (error) throw new Error('Something went wrong!');
  await signIn('credentials', parsedInput);
});

export const login = action(USER_LOGIN_SCHEMA, async (parsedInput) => {
  try {
    await signIn('credentials', parsedInput);
  } catch (error) {
    throw error;
  }
});

export const verify = action(USER_EMAIL_VERIFY_SCHEMA, async (parsedInput) => {
  const { error } = await safeFetch(DEFAULT_RETURN_SCHEMA, '/auth/verify', {
    cache: 'no-store',
    method: 'POST',
    body: JSON.stringify(parsedInput),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  if (error) throw new Error('Something went wrong!');
  await unstable_update({
    user: {
      isVerified: true,
    },
  });
  redirect('/home');
});

export const forgotPassword = action(FORGOT_PASSWORD_SCHEMA, async (parsedInput) => {
  const { error } = await safeFetch(DEFAULT_RETURN_SCHEMA, '/auth/forgot-password', {
    cache: 'no-store',
    method: 'POST',
    body: JSON.stringify(parsedInput),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  if (error) throw new Error('Something went wrong!');
  cookies().set('forgot-mail', parsedInput.email);
  redirect('/forgot-password?message=Check your email');
});

export const resetPassword = action(USER_PASSWORD_RESET_SCHEMA, async (parsedInput) => {
  const cookie = cookies().get('forgot-mail');
  if (!cookie?.value) {
    return null;
  }
  const email = cookie.value;
  console.log(email);
  const { code: token, password: newPassword } = parsedInput;
  const { error } = await safeFetch(DEFAULT_RETURN_SCHEMA, '/auth/reset-password', {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ token, newPassword, email: email }),
  });
  if (error) throw new Error(error);
  cookies().delete('forgot-mail');
  redirect('/login?message=Your password has changed successfully');
});
