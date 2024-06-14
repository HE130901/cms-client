"use client";

import React, { useEffect, useState } from "react";
import AreaSelector from "@/components/customer/niche-reservation/AreaSelector";
import BuildingSelector from "@/components/customer/niche-reservation/BuildingSelector";
import FloorSelector from "@/components/customer/niche-reservation/FloorSelector";
import NicheSelector from "@/components/customer/niche-reservation/NicheSelector";
import NicheDetails from "@/components/customer/niche-reservation/NicheDetails";
import BookingForm from "@/components/customer/niche-reservation/BookingForm";
import { useStateContext } from "@/context/StateContext";
import Image from "next/image";
import exampleImage from "@/assets/images/towersdsd.jpg"; // Adjust the path to your image accordingly
import axios from "@/utils/axiosConfig";
import { toast } from "sonner";

const NicheBookingPage = () => {
  const {
    selectedBuilding,
    setSelectedBuilding,
    selectedFloor,
    setSelectedFloor,
    selectedArea,
    setSelectedArea,
    selectedNiche,
    fetchBuildings,
    fetchFloors,
    fetchAreas,
    user,
  } = useStateContext();

  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const initializeSelection = async () => {
      try {
        const buildings = await fetchBuildings();
        if (buildings && buildings.length > 0) {
          const defaultBuilding =
            buildings.find((building) => building.name === "Nhà 1") ||
            buildings[0];
          setSelectedBuilding(defaultBuilding);

          const floors = await fetchFloors(defaultBuilding.buildingId);
          if (floors && floors.length > 0) {
            const defaultFloor =
              floors.find((floor) => floor.name === "Tầng 1") || floors[0];
            setSelectedFloor(defaultFloor);

            const areas = await fetchAreas(
              defaultBuilding.buildingId,
              defaultFloor.floorId
            );
            if (areas && areas.length > 0) {
              const defaultArea =
                areas.find((area) => area.name === "Khu 1") || areas[0];
              setSelectedArea(defaultArea);
            }
          }
        }
      } catch (error) {
        console.error("Error initializing selection:", error);
      }
    };

    initializeSelection();
  }, [
    fetchBuildings,
    fetchFloors,
    fetchAreas,
    setSelectedBuilding,
    setSelectedFloor,
    setSelectedArea,
  ]);

  useEffect(() => {
    if (user) {
      fetchReservations(user.customerId);
    }
  }, [user]);

  const fetchReservations = async (customerId) => {
    try {
      const response = await axios.get(
        `/api/NicheReservations/customer/${customerId}`
      );
      setReservations(response.data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  const openDetailsModal = () => {
    setIsDetailsVisible(true);
  };

  const closeDetailsModal = () => {
    setIsDetailsVisible(false);
  };

  const openBookingForm = () => {
    setIsDetailsVisible(false);
    setIsFormVisible(true);
  };

  const closeBookingForm = () => {
    setIsFormVisible(false);
    fetchReservations(user.customerId); // Refresh the reservations list
  };

  return (
    <div className="container">
      <div className="flex mb-6">
        <div className="w-2/3">
          <div className="mb-6 text-center">
            <BuildingSelector />
          </div>
          {selectedBuilding && (
            <div className="mb-6 text-center">
              <FloorSelector />
            </div>
          )}
          {selectedBuilding && selectedFloor && (
            <div className="mb-6 text-center">
              <AreaSelector />
            </div>
          )}
        </div>
        <div className="w-1/4 flex items-center justify-center shadow-lg">
          <Image
            src={exampleImage}
            alt="Example Image"
            layout="responsive"
            className="rounded-md shadow-lg"
          />
        </div>
      </div>
      {selectedBuilding && selectedFloor && selectedArea && (
        <div className="flex justify-center mb-6">
          <NicheSelector openModal={openDetailsModal} />
        </div>
      )}
      <NicheDetails
        isVisible={isDetailsVisible}
        onClose={closeDetailsModal}
        selectedBuilding={selectedBuilding}
        selectedFloor={selectedFloor}
        selectedArea={selectedArea}
        selectedNiche={selectedNiche}
        onBook={openBookingForm}
      />
      <BookingForm isVisible={isFormVisible} onClose={closeBookingForm} />
    </div>
  );
};

export default NicheBookingPage;
