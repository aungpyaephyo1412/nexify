import Provider from "@/components/provider";
import { cn } from "@/lib/utils";
import "@/styles/main.css";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});
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
        className={cn(montserrat.className, "bg-neutral-100 antialiased")}
        suppressHydrationWarning
      >
        <Analytics mode={"production"} />
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
