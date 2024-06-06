"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "./ui/button";

const FloorSelector = ({
  selectedBuilding,
  selectedFloor,
  setSelectedFloor,
  resetSectionAndNiche,
}) => {
  const [floors, setFloors] = useState([]);

  useEffect(() => {
    if (selectedBuilding) {
      axios
        .get(`/api/buildings/${selectedBuilding}/floors`)
        .then((response) => setFloors(response.data))
        .catch((error) => console.error("Error fetching floors:", error));
    }
  }, [selectedBuilding]);

  return (
    <div className="">
      <h2 className="text-xl font-semibold mb-2">Select Floor</h2>
      <div className="flex justify-center space-x-2">
        {floors.map((floor) => (
          <Button
            key={floor.id}
            onClick={() => {
              setSelectedFloor(floor.id);
              resetSectionAndNiche();
            }}
            variant={selectedFloor === floor.id ? "solid" : "outline"}
          >
            {floor.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default FloorSelector;
