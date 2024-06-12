"use client";

import React, { useState } from "react";
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
  const { selectedBuilding, selectedFloor, selectedArea, selectedNiche } =
    useStateContext();
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

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
    <div className="container p-4 ">
      <div className="flex mb-6">
        <div className="w-2/3 ">
          <div className="mb-6">
            <BuildingSelector />
          </div>
          {selectedBuilding && (
            <div className="mb-6">
              <FloorSelector />
            </div>
          )}
          {selectedBuilding && selectedFloor && (
            <div className="mb-6">
              <AreaSelector />
            </div>
          )}
        </div>
        <div className="w-1/4 flex items-center justify-center shadow-lg ">
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
