"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useStateContext } from "@/context/StateContext";
import axios from "@/utils/axiosConfig";
import { toast } from "sonner";

const BookingForm = ({ isVisible, onClose }) => {
  const {
    selectedBuilding,
    selectedFloor,
    selectedArea,
    selectedNiche,
    setNiches,
    niches,
  } = useStateContext();
  const [formData, setFormData] = useState({
    customerName: "",
    deceasedName: "",
    deceasedDOB: "",
    rentalPeriod: "",
    reservationDate: new Date().toISOString().slice(0, 10),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      return age - 1;
    }
    return age;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const age = calculateAge(formData.deceasedDOB);
    if (age < 60) {
      toast.error("Người được đặt ô chứa phải trên 60 tuổi.", {
        position: "bottom-right",
      });
      return;
    }

    const rentalYears = parseInt(formData.rentalPeriod, 10);
    if (rentalYears > 10) {
      toast.error("Thời gian thuê tối đa là 10 năm.", {
        position: "bottom-right",
      });
      return;
    }

    const dataToSubmit = {
      ...formData,
      buildingId: selectedBuilding?.buildingId,
      floorId: selectedFloor?.floorId,
      areaId: selectedArea?.areaId,
      nicheId: selectedNiche?.nicheId,
      status: "Pending",
    };

    try {
      await axios.post("/api/niche-reservations", dataToSubmit);

      // Update the niche status locally
      const updatedNiches = niches.map((niche) =>
        niche.nicheId === selectedNiche.nicheId
          ? { ...niche, status: "booked" }
          : niche
      );
      setNiches(updatedNiches);

      toast.success("Booking submitted successfully", {
        position: "bottom-right",
      });
      onClose();
    } catch (error) {
      toast.error("Error submitting form. Please try again.", {
        position: "bottom-right",
      });
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Dialog open={isVisible} onOpenChange={onClose}>
      <DialogContent>
        <form onSubmit={handleFormSubmit} className="p-4 bg-white rounded ">
          <h2 className="text-xl font-bold mb-4">Đăng ký đặt chỗ</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Tên của bạn
            </label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Tên của người được đặt ô chứa
            </label>
            <input
              type="text"
              name="deceasedName"
              value={formData.deceasedName}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Số CCCD của người được đặt ô chứa
            </label>
            <input
              type="text"
              name="deceasedCitizenId"
              value={formData.deceasedCitizenId}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Ngày sinh của người được đặt ô chứa
            </label>
            <input
              type="date"
              name="deceasedDOB"
              value={formData.deceasedDOB}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Thời gian thuê (năm)
            </label>
            <input
              type="number"
              name="rentalPeriod"
              value={formData.rentalPeriod}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
              min="1"
              max="10"
            />
          </div>

          <div className="flex justify-end">
            <Button type="button" onClick={onClose}>
              Quay lại
            </Button>
            <Button type="submit" className="ml-2">
              Xác nhận
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingForm;
