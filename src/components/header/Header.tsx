"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  HomeIcon,
  InformationCircleIcon,
  StarIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  PencilSquareIcon,
  RectangleGroupIcon,
  UserIcon,
  ClipboardDocumentIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import logo from "@/assets/images/logo.png";
import { useStateContext } from "@/context/StateContext";
import { usePathname } from "next/navigation";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const NAV_MENU = [
  {
    name: "Trang chủ",
    icon: HomeIcon,
    href: "/",
  },
  {
    name: "Dịch vụ",
    icon: StarIcon,
    href: "/dashboard",
  },
  {
    name: "Thông tin",
    icon: InformationCircleIcon,
    href: "/about",
  },
];

const SidebarLink = ({ label, icon: Icon, href, active }) => (
  <Link href={href}>
    <div
      className={`flex items-center px-4 py-2 text-gray-800 ${
        active ? "bg-stone-300 text-white" : "hover:bg-stone-200"
      } rounded-md transition-colors duration-300`}
    >
      <Icon className={`h-5 w-5 ${active ? "text-white" : "text-gray-800"}`} />
      <span
        className={`ml-2 text-sm font-medium ${
          active ? "text-white" : "text-gray-800"
        }`}
      >
        {label}
      </span>
    </div>
  </Link>
);

const Sidebar = ({ currentView, setCurrentView, userRole }) => (
  <div className="px-4 py-6 space-y-2">
    <SidebarLink
      label="Trang chủ"
      icon={HomeIcon}
      href="/dashboard"
      active={currentView === "dashboard"}
    />
    <SidebarLink
      label="Đặt ô chứa"
      icon={BuildingOfficeIcon}
      href="/dashboard/niche-reservation"
      active={currentView === "nicheReservation"}
    />
    <SidebarLink
      label="Đặt lịch viếng"
      icon={PencilSquareIcon}
      href="/dashboard/visit-registration"
      active={currentView === "visitRegistration"}
    />
    <SidebarLink
      label="Đặt dịch vụ"
      icon={DocumentTextIcon}
      href="/dashboard/service-order"
      active={currentView === "serviceOrder"}
    />
    {userRole !== "Guest" && (
      <SidebarLink
        label="Quản lý hợp đồng"
        icon={RectangleGroupIcon}
        href="/dashboard/contract-manager"
        active={currentView === "contractManager"}
      />
    )}
  </div>
);

export function Header({ currentView, setCurrentView }) {
  const [isScrolling, setIsScrolling] = useState(false);
  const { user, logout } = useStateContext();
  const pathname = usePathname();

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isHomePage = pathname === "/";

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        isScrolling || !isHomePage
          ? "bg-stone-100 shadow-lg text-black"
          : "bg-transparent shadow-none text-white"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <button className="mr-4 p-2 bg-stone-400 text-white rounded-md shadow-md">
                <Bars3Icon className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className={`w-64 bg-slate-100 rounded-md shadow-md`}
            >
              <Sidebar
                currentView={currentView}
                setCurrentView={setCurrentView}
                userRole={user?.role}
              />
            </SheetContent>
          </Sheet>
          <Link href="/" passHref>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="rounded-lg overflow-hidden hover:cursor-pointer"
            >
              <Image alt="logo" src={logo} height={50} width={150} />
            </motion.div>
          </Link>
        </div>
        <ul className="hidden lg:flex items-center gap-6">
          {NAV_MENU.map(({ name, icon: Icon, href }) => (
            <li
              key={name}
              className="transition-transform duration-300 ease-in-out hover:scale-105"
            >
              <Link href={href}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 font-medium cursor-pointer"
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-bold">{name}</span>
                </motion.div>
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-transform duration-300 transform rounded-full shadow-lg hover:scale-105 text-black border bg-white">
                <UserCircleIcon className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {user ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile-manager">
                      <UserIcon className="h-5 w-5 mr-2" />
                      Hồ sơ của tôi
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/reservation-manager">
                      <ClipboardDocumentIcon className="h-5 w-5 mr-2" />
                      Đơn của tôi
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2" />
                    Đăng xuất
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/login">
                      <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                      Đăng nhập
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/register">
                      <UserIcon className="h-5 w-5 mr-2" />
                      Đăng ký
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

export default Header;
