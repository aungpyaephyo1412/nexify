'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export const redirectTo = async (path: string) => redirect(path);

export const revalidateT = async (key: string) => revalidateTag(key);

export const revalidateP = async (path: string) => revalidatePath(path);
