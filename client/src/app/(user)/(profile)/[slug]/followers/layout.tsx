"use client";
import QueryProvider from "@/components/query-provider";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return <QueryProvider>{children}</QueryProvider>;
};

export default Layout;
