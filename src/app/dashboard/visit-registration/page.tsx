"use client";
import VisitRegistrationList from "@/components/customer/reservation-manager/VisitRegistrationList";
import VisitRegistrationPage from "@/components/customer/visit-registration/VisitRegistrationPage";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import withAuth from "@/components/withAuth";

const VisitRegistration = () => {
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
              <BreadcrumbPage>Đăng ký viếng</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <main className="px-4 md:px-8 py-6 bg-slate-100 mx-2 md:mx-4 my-4 h-auto rounded-md">
          <VisitRegistrationPage />
          <VisitRegistrationList />
        </main>
      </div>
    </div>
  );
};

export default withAuth(VisitRegistration);
