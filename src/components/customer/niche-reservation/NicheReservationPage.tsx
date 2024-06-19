"use client";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import CombinedSelector from "@/components/customer/niche-reservation/CombinedSelector";
import NicheDetails from "@/components/customer/niche-reservation/NicheDetails";
import NicheSelector from "@/components/customer/niche-reservation/NicheSelector";
import ReservationForm from "@/components/customer/niche-reservation/ReservationForm";
import { useStateContext } from "@/context/StateContext";

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
    fetchReservations,
    buildings,
    floors,
    areas,
    user,
  } = useStateContext();

  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nicheLoading, setNicheLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await fetchBuildings();
      setLoading(false);
    };

    fetchData();
  }, [fetchBuildings]);

  useEffect(() => {
    if (selectedBuilding && selectedFloor && selectedArea) {
      setNicheLoading(true);
      fetchNiches(
        selectedBuilding.buildingId,
        selectedFloor.floorId,
        selectedArea.areaId
      ).then(() => setNicheLoading(false));
    }
  }, [selectedBuilding, selectedFloor, selectedArea, fetchNiches]);

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
    if (user && user.customerId) {
      fetchReservations(user.customerId);
    }
  };

  return (
    <div className="flex px-44">
      <div className="p-4 w-1/6 pt-8">
        <h1 className="text-2xl font-bold">Tìm kiếm</h1>
        <div className="pt-4">
          {loading ? <Skeleton height={50} /> : <CombinedSelector />}
        </div>
      </div>
      <div className="p-4 w-5/6">
        {selectedBuilding && selectedFloor && selectedArea && (
          <div className="flex justify-center my-6">
            {nicheLoading ? (
              <Skeleton height={200} width={1200} />
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
    </div>
  );
};

export default NicheReservationPage;
