"use client";
import ProductCollection from "@/components/customer/service-order/ProductCollection";
import Component from "@/components/customer/dashboard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import withAuth from "@/components/withAuth";

const CustomerDashboard = () => {
  return (
    <div className="flex h-auto pt-16 pb-44">
      <div className="flex flex-1 overflow-auto">
        <div className="flex-1">
          <main className="px-4 py-4 bg-stone-100 mx-4 my-4 h-auto rounded-md">
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
                  <BreadcrumbPage>Trang hiện tại</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <Component />
          </main>
        </div>
      </div>
    </div>
  );
};

export default withAuth(CustomerDashboard);
