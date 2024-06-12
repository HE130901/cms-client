"use client";
import { useState } from "react";
import Link from "next/link";
import {
  DocumentIcon,
  BuildingOfficeIcon,
  HomeIcon,
  DocumentTextIcon,
  PencilSquareIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/outline";
import BookingPage from "@/components/booking/BookingPage";
import ServiceOrder from "@/components/staff/ServiceOrder";
import Contract from "@/components/staff/Contract";
import Service from "@/components/staff/Service";

const SidebarLink = ({ label, icon: Icon, active, onClick }) => (
  <button
    onClick={onClick}
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
  </button>
);

const Sidebar = ({ currentView, setCurrentView }) => (
  <nav className="flex-shrink-0 bg-orange-100 md:w-64 sm:w-56 rounded-md shadow-md">
    <div className="flex items-center h-16 px-4 bg-orange-500 rounded-md shadow-md">
      <Link href="#" className="flex items-center" prefetch={false}>
        <HomeIcon className="h-6 w-6 text-white" />
        <span className="ml-2 text-lg font-semibold text-white">Xin chào</span>
      </Link>
    </div>
    <div className="px-4 py-6 space-y-2">
      <SidebarLink
        label="Đặt ô chứa trực tuyến"
        icon={BuildingOfficeIcon}
        active={currentView === "bookingPage"}
        onClick={() => setCurrentView("bookingPage")}
      />
      <SidebarLink
        label="Đặt dịch vụ"
        icon={DocumentTextIcon}
        active={currentView === "serviceOrder"}
        onClick={() => setCurrentView("serviceOrder")}
      />
      <SidebarLink
        label="Đăng ký viếng thăm"
        icon={PencilSquareIcon}
        active={currentView === "contract"}
        onClick={() => setCurrentView("contract")}
      />
      <SidebarLink
        label="Theo dõi dịch vụ"
        icon={RectangleGroupIcon}
        active={currentView === "service"}
        onClick={() => setCurrentView("service")}
      />{" "}
      <SidebarLink
        label="Theo dõi ô chứa"
        icon={RectangleGroupIcon}
        active={currentView === "niche"}
        onClick={() => setCurrentView("niche")}
      />
      <SidebarLink
        label="Quản lý tài khoản"
        icon={RectangleGroupIcon}
        active={currentView === "account"}
        onClick={() => setCurrentView("account")}
      />
    </div>
  </nav>
);

const CustomerDashboard = () => {
  const [currentView, setCurrentView] = useState("bookingPage");

  const renderContent = () => {
    switch (currentView) {
      case "bookingPage":
        return <BookingPage />;
      case "serviceOrder":
        return <ServiceOrder />;
      case "contract":
        return <Contract />;
      case "service":
        return <Service />;
      default:
        return <BookingPage />;
    }
  };

  return (
    <div className="flex h-screen bg-orange-50 pl-4 pt-24 h-screen">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <div className="flex-1 overflow-auto">
        <main className="px-8 py-6 bg-orange-100 mx-4 my-4 h-screen rounded-md">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default CustomerDashboard;
