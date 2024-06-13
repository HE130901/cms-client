import Header from "@/components/header/Header";
import CallHotline from "@/components/home/call-hotline";
import { Toaster } from "@/components/ui/sonner";
import { StateProvider } from "@/context/StateContext";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "An Bình Viên",
  description: "Nơi an nghỉ cuối cùng, bình yên và trang trọng",
};

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <html>
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
