import { AuthUser } from "@/types/auth.types";
import "next-auth";

declare module "next-auth" {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    id: string;
    username: string;
    name: string;
    email: string;
    isVerified: boolean;
    isAdmin: boolean;
    isBlocked: boolean;
    createdAt: string;
    jwt: string;
  }
  /**
   * Returned by `useSession`, `auth`, contains information about the active session.
   */
  interface Session {
    user: AuthUser;
  }
}

// The `JWT` interface can be found in the `next-auth/jwt` submodule

declare module "@auth/core/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    id: string;
    username: string;
    name: string;
    email: string;
    isVerified: boolean;
    isAdmin: boolean;
    isBlocked: boolean;
    createdAt: string;
    jwt: string;
  }
}
