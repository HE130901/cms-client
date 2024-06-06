"use client";

import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosConfig"; // Import the new axios instance
import { Button } from "@material-tailwind/react";

const NicheSelector = ({
  selectedBuilding,
  selectedFloor,
  selectedSection,
  selectedNiche,
  setSelectedNiche,
  openModal,
}) => {
  const [niches, setNiches] = useState([]);

  useEffect(() => {
    if (selectedBuilding && selectedFloor && selectedSection) {
      const fetchNiches = async () => {
        try {
          const response = await axiosInstance.get(
            `/buildings/${selectedBuilding}/floors/${selectedFloor}/sections/${selectedSection}/niches`
          );
          setNiches(response.data);
        } catch (error) {
          console.error("Error fetching niches:", error);
        }
      };
      fetchNiches();
    }
  }, [selectedBuilding, selectedFloor, selectedSection]);

  // Split niches into two halves
  const firstHalf = niches.slice(0, Math.ceil(niches.length / 2));
  const secondHalf = niches.slice(Math.ceil(niches.length / 2));

  return (
    <div className="my-4 text-center">
      <h2 className="text-xl font-semibold mb-2">Select Niche</h2>
      <div className="flex justify-center space-x-4">
        <div className="inline-grid grid-cols-10 gap-2">
          {firstHalf.map((niche) => (
            <div
              key={niche.id}
              onClick={() => {
                if (niche.status === "available") {
                  setSelectedNiche(niche.id);
                  openModal();
                }
              }}
              className={`p-4 border rounded cursor-pointer text-center flex items-center justify-center ${
                niche.status === "unavailable"
                  ? "bg-black text-white"
                  : niche.status === "booked"
                  ? "bg-gray-200"
                  : selectedNiche === niche.id
                  ? "bg-blue-200 border-blue-500"
                  : "bg-white"
              }`}
              style={{ width: "50px", height: "50px" }}
            >
              {niche.id}
            </div>
          ))}
        </div>
        <div className="inline-grid grid-cols-10 gap-2">
          {secondHalf.map((niche) => (
            <div
              key={niche.id}
              onClick={() => {
                if (niche.status === "available") {
                  setSelectedNiche(niche.id);
                  openModal();
                }
              }}
              className={`p-4 border rounded cursor-pointer text-center flex items-center justify-center ${
                niche.status === "unavailable"
                  ? "bg-black text-white"
                  : niche.status === "booked"
                  ? "bg-gray-200"
                  : selectedNiche === niche.id
                  ? "bg-blue-200 border-blue-500"
                  : "bg-white"
              }`}
              style={{ width: "50px", height: "50px" }}
            >
              {niche.id}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex justify-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-black"></div>
          <span>Không thể chọn</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-white border"></div>
          <span>Có thể chọn</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-200 border-blue-500"></div>
          <span>Đang chọn</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-200"></div>
          <span>Đang được đặt</span>
        </div>
      </div>
    </div>
  );
};

export default NicheSelector;
