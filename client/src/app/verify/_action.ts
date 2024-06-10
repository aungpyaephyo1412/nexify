"use server";
import { redirect } from "next/navigation";

export declare enum RedirectType {
  push = "push",
  replace = "replace",
}
export const redirectTo = async (url: string, type?: RedirectType) => {
  redirect(url, type);
};
