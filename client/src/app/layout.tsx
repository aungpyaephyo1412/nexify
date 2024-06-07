import { cn } from "@/lib/utils";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import "../styles/main.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Loopfeed",
    default: "Loopfeed",
  },
  description:
    "A social media platform where you can connect, share, and engage with others.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(GeistSans.variable, GeistMono.variable)}>
        {children}
      </body>
    </html>
  );
}
