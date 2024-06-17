"use client";

import exampleImage from "@/assets/images/towersdsd.jpg";
import AreaSelector from "@/components/customer/niche-reservation/AreaSelector";
import BuildingSelector from "@/components/customer/niche-reservation/BuildingSelector";
import FloorSelector from "@/components/customer/niche-reservation/FloorSelector";
import NicheDetails from "@/components/customer/niche-reservation/NicheDetails";
import NicheSelector from "@/components/customer/niche-reservation/NicheSelector";
import { useStateContext } from "@/context/StateContext";
import Image from "next/image";
import { useEffect, useState } from "react";
import ReservationForm from "@/components/customer/niche-reservation/ReservationForm";

const NicheReservationPage = () => {
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

  useEffect(() => {}, [
    fetchBuildings,
    fetchFloors,
    fetchAreas,
    setSelectedBuilding,
    setSelectedFloor,
    setSelectedArea,
  ]);

  useEffect(() => {}, [user]);

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
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
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
        <div className="w-full md:w-1/4 flex items-center justify-center shadow-lg">
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

      <ReservationForm isVisible={isFormVisible} onClose={closeBookingForm} />
    </div>
  );
};

export default NicheReservationPage;
