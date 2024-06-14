import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      if (isLoggedIn) {
        if (
          nextUrl.pathname.startsWith('/login') ||
          nextUrl.pathname.startsWith('/register') ||
          nextUrl.pathname === '/'
        ) {
          return Response.redirect(new URL('/home', nextUrl));
        }
        return true;
      } else {
        return (
          nextUrl.pathname.startsWith('/forgot-password') ||
          nextUrl.pathname.startsWith('/reset-password') ||
          nextUrl.pathname === '/register'
        );
      }
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
