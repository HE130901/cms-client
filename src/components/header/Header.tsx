"use client";

import logo from "@/assets/images/logo.png";
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
} from "@heroicons/react/24/solid";
import { Button, Navbar as MTNavbar } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useStateContext } from "@/context/StateContext";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

interface NavItemProps {
  children: React.ReactNode;
  href: string;
}

function NavItem({ children, href }: NavItemProps) {
  return (
    <li className="transition-transform duration-300 ease-in-out hover:scale-105">
      <Link href={href}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 font-medium cursor-pointer"
        >
          {children}
        </motion.div>
      </Link>
    </li>
  );
}

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
        active ? "bg-orange-300 text-white" : "hover:bg-orange-200"
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
      label="Đặt ô chứa"
      icon={BuildingOfficeIcon}
      href="/dashboard/niche-reservation"
      active={currentView === "nicheReservation"}
    />
    <SidebarLink
      label="Đặt lịch viếng"
      icon={PencilSquareIcon}
      href="/dashboard/visit-reservation"
      active={currentView === "visitReservation"}
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
    <SidebarLink
      label="Quản lý đơn"
      icon={RectangleGroupIcon}
      href="/dashboard/reservation-manager"
      active={currentView === "reservationManager"}
    />
    <SidebarLink
      label="Quản lý tài khoản"
      icon={RectangleGroupIcon}
      href="/dashboard/profile-manager"
      active={currentView === "profileManager"}
    />
  </div>
);

export function Header({ currentView, setCurrentView }) {
  const [isScrolling, setIsScrolling] = React.useState(false);
  const { user, logout } = useStateContext();
  const pathname = usePathname();

  React.useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomePage = pathname === "/";

  return (
    <MTNavbar
      shadow={isScrolling || !isHomePage}
      fullWidth
      blurred={false}
      className={`fixed top-0 z-50 border-0 transition-colors duration-300 ${
        isScrolling || !isHomePage
          ? "bg-orange-200 shadow-lg text-black"
          : "bg-transparent shadow-none text-white"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button className="mr-4 p-2 bg-orange-500 text-white rounded-md shadow-md">
                <Bars3Icon className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-64 bg-orange-100 rounded-md shadow-md"
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
              <Image
                alt="logo"
                src={logo}
                height={50}
                width={150}
                className="rounded-lg"
              />
            </motion.div>
          </Link>
        </div>
        <ul
          className={`hidden lg:flex items-center gap-6 ${
            isScrolling || !isHomePage ? "text-black" : "text-white"
          }`}
        >
          {NAV_MENU.map(({ name, icon: Icon, href }) => (
            <NavItem key={name} href={href}>
              <Icon className="h-5 w-5" />
              <span className="font-bold">{name}</span>
            </NavItem>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <motion.button
                onClick={logout}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="hidden lg:flex"
              >
                <Button
                  variant="filled"
                  color={isScrolling || !isHomePage ? "gray" : "white"}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-transform duration-300 transform rounded-full shadow-lg hover:scale-105 text-black border bg-white"
                >
                  <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                  Đăng xuất
                </Button>
              </motion.button>
              <motion.button
                onClick={logout}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="flex lg:hidden"
              >
                <Button
                  variant="filled"
                  color={isScrolling || !isHomePage ? "gray" : "white"}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-transform duration-300 transform rounded-full shadow-lg hover:scale-105 text-black border bg-white"
                >
                  <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                </Button>
              </motion.button>
            </>
          ) : (
            <>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="hidden lg:flex"
              >
                <Link href="/auth/login" passHref>
                  <Button
                    variant="filled"
                    color={isScrolling || !isHomePage ? "gray" : "white"}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-transform duration-300 transform rounded-full shadow-lg hover:scale-105 text-black border bg-white"
                  >
                    <UserCircleIcon className="h-5 w-5" />
                    Đăng nhập
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="flex lg:hidden"
              >
                <Link href="/auth/login" passHref>
                  <Button
                    variant="filled"
                    color={isScrolling || !isHomePage ? "gray" : "white"}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-transform duration-300 transform rounded-full shadow-lg hover:scale-105 text-black border bg-white"
                  >
                    <UserCircleIcon className="h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </MTNavbar>
  );
}

export default Header;
