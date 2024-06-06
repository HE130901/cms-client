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
      <h2 className="text-xl font-semibold mb-2">Select Building</h2>
      <div className="flex justify-center space-x-2">
        {buildings.map((building) => (
          <Button
            key={building.id}
            onClick={() => {
              setSelectedBuilding(building);
              resetSelections();
            }}
            variant={
              selectedBuilding?.id === building.id ? "default" : "outline"
            }
          >
            {building.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default BuildingSelector;
