"use client";
import { useState } from "react";
import Link from "next/link";
import {
  BuildingOfficeIcon,
  HomeIcon,
  DocumentTextIcon,
  PencilSquareIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useStateContext } from "@/context/StateContext";
import withAuth from "@/components/withAuth";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
  <Sheet>
    <SheetTrigger asChild>
      <Button className="fixed top-4 left-4 z-50 p-2 bg-orange-500 text-white rounded-md shadow-md">
        Menu
      </Button>
    </SheetTrigger>
    <SheetContent
      side="left"
      className="w-64 bg-orange-100 rounded-md shadow-md"
    >
      <div className="flex items-center h-16 px-4 bg-orange-500 rounded-md shadow-md">
        <Link href="#" className="flex items-center" prefetch={false}>
          <HomeIcon className="h-6 w-6 text-white" />
          <span className="ml-2 text-lg font-semibold text-white">
            Xin chào
          </span>
        </Link>
      </div>

      <div className="px-4 py-6 space-y-2">
        <SidebarLink
          label="Đặt ô chứa"
          icon={BuildingOfficeIcon}
          href="/niche-booking"
          active={currentView === "nicheBooking"}
        />
        <SidebarLink
          label="Đặt dịch vụ"
          icon={DocumentTextIcon}
          href="/service-order"
          active={currentView === "serviceOrder"}
        />
        <SidebarLink
          label="Đặt lịch viếng"
          icon={PencilSquareIcon}
          href="/visit-order"
          active={currentView === "visitOrder"}
        />
        {userRole !== "Guest" && (
          <SidebarLink
            label="Quản lý hợp đồng"
            icon={RectangleGroupIcon}
            href="/contract"
            active={currentView === "contract"}
          />
        )}
        <SidebarLink
          label="Quản lý đơn"
          icon={RectangleGroupIcon}
          href="/reservation"
          active={currentView === "reservation"}
        />
        <SidebarLink
          label="Quản lý tài khoản"
          icon={RectangleGroupIcon}
          href="/profile"
          active={currentView === "profile"}
        />
      </div>
    </SheetContent>
  </Sheet>
);

const CustomerDashboard = () => {
  const { user } = useStateContext();
  const router = useRouter();
  const [currentView, setCurrentView] = useState("");

  return (
    <div className="flex h-screen bg-orange-50 pt-24 h-screen">
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        userRole={user?.role}
      />
      <div className="flex flex-1 overflow-auto">
        <div className="flex-1">
          <Breadcrumb className="pl-4 pt-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dịch vụ</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Trang hiện tại</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <main className="px-8 py-6 bg-orange-100 mx-4 my-4 h-screen rounded-md">
            <h1 className="text-2xl font-semibold mb-4">Dịch vụ</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
              cumque, quas, quae, quidem dolorum voluptatum quia laborum
              voluptatem natus doloremque iusto.
            </p>
          </main>
        </div>
      </div>
    </div>
  );
};

export default withAuth(CustomerDashboard);
