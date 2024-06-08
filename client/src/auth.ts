import { authConfig } from "@/configs/auth.config";
import safeFetch from "@/lib/safeFetch";
import { AuthUser } from "@/types/auth.types";
import { LoginUserSchema } from "@/types/user.types";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const { error, data } = await safeFetch(
          LoginUserSchema,
          "/auth/login",
          {
            cache: "no-store",
            method: "POST",
            body: JSON.stringify(credentials),
          }
        );
        if (error) return null;
        return {
          id: data.data._id,
          username: data.data.username,
          name: data.data.name,
          email: data.data.email,
          isVerified: data.data.isVerified,
          isAdmin: data.data.isAdmin,
          isBlocked: data.data.isBlocked,
          createdAt: data.data.createdAt,
          jwt: data.jwt,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user)
        return {
          ...token,
          id: user.id,
          username: user.username,
          name: user.name,
          email: user.email,
          isVerified: user.isVerified,
          isAdmin: user.isAdmin,
          isBlocked: user.isBlocked,
          createdAt: user.createdAt,
          jwt: user.jwt,
        } as AuthUser;

      return token;
    },
    async session({ session, token }) {
      if (token) {
        return {
          ...session,
          user: {
            id: token.id,
            username: token.username,
            name: token.name,
            email: token.email,
            isVerified: token.isVerified,
            isAdmin: token.isAdmin,
            isBlocked: token.isBlocked,
            createdAt: token.createdAt,
            jwt: token.jwt,
          },
        };
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30,
  },
});
