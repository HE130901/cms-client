"use client";

import logo from "@/assets/images/logo.png";
import {
  HomeIcon,
  InformationCircleIcon,
  StarIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/solid";
import {
  Button,
  Navbar as MTNavbar,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";
import { useStateContext } from "@/context/StateContext";
import { usePathname } from "next/navigation";

interface NavItemProps {
  children: React.ReactNode;
  href: string;
}

function NavItem({ children, href }: NavItemProps) {
  return (
    <li className="hover:transform hover:scale-105 transition-transform duration-300">
      <Link href={href}>
        <p className="flex items-center gap-2 font-medium">{children}</p>
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
          ? "bg-orange-100 shadow-lg text-black"
          : "bg-transparent shadow-none text-white"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" passHref>
          <Image
            alt="logo"
            src={logo}
            height={100}
            width={180}
            className="rounded-lg hover:transform hover:scale-105 transition-transform duration-300 hover:cursor-pointer"
          />
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
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-transform duration-300 transform rounded-full shadow-lg hover:scale-105 text-black border"
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
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-transform duration-300 transform rounded-full shadow-lg hover:scale-105 text-black"
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
