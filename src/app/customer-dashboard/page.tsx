"use client";
import { useEffect } from "react";
import { useStateContext } from "@/context/StateContext";
import { useRouter } from "next/navigation";

const CustomerDashboard = () => {
  const { user, loading } = useStateContext();
  const router = useRouter();

  const handleBooking = () => {
    router.push("/booking");
  };

  return (
    <div className="flex flex-col items-center pt-48">
      <div className="">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Dịch vụ dành cho khách hàng
        </h1>

        <button
          onClick={handleBooking}
          className="mt-8 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Đặt chỗ
        </button>
      </div>
    </div>
  );
};

export default CustomerDashboard;
