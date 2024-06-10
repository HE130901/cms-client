"use client";
import { useEffect } from "react";
import { useStateContext } from "@/context/StateContext";
import { useRouter } from "next/navigation";

const StaffDashboard = () => {
  const { user, loading } = useStateContext();
  const router = useRouter();

  return (
    <div className="pt-48">
      <h1>Welcome to Staff Dashboard</h1>
      <p>Your Staff ID: {user?.customerId}</p>
    </div>
  );
};

export default StaffDashboard;
