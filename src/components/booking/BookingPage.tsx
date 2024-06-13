"use client";

import React, { useEffect, useState } from "react";
import AreaSelector from "@/components/booking/AreaSelector";
import BuildingSelector from "@/components/booking/BuildingSelector";
import FloorSelector from "@/components/booking/FloorSelector";
import NicheSelector from "@/components/booking/NicheSelector";
import NicheDetails from "@/components/booking/NicheDetails";
import BookingForm from "@/components/booking/BookingForm";
import { useStateContext } from "@/context/StateContext";
import Image from "next/image";
import exampleImage from "@/assets/images/towersdsd.jpg"; // Adjust the path to your image accordingly

const BookingPage = () => {
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
  } = useStateContext();
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

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

export default BookingPage;
