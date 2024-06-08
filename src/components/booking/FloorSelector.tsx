"use client";

import React, { useEffect } from "react";
import { useStateContext } from "@/context/StateContext";
import { Button } from "@/components/ui/button";

const FloorSelector = () => {
  const {
    selectedBuilding,
    selectedFloor,
    setSelectedFloor,
    floors,
    fetchFloors,
    resetSectionAndNiche,
  } = useStateContext();

  useEffect(() => {
    if (selectedBuilding) {
      fetchFloors(selectedBuilding.buildingId);
    }
  }, [selectedBuilding]);

  return (
    <div>
      <h2 className="text-xl font-semibold text-center mb-2">Chọn tầng</h2>
      <div className="flex justify-center space-x-2">
        {floors.map((floor) => (
          <Button
            key={floor.floorId}
            onClick={() => {
              setSelectedFloor(floor);
              resetSectionAndNiche();
            }}
            variant={
              selectedFloor?.floorId === floor.floorId ? "default" : "outline"
            }
          >
            {floor.floorName}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default FloorSelector;
