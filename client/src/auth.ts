import { authConfig } from "@/configs/auth.config";
import safeFetch from "@/lib/safeFetch";
import { AuthUser } from "@/types/auth.types";
import { LoginUserSchema } from "@/types/user.types";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { auth, signIn, signOut, unstable_update, handlers } = NextAuth({
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
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(credentials),
          }
        );
        if (error) return null;
        console.log("success");
        return {
          id: data.data.id,
          username: data.data.username,
          name: data.data.name,
          email: data.data.email,
          isVerified: data.data.isVerified,
          isAdmin: data.data.isAdmin,
          isBlocked: data.data.isBlocked,
          createdAt: data.data.createdAt,
          bio: data.data.bio,
          dateOfBirth: data.data.dateOfBirth,
          profilePicture: data.data.profilePicture,
          jwt: data.jwt,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      if (trigger === "update") {
        return { ...token, isVerified: session.user.isVerified };
      }
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
          bio: user.bio,
          dateOfBirth: user.dateOfBirth,
          profilePicture: user.profilePicture,
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
            bio: token.bio,
            dateOfBirth: token.dateOfBirth,
            profilePicture: token.profilePicture,
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
