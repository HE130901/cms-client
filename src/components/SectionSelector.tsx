"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "./ui/button";

const SectionSelector = ({
  selectedBuilding,
  selectedFloor,
  selectedSection,
  setSelectedSection,
  resetNiche,
}) => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    if (selectedBuilding && selectedFloor) {
      axios
        .get(
          `/api/buildings/${selectedBuilding}/floors/${selectedFloor}/sections`
        )
        .then((response) => setSections(response.data))
        .catch((error) => console.error("Error fetching sections:", error));
    }
  }, [selectedBuilding, selectedFloor]);

  return (
    <div className="">
      <h2 className="text-xl font-semibold mb-2">Select Section</h2>
      <div className="flex justify-center space-x-2">
        {sections.map((section) => (
          <Button
            key={section.id}
            onClick={() => {
              setSelectedSection(section.id);
              resetNiche();
            }}
            variant={selectedSection === section.id ? "solid" : "outline"}
          >
            {section.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SectionSelector;
