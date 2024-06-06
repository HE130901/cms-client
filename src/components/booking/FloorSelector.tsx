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
      fetchFloors(selectedBuilding.id);
    }
  }, [selectedBuilding]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Select Floor</h2>
      <div className="flex justify-center space-x-2">
        {floors.map((floor) => (
          <Button
            key={floor.id}
            onClick={() => {
              setSelectedFloor(floor);
              resetSectionAndNiche();
            }}
            variant={selectedFloor?.id === floor.id ? "default" : "outline"}
          >
            {floor.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default FloorSelector;
