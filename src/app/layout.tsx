import type { Metadata } from "next";
import "@/styles/globals.css";

// app/layout.tsx
import { ReactNode } from "react";
import Header from "@/components/header/Header";

export const metadata: Metadata = {
  title: "Trang chủ",
  description: "Trang chủ của CMS Client",
};
interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <html>
      <head>
        <title>CMS Client</title>
      </head>
      <body className="bg-amber-100">{children}</body>
    </html>
  );
};

export default Layout;
