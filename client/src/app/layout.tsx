import Provider from "@/components/provider";
import { cn } from "@/lib/utils";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import "../styles/main.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Loopfed",
    default: "Loopfed",
  },
  description:
    "A social media platform where you can connect, share, and engage with others.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          GeistSans.variable,
          GeistMono.variable,
          "bg-neutral-100 antialiased"
        )}
        suppressHydrationWarning
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
