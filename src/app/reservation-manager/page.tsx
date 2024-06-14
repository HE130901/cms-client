"use client";
import ReservationManagerPage from "@/components/customer/reservation-manager/ReservationManager";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import withAuth from "@/components/withAuth";

const ReservationManager = () => {
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
              <BreadcrumbPage>Quản lý đơn</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <main className="px-8 py-6 bg-orange-100 mx-4 my-4 h-screen rounded-md">
          <ReservationManagerPage />
        </main>
      </div>
    </div>
  );
};

export default withAuth(ReservationManager);
