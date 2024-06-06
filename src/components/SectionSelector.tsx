"use client";

import React, { useEffect } from "react";
import { useStateContext } from "../context/StateContext";
import { Button } from "@/components/ui/button";

const SectionSelector = () => {
  const {
    selectedBuilding,
    selectedFloor,
    selectedSection,
    setSelectedSection,
    sections,
    fetchSections,
    resetNiche,
  } = useStateContext();

  useEffect(() => {
    if (selectedBuilding && selectedFloor) {
      fetchSections(selectedBuilding.id, selectedFloor.id);
    }
  }, [selectedBuilding, selectedFloor]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Select Section</h2>
      <div className="flex justify-center space-x-2">
        {sections.map((section) => (
          <Button
            key={section.id}
            onClick={() => {
              setSelectedSection(section);
              resetNiche();
            }}
            variant={selectedSection?.id === section.id ? "default" : "outline"}
          >
            {section.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SectionSelector;
