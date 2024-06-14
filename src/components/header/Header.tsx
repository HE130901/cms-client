"use client";

import logo from "@/assets/images/logo.png";
import {
  HomeIcon,
  InformationCircleIcon,
  StarIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { Button, Navbar as MTNavbar } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useStateContext } from "@/context/StateContext";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface NavItemProps {
  children: React.ReactNode;
  href: string;
}

function NavItem({ children, href }: NavItemProps) {
  return (
    <li className="transition-transform duration-300 ease-in-out hover:scale-105">
      <Link href={href}>
        <motion.div
          whileHover={{ scale: 1.05 }} // Hiệu ứng scale khi hover
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

export function Header() {
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
        <ul
          className={`ml-10 hidden items-center gap-6 lg:flex ${
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
        <div className="hidden items-center gap-4 lg:flex">
          {user ? (
            <motion.button
              onClick={logout}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
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
          ) : (
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
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
          )}
        </div>
      </div>
    </MTNavbar>
  );
}

export default Header;
