import Header from "@/components/header/Header";
import CallHotline from "@/components/home/call-hotline";
import { Toaster } from "@/components/ui/sonner";
import { StateProvider } from "@/context/StateContext";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";

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
      <body className="bg-amber-50">
        <StateProvider>
          <Header />
          {children}
          <CallHotline />

          <Toaster />
        </StateProvider>
      </body>
    </html>
  );
};

export default Layout;
