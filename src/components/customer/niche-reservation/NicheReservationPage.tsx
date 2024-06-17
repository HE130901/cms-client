"use client";

import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import AreaSelector from "@/components/customer/niche-reservation/AreaSelector";
import BuildingSelector from "@/components/customer/niche-reservation/BuildingSelector";
import FloorSelector from "@/components/customer/niche-reservation/FloorSelector";
import NicheDetails from "@/components/customer/niche-reservation/NicheDetails";
import NicheSelector from "@/components/customer/niche-reservation/NicheSelector";
import ReservationForm from "@/components/customer/niche-reservation/ReservationForm";
import { useStateContext } from "@/context/StateContext";

import { CarouselPlugin } from "@/components/ui/carouselPlugin"; // Adjust the import path if necessary

const NicheReservationPage = () => {
  const {
    selectedBuilding,
    selectedFloor,
    selectedArea,
    selectedNiche,
    fetchBuildings,
    fetchFloors,
    fetchAreas,
    fetchNiches,
    buildings,
    floors,
    areas,
  } = useStateContext();

  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [loadingBuildings, setLoadingBuildings] = useState(true);
  const [loadingFloors, setLoadingFloors] = useState(true);
  const [loadingAreas, setLoadingAreas] = useState(true);
  const [loadingNicheSelector, setLoadingNicheSelector] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await fetchBuildings();
      setLoadingBuildings(false);

      if (selectedBuilding) {
        await fetchFloors(selectedBuilding.buildingId);
        setLoadingFloors(false);
      }

      if (selectedBuilding && selectedFloor) {
        await fetchAreas(selectedBuilding.buildingId, selectedFloor.floorId);
        setLoadingAreas(false);
      }

      setLoadingNicheSelector(false);
    };

    fetchData();
  }, [
    fetchBuildings,
    fetchFloors,
    fetchAreas,
    selectedBuilding,
    selectedFloor,
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
    fetchNiches(
      selectedBuilding.buildingId,
      selectedFloor.floorId,
      selectedArea.areaId
    );
    setIsFormVisible(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <div>
            {loadingBuildings ? <Skeleton height={50} /> : <BuildingSelector />}
          </div>
          <div>
            {loadingFloors ? <Skeleton height={50} /> : <FloorSelector />}
          </div>
          <div>
            {loadingAreas ? <Skeleton height={50} /> : <AreaSelector />}
          </div>
        </div>
        <div className="w-full md:w-1/3 flex items-center justify-center shadow-lg rounded-lg overflow-hidden hidden md:flex">
          <CarouselPlugin />
        </div>
      </div>
      {selectedBuilding && selectedFloor && selectedArea && (
        <div className="flex justify-center my-6">
          {loadingNicheSelector ? (
            <Skeleton height={50} width={200} />
          ) : (
            <NicheSelector openModal={openDetailsModal} />
          )}
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
