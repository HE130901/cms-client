"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import withAuth from "@/components/withAuth";
import NicheReservationPage from "@/components/customer/niche-reservation/NicheReservationPage";

const NicheBooking = () => {
  return (
    <div className="flex flex-1 overflow-auto pt-24">
      <div className="flex-1">
        <div className="flex items-center justify-between pl-4 pt-4">
          <div className="flex items-center flex-grow">
            <Breadcrumb className="flex-grow">
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
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-center flex-grow mr-56">
            Đặt ô chứa
          </h2>
          <div className="flex-grow"></div>
        </div>
        <main className="px-8 py-6 bg-orange-100 mx-4 my-4 h-auto rounded-md">
          <NicheReservationPage />
        </main>
      </div>
    </div>
  );
};

export default withAuth(NicheBooking);
