//src/app/dashboard/niche-reservation/page.tsx
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

const NicheReservations = () => {
  return (
    <div className="flex h-auto pt-16 justify-center">
      <div className="flex flex-1 overflow-auto">
        <div className="flex-1">
          <main className="px-4 py-4 bg-stone-100 mx-4 my-4 h-screen rounded-md">
            <Breadcrumb className="">
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
            <h1 className="text-2xl font-semibold mb-4 text-center">
              Đặt ô chứa
            </h1>
            <NicheReservationPage />
          </main>
        </div>
      </div>
    </div>
  );
};

export default withAuth(NicheReservations);
