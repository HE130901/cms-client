import React from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "An Bình Viên - Nhân viên",
  description: "Quản lý thông tin khách hàng và dich vụ của An Bình Viên",
};
const StaffLayout: React.FC = ({ children }) => {
  return <div className="pt-24">{children}</div>;
};

export default StaffLayout;
