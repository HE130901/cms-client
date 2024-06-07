// pages/booking/page.tsx
"use client";

import BuildingSelector from "@/components/booking/BuildingSelector";
import FloorSelector from "@/components/booking/FloorSelector";
import NicheSelector from "@/components/booking/NicheSelector";
import SectionSelector from "@/components/booking/SectionSelector";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { useStateContext } from "@/context/StateContext";
import axios from "@/utils/axiosConfig";
import { useState } from "react";
import { toast } from "sonner";

const BookingPage = () => {
  const {
    selectedBuilding,
    selectedFloor,
    selectedSection,
    selectedNiche,
    setNiches,
    niches,
  } = useStateContext();
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cccd: "", // New field for Citizen Identification Number
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = {
      ...formData,
      buildingId: selectedBuilding.id,
      floorId: selectedFloor.id,
      sectionId: selectedSection.id,
      nicheId: selectedNiche.id,
    };

    try {
      await axios.post("/api/booking/submit", dataToSubmit);

      // Update the niche status locally
      const updatedNiches = niches.map((niche) =>
        niche.id === selectedNiche.id ? { ...niche, status: "booked" } : niche
      );
      setNiches(updatedNiches);

      toast.success("Booking submitted successfully", {
        position: "bottom-right",
      });
      setIsFormVisible(false);
      setIsDetailsVisible(false);
    } catch (error) {
      toast.error("Error submitting form. Please try again.", {
        position: "bottom-right",
      });
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Booking</h1>
      <div className="flex justify-center mb-6">
        <BuildingSelector />
      </div>
      {selectedBuilding && (
        <div className="flex justify-center mb-6">
          <FloorSelector />
        </div>
      )}
      {selectedBuilding && selectedFloor && (
        <div className="flex justify-center mb-6">
          <SectionSelector />
        </div>
      )}
      {selectedBuilding && selectedFloor && selectedSection && (
        <div className="flex justify-center">
          <NicheSelector openModal={() => setIsDetailsVisible(true)} />
        </div>
      )}
      <Dialog open={isDetailsVisible} onOpenChange={setIsDetailsVisible}>
        <DialogContent>
          {selectedBuilding &&
            selectedFloor &&
            selectedSection &&
            selectedNiche &&
            !isFormVisible && (
              <div className="mb-4">
                <p className="text-2xl font-bold">Thông tin chi tiết</p>
                <div className="mb-4 pt-4">
                  <p>
                    <strong>Building:</strong> {selectedBuilding.name}
                  </p>
                  <p>
                    <strong>Floor:</strong> {selectedFloor.name}
                  </p>
                  <p>
                    <strong>Section:</strong> {selectedSection.name}
                  </p>
                  <p>
                    <strong>Niche:</strong> {selectedNiche.id}
                  </p>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">
                    Thông tin ô chứa
                  </h3>
                  <p>Kích thước: 30x40 cm</p>
                  <p>Giá niêm yết: 1.000.000đ/ô/năm</p>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    onClick={() => setIsDetailsVisible(false)}
                  >
                    Quay lại
                  </Button>
                  <Button onClick={() => setIsFormVisible(true)}>
                    Tiếp tục
                  </Button>
                </DialogFooter>
              </div>
            )}
          {isFormVisible && (
            <form onSubmit={handleFormSubmit}>
              <p className="text-2xl font-bold">Thông tin đăng ký</p>
              <div className="mb-4 pt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Họ và tên
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Số điện thoại
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Số CCCD
                </label>
                <input
                  type="text"
                  name="cccd"
                  value={formData.cccd}
                  onChange={handleInputChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <DialogFooter>
                <Button type="button" onClick={() => setIsFormVisible(false)}>
                  Quay lại
                </Button>
                <Button type="submit">Xác nhận</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingPage;
