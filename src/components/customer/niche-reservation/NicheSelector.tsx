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

  // Sort the niches based on their names or IDs to ensure they are displayed in the correct order
  const sortedNiches = [...niches].sort((a, b) => {
    const aName = parseInt(a.nicheName, 10);
    const bName = parseInt(b.nicheName, 10);
    return aName - bName;
  });

  // Group niches into rows, assuming each row has 20 niches
  const rows = [];
  const nichesPerRow = 20;
  for (let i = 0; i < sortedNiches.length; i += nichesPerRow) {
    rows.push(sortedNiches.slice(i, i + nichesPerRow));
  }

  // Create a mapping for floor labels
  const floorLabels = {
    0: "Tầng 5",
    1: "Tầng 4",
    2: "Tầng 3",
    3: "Tầng 2",
    4: "Tầng 1",
  };

  return (
    <div className="text-center bg-orange-200 px-8 py-4 rounded-md">
      <h2 className="text-xl text-center font-bold mb-2 pb-4">
        {selectedBuilding?.buildingName} - {selectedFloor?.floorName} -{" "}
        {selectedArea?.areaName}
      </h2>
      <div className="flex flex-col items-center space-y-4">
        {rows.reverse().map((row, rowIndex) => (
          <div key={rowIndex} className="flex space-x-2">
            <div className="flex items-center justify-center font-semibold pr-4">
              {floorLabels[rowIndex]}
            </div>
            {row.map((niche) => (
              <div
                key={niche.nicheId}
                onClick={() => {
                  if (niche.status === "Available") {
                    setSelectedNiche(niche);
                    openModal();
                  }
                }}
                className={`p-2 border rounded-md cursor-pointer transform transition-transform ${
                  niche.status === "unavailable"
                    ? "bg-black text-white cursor-not-allowed"
                    : niche.status === "Booked"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-white border hover:bg-orange-300 hover:scale-105"
                }`}
              >
                <div>{niche.nicheName}</div>
              </div>
            ))}
          </div>
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
          <div className="w-4 h-4 bg-gray-400"></div>
          <span>Đang được đặt</span>
        </div>
      </div>
    </div>
  );
};

export default NicheSelector;
