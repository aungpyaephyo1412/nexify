import { clsx, type ClassValue } from 'clsx';
import { createSafeActionClient } from 'next-safe-action';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const action = createSafeActionClient();

export const concatString = (strings: string[], operator: string = ''): string => {
  return strings.join(operator);
};

export const generateBearerToken = (token: string): string => concatString(['Bearer', token], ' ');

export const fullImagePath = (path: string) =>
  concatString([process.env.NEXT_PUBLIC_IMAGE_BASE_URL as string, path]);

const isBrowser = () => typeof window !== 'undefined'; //The approach recommended by Next.js

export function scrollToTop() {
  if (!isBrowser()) return;
  window.scrollTo({ top: 0, behavior: 'instant' });
}
