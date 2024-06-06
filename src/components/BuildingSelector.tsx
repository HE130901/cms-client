"use client";
import React from "react";
import { Button } from "./ui/button";

const buildings = ["Tháp A", "Tháp B"];

const BuildingSelector = ({
  selectedBuilding,
  setSelectedBuilding,
  resetSelections,
}) => (
  <div className="">
    <h2 className="text-xl font-semibold mb-2">Select Building</h2>
    <div className="flex justify-center space-x-2">
      {buildings.map((building, index) => (
        <Button
          key={index}
          onClick={() => {
            setSelectedBuilding(building);
            resetSelections();
          }}
          variant={selectedBuilding === building ? "solid" : "outline"}
        >
          {building}
        </Button>
      ))}
    </div>
  </div>
);

export default BuildingSelector;
