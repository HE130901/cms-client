"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "./ui/button";

const BuildingSelector = ({
  selectedBuilding,
  setSelectedBuilding,
  resetSelections,
}) => {
  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    // Fetch buildings from the backend
    axios
      .get("/api/buildings")
      .then((response) => {
        setBuildings(response.data);
      })
      .catch((error) => console.error("Error fetching buildings:", error));
  }, []);

  return (
    <div className="">
      <h2 className="text-xl font-semibold mb-2">Select Building</h2>
      <div className="flex justify-center space-x-2">
        {buildings.map((building, index) => (
          <Button
            key={index}
            onClick={() => {
              setSelectedBuilding(building.name);
              resetSelections();
            }}
            variant={selectedBuilding === building.name ? "solid" : "outline"}
          >
            {building.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default BuildingSelector;
