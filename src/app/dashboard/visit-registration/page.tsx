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
    <div className="flex h-auto pt-16 justify-center">
      <div className="flex flex-1 overflow-auto">
        <div className="flex-1">
          <div className="px-4 py-4 bg-stone-100 mx-4 my-4 h-screen rounded-md">
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
                  <BreadcrumbPage>Đăng ký viếng</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <VisitRegistrationPage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(VisitRegistration);
