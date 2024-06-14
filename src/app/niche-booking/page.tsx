"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import NicheBookingPage from "@/components/dashboard/NicheBookingPage";
import withAuth from "@/components/withAuth";

const NicheBooking = () => {
  return (
    <div className="flex flex-1 overflow-auto pt-24">
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
              <BreadcrumbPage>Đặt ô chứa</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <main className="px-8 py-6 bg-orange-100 mx-4 my-4 h-screen rounded-md">
          <NicheBookingPage />
        </main>
      </div>
    </div>
  );
};

export default withAuth(NicheBooking);
