"use client";

import React, { useEffect } from "react";
import { useStateContext } from "@/context/StateContext";
import { Button } from "@/components/ui/button";

const BuildingSelector = () => {
  const {
    selectedBuilding,
    setSelectedBuilding,
    buildings,
    fetchBuildings,
    resetSelections,
  } = useStateContext();

  useEffect(() => {
    fetchBuildings();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold text-center mb-2">Chọn tòa nhà</h2>
      <div className="flex justify-center space-x-2">
        {buildings.map((building) => (
          <Button
            key={building.buildingId}
            onClick={() => {
              setSelectedBuilding(building);
              resetSelections();
            }}
            variant={
              selectedBuilding?.buildingId === building.buildingId
                ? "default"
                : "outline"
            }
          >
            {building.buildingName}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default BuildingSelector;
