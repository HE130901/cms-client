"use client";

import { useState, useEffect } from "react";
import axios from "../utils/axiosConfig";
import { StateContext } from "./StateContext";

export const StateProvider = ({ children }) => {
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedNiche, setSelectedNiche] = useState(null);
  const [buildings, setBuildings] = useState([]);
  const [floors, setFloors] = useState([]);
  const [sections, setSections] = useState([]);
  const [niches, setNiches] = useState([]);

  const fetchBuildings = async () => {
    try {
      const response = await axios.get("/api/buildings");
      setBuildings(response.data);
    } catch (error) {
      console.error("Error fetching buildings:", error);
    }
  };

  const fetchFloors = async (buildingId) => {
    try {
      const response = await axios.get(`/api/buildings/${buildingId}/floors`);
      setFloors(response.data);
    } catch (error) {
      console.error("Error fetching floors:", error);
    }
  };

  const fetchSections = async (buildingId, floorId) => {
    try {
      const response = await axios.get(
        `/api/buildings/${buildingId}/floors/${floorId}/sections`
      );
      setSections(response.data);
    } catch (error) {
      console.error("Error fetching sections:", error);
    }
  };

  const fetchNiches = async (buildingId, floorId, sectionId) => {
    try {
      const response = await axios.get(
        `/api/buildings/${buildingId}/floors/${floorId}/sections/${sectionId}/niches`
      );
      setNiches(response.data);
    } catch (error) {
      console.error("Error fetching niches:", error);
    }
  };

  const resetSelections = () => {
    setSelectedFloor(null);
    setSelectedSection(null);
    setSelectedNiche(null);
  };

  const resetSectionAndNiche = () => {
    setSelectedSection(null);
    setSelectedNiche(null);
  };

  const resetNiche = () => {
    setSelectedNiche(null);
  };

  return (
    <StateContext.Provider
      value={{
        selectedBuilding,
        setSelectedBuilding,
        selectedFloor,
        setSelectedFloor,
        selectedSection,
        setSelectedSection,
        selectedNiche,
        setSelectedNiche,
        buildings,
        floors,
        sections,
        niches,
        fetchBuildings,
        fetchFloors,
        fetchSections,
        fetchNiches,
        resetSelections,
        resetSectionAndNiche,
        resetNiche,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
