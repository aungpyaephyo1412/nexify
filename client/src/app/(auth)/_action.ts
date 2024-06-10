"use server";

import { signIn, signOut, unstable_update } from "@/auth";
interface LoginSchema {
  identifier: string;
  password: string;
}
export const login = async (formData: LoginSchema) => {
  await signIn("credentials", { ...formData });
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
