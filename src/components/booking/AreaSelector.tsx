"use client";

import React, { useEffect } from "react";
import { useStateContext } from "@/context/StateContext";
import { Button } from "@/components/ui/button";

const AreaSelector = () => {
  const {
    selectedBuilding,
    selectedFloor,
    selectedArea,
    setSelectedArea,
    areas,
    fetchAreas,
    resetNiche,
  } = useStateContext();

  useEffect(() => {
    if (selectedBuilding && selectedFloor) {
      fetchAreas(selectedBuilding.buildingId, selectedFloor.floorId);
    }
  }, [selectedBuilding, selectedFloor]);

  return (
    <div>
      <h2 className="text-xl font-semibold text-center mb-2">Chọn khu</h2>
      <div className="flex justify-center space-x-2">
        {areas.map((area) => (
          <Button
            key={area.areaId}
            onClick={() => {
              setSelectedArea(area);
              resetNiche();
            }}
            variant={
              selectedArea?.areaId === area.areaId ? "default" : "outline"
            }
          >
            {area.areaName}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default AreaSelector;
