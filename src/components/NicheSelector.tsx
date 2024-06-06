"use client";
import React from "react";

// Mock data for niche statuses
const niches = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  status:
    Math.random() < 0.2
      ? "booked"
      : Math.random() < 0.1
      ? "unavailable"
      : "available",
}));

const NicheSelector = ({ selectedNiche, setSelectedNiche, openModal }) => {
  const handleNicheClick = (niche) => {
    if (niche.status === "available") {
      setSelectedNiche(niche.id);
      openModal();
    }
  };

  const firstHalf = niches.slice(0, 50);
  const secondHalf = niches.slice(50);

  return (
    <div className="my-4 text-center">
      <h2 className="text-xl font-semibold mb-2">Select Niche</h2>
      <div className="inline-grid grid-cols-10 gap-2 pr-8">
        {firstHalf.map((niche) => (
          <button
            key={niche.id}
            onClick={() => handleNicheClick(niche)}
            className={`p-4 border rounded cursor-pointer text-center flex items-center justify-center ${
              niche.status === "unavailable"
                ? "bg-black text-white"
                : niche.status === "booked"
                ? "bg-gray-200"
                : "bg-white"
            } ${
              selectedNiche === niche.id ? "bg-blue-200 border-blue-500" : ""
            }`}
            style={{ width: "50px", height: "50px" }}
          >
            {niche.id}
          </button>
        ))}
      </div>
      <div className="inline-grid grid-cols-10 gap-2 mt-4">
        {secondHalf.map((niche) => (
          <button
            key={niche.id}
            onClick={() => handleNicheClick(niche)}
            className={`p-4 border rounded cursor-pointer text-center flex items-center justify-center ${
              niche.status === "unavailable"
                ? "bg-black text-white"
                : niche.status === "booked"
                ? "bg-gray-200"
                : "bg-white"
            } ${
              selectedNiche === niche.id ? "bg-blue-200 border-blue-500" : ""
            }`}
            style={{ width: "50px", height: "50px" }}
          >
            {niche.id}
          </button>
        ))}
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
          <div className="w-4 h-4 bg-gray-200"></div>
          <span>Đang được đặt</span>
        </div>
      </div>
    </div>
  );
};

export default NicheSelector;
