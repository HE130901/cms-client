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
import BookingPage from "@/components/dashboard/NicheBookingPage";
import ServiceOrder from "@/components/dashboard/ServiceOrderPage";
import Contract from "@/components/staff/Contract";
import Service from "@/components/staff/Service";
import { useStateContext } from "@/context/StateContext";
import withAuth from "@/components/withAuth";
import ReservationList from "@/components/dashboard/ReservationPage";
import VisitOrderPage from "@/components/dashboard/VisitOrderPage";
import ProfilePage from "@/components/dashboard/ProfilePage";

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

const Sidebar = ({ currentView, setCurrentView, userRole }) => (
  <nav className="flex-shrink-0 bg-orange-100 md:w-64 sm:w-56 rounded-md shadow-md">
    <div className="flex items-center h-16 px-4 bg-orange-500 rounded-md shadow-md">
      <Link href="#" className="flex items-center" prefetch={false}>
        <HomeIcon className="h-6 w-6 text-white" />
        <span className="ml-2 text-lg font-semibold text-white">Xin chào</span>
      </Link>
    </div>
    <div className="px-4 py-6 space-y-2">
      <SidebarLink
        label="Đặt ô chứa"
        icon={BuildingOfficeIcon}
        active={currentView === "nicheBooking"}
        onClick={() => setCurrentView("nicheBooking")}
      />
      <SidebarLink
        label="Đặt dịch vụ"
        icon={DocumentTextIcon}
        active={currentView === "serviceOrder"}
        onClick={() => setCurrentView("serviceOrder")}
      />
      <SidebarLink
        label="Đặt lịch viếng"
        icon={PencilSquareIcon}
        active={currentView === "visitOrder"}
        onClick={() => setCurrentView("visitOrder")}
      />
      {userRole !== "Guest" && (
        <SidebarLink
          label="Quản lý hợp đồng"
          icon={RectangleGroupIcon}
          active={currentView === "contract"}
          onClick={() => setCurrentView("contract")}
        />
      )}
      <SidebarLink
        label="Quản lý đơn"
        icon={RectangleGroupIcon}
        active={currentView === "reservation"}
        onClick={() => setCurrentView("reservation")}
      />
      <SidebarLink
        label="Quản lý tài khoản"
        icon={RectangleGroupIcon}
        active={currentView === "profile"}
        onClick={() => setCurrentView("profile")}
      />
    </div>
  </nav>
);

const CustomerDashboard = () => {
  const { user } = useStateContext();
  const [currentView, setCurrentView] = useState("nicheBooking");

  const renderContent = () => {
    switch (currentView) {
      case "nicheBooking":
        return <BookingPage />;
      case "serviceOrder":
        return <ServiceOrder />;
      case "visitOrder":
        return <VisitOrderPage />;
      case "contract":
        return <Contract />;
      case "reservation":
        return <ReservationList />;
      case "profile":
        return <ProfilePage />;
      default:
        return <BookingPage />;
    }
  };

  return (
    <div className="flex h-screen bg-orange-50 pl-4 pt-24 h-screen">
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        userRole={user?.role}
      />
      <div className="flex-1 overflow-auto">
        <main className="px-8 py-6 bg-orange-100 mx-4 my-4 h-screen rounded-md">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default withAuth(CustomerDashboard);
