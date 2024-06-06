"use client";
import React from "react";
import { Button } from "./ui/button";

const floors = [1, 2, 3, 4, 5, 6, 7];

const FloorSelector = ({
  selectedFloor,
  setSelectedFloor,
  resetSectionAndNiche,
}) => (
  <div className="">
    <h2 className="text-xl font-semibold mb-2">Select Floor</h2>
    <div className="flex space-x-2">
      {floors.map((floor) => (
        <Button
          key={floor}
          onClick={() => {
            setSelectedFloor(floor);
            resetSectionAndNiche();
          }}
          variant={selectedFloor === floor ? "solid" : "outline"}
        >
          Tầng {floor}
        </Button>
      ))}
    </div>
  </div>
);

export default FloorSelector;
