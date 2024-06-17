"use client";

import React, { useState } from "react";
import axios from "@/utils/axiosConfig"; // Ensure you have axios configured properly

const VisitReservation = () => {
  const [customerId, setCustomerId] = useState("");
  const [nicheId, setNicheId] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      customerId: parseInt(customerId),
      nicheId: parseInt(nicheId),
      visitDate,
    };

    try {
      const response = await axios.post(
        "https://localhost:7148/api/VisitRegistrations",
        requestBody
      );
      setMessage("Đăng ký viếng thành công!");
    } catch (error) {
      setMessage("Đăng ký viếng thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Đăng ký viếng</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="customerId"
            className="block text-gray-700 font-bold mb-2"
          >
            Customer ID
          </label>
          <input
            type="number"
            id="customerId"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="nicheId"
            className="block text-gray-700 font-bold mb-2"
          >
            Niche ID
          </label>
          <input
            type="number"
            id="nicheId"
            value={nicheId}
            onChange={(e) => setNicheId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="visitDate"
            className="block text-gray-700 font-bold mb-2"
          >
            Visit Date
          </label>
          <input
            type="date"
            id="visitDate"
            value={visitDate}
            onChange={(e) => setVisitDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Đăng ký
        </button>
      </form>
      {message && (
        <p className="mt-4 text-center text-lg font-semibold">{message}</p>
      )}
    </div>
  );
};

export default VisitReservation;
