"use client";
import { useState } from "react";
import Link from "next/link";
import {
  DocumentIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  PencilSquareIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/outline";
import OrderList from "@/components/staff/OrderList";
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
  <nav className="flex-shrink-0 bg-orange-100 md:w-64 sm:w-56 rounded-md  shadow-md">
    <div className="flex items-center h-16 px-4 bg-orange-500 rounded-md shadow-md">
      <Link href="#" className="flex items-center" prefetch={false}>
        <BuildingOfficeIcon className="h-6 w-6 text-white" />
        <span className="ml-2 text-lg font-semibold text-white">Quản lý</span>
      </Link>
    </div>
    <div className="px-4 py-6 space-y-2">
      <SidebarLink
        label="Đơn đặt ô chứa"
        icon={DocumentIcon}
        active={currentView === "orderList"}
        onClick={() => setCurrentView("orderList")}
      />
      <SidebarLink
        label="Đơn dịch vụ"
        icon={DocumentTextIcon}
        active={currentView === "serviceOrder"}
        onClick={() => setCurrentView("serviceOrder")}
      />
      <SidebarLink
        label="Hợp đồng"
        icon={PencilSquareIcon}
        active={currentView === "contract"}
        onClick={() => setCurrentView("contract")}
      />
      <SidebarLink
        label="Dịch vụ"
        icon={RectangleGroupIcon}
        active={currentView === "service"}
        onClick={() => setCurrentView("service")}
      />
    </div>
  </nav>
);

const StaffDashboard = () => {
  const [currentView, setCurrentView] = useState("orderList");

  const renderContent = () => {
    switch (currentView) {
      case "orderList":
        return <OrderList />;
      case "serviceOrder":
        return <ServiceOrder />;
      case "contract":
        return <Contract />;
      case "service":
        return <Service />;
      default:
        return <OrderList />;
    }
  };

  return (
    <div className="flex h-screen bg-orange-50 pl-4">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <div className="flex-1 overflow-auto">
        <main className="px-8 py-6 bg-orange-50 shadow-lg rounded-lg mx-4 my-4">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default StaffDashboard;
