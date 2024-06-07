"use client";
import logo from "@/assets/images/logo.png";
import {
  HomeIcon,
  InformationCircleIcon,
  StarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import {
  Button,
  Navbar as MTNavbar,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";

interface NavItemProps {
  children: React.ReactNode;
  href?: string;
}

function NavItem({ children, href }: NavItemProps) {
  return (
    <li className="hover:transform hover:scale-105 transition-transform duration-300">
      <Typography
        as="a"
        href={href || "#"}
        target="_self"
        variant="paragraph"
        className="flex items-center gap-2 font-medium"
      >
        {children}
      </Typography>
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
    href: "/booking",
  },
  {
    name: "Thông tin",
    icon: InformationCircleIcon,
    href: "/about",
  },
];

export function Header() {
  const [isScrolling, setIsScrolling] = React.useState(false);

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

  return (
    <MTNavbar
      shadow={isScrolling} // Đảm bảo rằng thuộc tính shadow được thay đổi theo isScrolling
      fullWidth
      blurred={false}
      className={`fixed top-0 z-50 border-0 transition-colors duration-300 ${
        isScrolling ? "bg-orange-100 shadow-lg" : "bg-transparent shadow-none"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <a href="/" target="_self">
          <Image
            alt="logo"
            src={logo}
            height={100}
            width={180}
            color="bg-orange-100"
            className="rounded-lg hover:transform hover:scale-105 transition-transform duration-300 hover:cursor-pointer"
          />
        </a>
        <ul
          className={`ml-10 hidden items-center gap-6 lg:flex ${
            isScrolling ? "text-gray-900" : "text-white"
          }`}
        >
          {NAV_MENU.map(({ name, icon: Icon, href }) => (
            <NavItem key={name} href={href}>
              <div className="flex items-center gap-2">
                <Icon className="h-5 w-5" />
                <span className="font-bold">{name}</span>
              </div>
            </NavItem>
          ))}
        </ul>
        <div className="hidden items-center gap-4 lg:flex">
          <motion.a
            href="/login"
            target="_self"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Button
              variant="filled"
              color={isScrolling ? "gray" : "white"}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-transform duration-300 transform rounded-full shadow-lg hover:scale-105 text-black"
            >
              <UserCircleIcon className="h-5 w-5" />
              Đăng nhập
            </Button>
          </motion.a>
        </div>
      </div>
    </MTNavbar>
  );
}

export default Header;
