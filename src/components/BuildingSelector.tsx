"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosConfig"; // Import the new axios instance
import { Button } from "./ui/button";

const BuildingSelector = ({
  selectedBuilding,
  setSelectedBuilding,
  resetSelections,
}) => {
  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    // Fetch buildings from the backend
    axiosInstance
      .get("/Buildings")
      .then((response) => {
        setBuildings(response.data);
      })
      .catch((error) => console.error("Error fetching buildings:", error));
  }, []);

  return (
    <div className="">
      <h2 className="text-xl font-semibold mb-2">Select Building</h2>
      <div className="flex justify-center space-x-2">
        {buildings.map((building) => (
          <Button
            key={building.id}
            onClick={() => {
              setSelectedBuilding(building.id);
              resetSelections();
            }}
            variant={selectedBuilding === building.id ? "solid" : "outline"}
          >
            {building.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default BuildingSelector;
