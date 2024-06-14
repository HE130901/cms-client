"use client";
import React, { useEffect, useState } from "react";
import axios from "@/utils/axiosConfig";
import { useStateContext } from "@/context/StateContext";
import ServiceOrder from "../staff/ServiceOrder";

const ContractPage = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Quản lý hợp đồng</h2>
    </div>
  );
};

export default ContractPage;
