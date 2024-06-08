"use client";

import React, { useEffect } from "react";
import { useStateContext } from "@/context/StateContext";

const NicheSelector = ({ openModal }) => {
  const {
    selectedBuilding,
    selectedFloor,
    selectedArea,
    setSelectedNiche,
    niches,
    fetchNiches,
  } = useStateContext();

  useEffect(() => {
    if (selectedBuilding && selectedFloor && selectedArea) {
      fetchNiches(
        selectedBuilding.buildingId,
        selectedFloor.floorId,
        selectedArea.areaId
      );
    }
  }, [selectedBuilding, selectedFloor, selectedArea]);

  return (
    <div className="my-4 text-center">
      <h2 className="text-xl text-center font-semibold mb-2">Chọn ô</h2>
      <div className="flex justify-center space-x-4">
        <div className="inline-grid grid-cols-10 gap-2">
          {niches.slice(0, Math.ceil(niches.length / 2)).map((niche) => (
            <div
              key={niche.nicheId}
              onClick={() => {
                setSelectedNiche(niche);
                openModal();
              }}
              className={`p-4 border rounded cursor-pointer text-center flex items-center justify-center ${
                niche.status === "Unavailable"
                  ? "bg-black text-white"
                  : niche.status === "Booked"
                  ? "bg-gray-200"
                  : "bg-white"
              }`}
              style={{ width: "50px", height: "50px" }}
            >
              {niche.nicheNumber}
            </div>
          ))}
        </div>
        <div className="inline-grid grid-cols-10 gap-2">
          {niches.slice(Math.ceil(niches.length / 2)).map((niche) => (
            <div
              key={niche.nicheId}
              onClick={() => {
                setSelectedNiche(niche);
                openModal();
              }}
              className={`p-4 border rounded cursor-pointer text-center flex items-center justify-center ${
                niche.status === "Unavailable"
                  ? "bg-black text-white"
                  : niche.status === "Booked"
                  ? "bg-gray-200"
                  : "bg-white"
              }`}
              style={{ width: "50px", height: "50px" }}
            >
              {niche.nicheNumber}
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
