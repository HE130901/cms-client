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

  const [isDetailsVisible, setIsDetailsVisible] = useState(false); // Define the state variable
  const [isFormVisible, setIsFormVisible] = useState(false); // Define the state variable
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await fetchBuildings();
      setLoading(false);
    };

    fetchData();
  }, [fetchBuildings]);

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
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-6">
          {/* Using the combined selector */}
          <div>{loading ? <Skeleton height={50} /> : <CombinedSelector />}</div>
        </div>
      </div>
      {selectedBuilding && selectedFloor && selectedArea && (
        <div className="flex justify-center my-6">
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
