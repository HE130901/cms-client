"use client";
import React from "react";
import { Button } from "@/components/ui/button";

const sections = Array.from({ length: 8 }, (_, i) => i + 1);

const SectionSelector = ({
  selectedSection,
  setSelectedSection,
  resetNiche,
}) => (
  <div className="">
    <h2 className="text-xl font-semibold mb-2">Select Section</h2>
    <div className="flex space-x-2">
      {sections.map((section) => (
        <Button
          key={section}
          onClick={() => {
            setSelectedSection(section);
            resetNiche();
          }}
          variant={selectedSection === section ? "solid" : "outline"}
        >
          Khu {section}
        </Button>
      ))}
    </div>
  </div>
);

export default SectionSelector;
