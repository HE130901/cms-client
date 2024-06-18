"use client";
// src/app/service-order/page.tsx

import React from "react";
import withAuth from "@/components/withAuth";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ServiceOrderContent from "@/components/customer/service-order/ServiceOrderContent";

const ServiceOrderPage: React.FC = () => {
  return (
    <div className="flex flex-1 pt-24">
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
              <BreadcrumbPage>Đặt dịch vụ</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <main className="px-8 py-6 bg-orange-100 mx-4 my-4 h-auto rounded-md">
          <ServiceOrderContent />
        </main>
      </div>
    </div>
  );
};

export default withAuth(ServiceOrderPage);
