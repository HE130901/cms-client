"use client";
import React, { useEffect, useState } from "react";
import axios from "@/utils/axiosConfig";
import { useStateContext } from "@/context/StateContext";
import ServiceOrder from "../staff/ServiceOrder";

const VisitOrderPage = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Đăng ký viếng</h2>
    </div>
  );
};

export default VisitOrderPage;
