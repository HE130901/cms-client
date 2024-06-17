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

const CustomerDashboard = () => {
  return (
    <div className="flex h-auto bg-orange-50 pt-24 ">
      <div className="flex flex-1 overflow-auto">
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
                <BreadcrumbPage>Trang hiện tại</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <main className="px-8 py-6 bg-orange-100 mx-4 my-4 h-screen rounded-md">
            <h1 className="text-2xl font-semibold mb-4">Dịch vụ</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
              cumque, quas, quae, quidem dolorum voluptatum quia laborum
              voluptatem natus doloremque iusto.
            </p>
          </main>
        </div>
      </div>
    </div>
  );
};

export default withAuth(CustomerDashboard);
