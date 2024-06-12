"use server";

import safeFetch from "@/lib/safeFetch";
import { RegisterReturnSchema } from "@/types/user.types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signIn, signOut, unstable_update } from "../../../auth";
interface LoginSchema {
  email: string;
  password: string;
}
export const login = async (formData: LoginSchema) => {
  await signIn("credentials", { ...formData });
  redirect("/home");
};

interface logoutParams {
  redirectTo?: string;
}
export const logout = async (obj?: logoutParams) => {
  await signOut({ ...obj });
};
interface authUpdate {
  isVerified: boolean;
}
export const auth_update = async (formData: authUpdate) => {
  await unstable_update({
    user: {
      isVerified: formData.isVerified,
    },
  });
};

export const resetPassword = async (formData: {}) => {
  const cookie = cookies().get("forgot-mail");
  if (!cookie?.value) {
    return null;
  }
  const email = JSON.parse(cookie?.value as string) as object;
  const { error } = await safeFetch(
    RegisterReturnSchema,
    "/auth/reset-password",
    {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ ...formData, ...email }),
    }
  );
  if (error) throw new Error(error);
  cookies().delete("forgot-mail");
  redirect("/login?message=Your password reset successfully!");
};

export const setCookie = async (key: any, value: any) => {
  cookies().set(key, value, { secure: true });
};
