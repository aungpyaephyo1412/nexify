import { authConfig } from '@/auth.config';
import safeFetch from '@/lib/safeFetch';
import { AUTH_USER, LOGIN_USER_SCHEMA } from '@/types/user.types';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { auth, signIn, signOut, handlers, unstable_update } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const { error, data } = await safeFetch(LOGIN_USER_SCHEMA, '/auth/login', {
          cache: 'no-store',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(credentials),
        });
        if (error) return null;
        return {
          jwt: data.jwt,
          id: data.data.id,
          bio: data.data.bio,
          name: data.data.name,
          email: data.data.email,
          isAdmin: data.data.isAdmin,
          username: data.data.username,
          createdAt: data.data.createdAt,
          isBlocked: data.data.isBlocked,
          isVerified: data.data.isVerified,
          dateOfBirth: data.data.dateOfBirth,
          profilePicture: data.data.profilePicture,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      if (trigger === 'update') {
        return {
          ...token,
          ...session.user,
        };
      }
      if (trigger === 'signIn') {
        if (user)
          return {
            ...token,
            id: user.id,
            bio: user.bio,
            jwt: user.jwt,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            username: user.username,
            createdAt: user.createdAt,
            isBlocked: user.isBlocked,
            isVerified: user.isVerified,
            dateOfBirth: user.dateOfBirth,
            profilePicture: user.profilePicture,
          } as AUTH_USER;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        return {
          ...session,
          user: {
            id: token.id,
            bio: token.bio,
            jwt: token.jwt,
            name: token.name,
            email: token.email,
            isAdmin: token.isAdmin,
            username: token.username,
            createdAt: token.createdAt,
            isBlocked: token.isBlocked,
            isVerified: token.isVerified,
            dateOfBirth: token.dateOfBirth,
            profilePicture: token.profilePicture,
          },
        };
      }

      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 30,
  },
});
