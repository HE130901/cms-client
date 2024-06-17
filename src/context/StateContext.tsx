"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "@/utils/axiosConfig";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
  const [reservations, setReservations] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchCurrentUser(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchCurrentUser = async (token) => {
    try {
      const response = await axios.get("/api/auth/get-current-user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { customerId, fullName, citizenId, role, email, phone, address } =
        response.data;

      setUser({
        customerId: String(customerId),
        fullName: String(fullName),
        citizenId: String(citizenId),
        role: String(role),
        email: String(email),
        phone: String(phone),
        address: String(address),
        token,
      });

      if (role === "Guest" || role === "Customer") {
        router.push("/dashboard");
      } else if (role === "Staff" || role === "Manager") {
        router.push("/staff-dashboard");
      }
    } catch (error) {
      console.error("Error fetching current user:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      const { token, role } = response.data;
      localStorage.setItem("token", token);
      await fetchCurrentUser(token);

      if (role === "Guest" || role === "Customer") {
        router.push("/dashboard");
      } else if (role === "Staff" || role === "Manager") {
        router.push("/staff-dashboard");
      }
      toast.success("Login successful!");
    } catch (error) {
      console.error("Login failed", error);
      toast.error("Login failed. Please check your login information.");
    }
  };

  const register = async (formData) => {
    try {
      await axios.post("/api/auth/register", formData);
      router.push("/auth/login");
      toast.success("Registration successful.");
    } catch (error) {
      console.error("Registration failed", error);
      toast.error("Registration failed. Please try again later.");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/");
  };

  const fetchBuildings = async () => {
    try {
      const response = await axios.get("/api/buildings");
      setBuildings(response.data.$values);
    } catch (error) {
      console.error("Error fetching buildings:", error);
    }
  };

  const fetchFloors = async (buildingId) => {
    try {
      const response = await axios.get(`/api/buildings/${buildingId}/floors`);
      setFloors(response.data.$values);
    } catch (error) {
      console.error("Error fetching floors:", error);
    }
  };

  const fetchAreas = async (buildingId, floorId) => {
    try {
      const response = await axios.get(
        `/api/buildings/${buildingId}/floors/${floorId}/areas`
      );
      setAreas(response.data.$values);
    } catch (error) {
      console.error("Error fetching areas:", error);
    }
  };

  const fetchNiches = async (buildingId, floorId, areaId) => {
    try {
      const response = await axios.get(
        `/api/buildings/${buildingId}/floors/${floorId}/areas/${areaId}/niches`
      );
      setNiches(response.data.$values);
    } catch (error) {
      console.error("Error fetching niches:", error);
    }
  };

  const fetchReservations = async (customerId) => {
    try {
      const response = await axios.get(
        `/api/NicheReservations/Customer/${customerId}`
      );
      setReservations(response.data.$values);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  const deleteReservation = async (reservationId) => {
    try {
      await axios.delete(`/api/NicheReservations/${reservationId}`);
      setReservations((prevReservations) =>
        prevReservations.filter(
          (reservation) => reservation.reservationId !== reservationId
        )
      );
      toast.success("Reservation deleted successfully!");
    } catch (error) {
      console.error("Error deleting reservation:", error);
      toast.error("Failed to delete the reservation.");
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
        setBuildings,
        floors,
        setFloors,
        areas,
        setAreas,
        niches,
        setNiches,
        reservations,
        setReservations,
        fetchBuildings,
        fetchFloors,
        fetchAreas,
        fetchNiches,
        fetchReservations,
        deleteReservation,
        resetSelections,
        resetSectionAndNiche,
        resetNiche,
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
