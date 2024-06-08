"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "@/utils/axiosConfig";
import { useRouter } from "next/navigation";

const StateContext = createContext(null);

export const useStateContext = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useStateContext must be used within a StateProvider");
  }
  return context;
};

export const StateProvider = ({ children }) => {
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedNiche, setSelectedNiche] = useState(null);
  const [buildings, setBuildings] = useState([]);
  const [floors, setFloors] = useState([]);
  const [areas, setAreas] = useState([]);
  const [niches, setNiches] = useState([]);
  const [user, setUser] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token });
    }
  }, []);

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

  const fetchAreas = async (buildingId, floorId) => {
    try {
      const response = await axios.get(
        `/api/buildings/${buildingId}/floors/${floorId}/areas`
      );
      setAreas(response.data);
    } catch (error) {
      console.error("Error fetching areas:", error);
    }
  };

  const fetchNiches = async (buildingId, floorId, areaId) => {
    try {
      const response = await axios.get(
        `/api/buildings/${buildingId}/floors/${floorId}/areas/${areaId}/niches`
      );
      setNiches(response.data);
    } catch (error) {
      console.error("Error fetching niches:", error);
    }
  };

  const resetSelections = () => {
    setSelectedFloor(null);
    setSelectedArea(null);
    setSelectedNiche(null);
  };

  const resetSectionAndNiche = () => {
    setSelectedArea(null);
    setSelectedNiche(null);
  };

  const resetNiche = () => {
    setSelectedNiche(null);
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      const { token } = response.data;
      localStorage.setItem("token", token);
      setUser({ token });
      router.push("/booking");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const register = async (formData) => {
    try {
      await axios.post("/api/auth/register", formData);
      router.push("/auth/login");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/");
  };

  return (
    <StateContext.Provider
      value={{
        selectedBuilding,
        setSelectedBuilding,
        selectedFloor,
        setSelectedFloor,
        selectedArea,
        setSelectedArea,
        selectedNiche,
        setSelectedNiche,
        buildings,
        floors,
        areas,
        niches,
        fetchBuildings,
        fetchFloors,
        fetchAreas,
        fetchNiches,
        resetSelections,
        resetSectionAndNiche,
        resetNiche,
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
