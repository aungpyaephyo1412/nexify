import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fullImagePath = (path: string) =>
  `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${path}`;
