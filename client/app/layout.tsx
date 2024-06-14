import Provider from '@/components/provider';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { ReactNode } from 'react';
import './globals.css';

const montserrat = Montserrat({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Arial', 'sans-serif'],
});
export const metadata: Metadata = {
  title: {
    template: '%s | Nexify',
    default: 'Nexify',
  },
  description: 'A social media platform where you can connect, share, and engage with others.',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(montserrat.className, 'antialiased')} suppressHydrationWarning>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
