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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const bookingSchema = z.object({
  customerName: z.string().min(1, "Tên của bạn là bắt buộc"),
  deceasedName: z.string().min(1, "Tên của người được đặt ô chứa là bắt buộc"),
  deceasedCitizenId: z.string().min(1, "Số CCCD là bắt buộc"),
  deceasedDOB: z.string().refine(
    (val) => {
      const birthDate = new Date(val);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 60;
    },
    {
      message: "Người được đặt ô chứa phải trên 60 tuổi.",
    }
  ),
  rentalPeriod: z
    .number()
    .int()
    .min(1, "Thời gian thuê tối thiểu là 1 năm")
    .max(10, "Thời gian thuê tối đa là 10 năm"),
});

const BookingForm = ({ isVisible, onClose }) => {
  const {
    selectedBuilding,
    selectedFloor,
    selectedArea,
    selectedNiche,
    setNiches,
    niches,
    makeNicheReservation,
  } = useStateContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data) => {
    const dataToSubmit = {
      ...data,
      buildingId: selectedBuilding?.buildingId,
      floorId: selectedFloor?.floorId,
      areaId: selectedArea?.areaId,
      nicheId: selectedNiche?.nicheId,
      status: "Pending",
      reservationDate: new Date().toISOString().slice(0, 10),
    };

    try {
      await makeNicheReservation(dataToSubmit);

      // Update the niche status locally
      const updatedNiches = niches.map((niche) =>
        niche.nicheId === selectedNiche.nicheId
          ? { ...niche, status: "booked" }
          : niche
      );
      setNiches(updatedNiches);

      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Dialog open={isVisible} onOpenChange={onClose}>
      <DialogContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 bg-white rounded "
        >
          <h2 className="text-xl font-bold mb-4">Đăng ký đặt chỗ</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Tên của bạn
            </label>
            <input
              type="text"
              {...register("customerName")}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
            {errors.customerName && (
              <p className="mt-2 text-sm text-red-600">
                {errors.customerName.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Tên của người được đặt ô chứa
            </label>
            <input
              type="text"
              {...register("deceasedName")}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
            {errors.deceasedName && (
              <p className="mt-2 text-sm text-red-600">
                {errors.deceasedName.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Số CCCD của người được đặt ô chứa
            </label>
            <input
              type="text"
              {...register("deceasedCitizenId")}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
            {errors.deceasedCitizenId && (
              <p className="mt-2 text-sm text-red-600">
                {errors.deceasedCitizenId.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Ngày sinh của người được đặt ô chứa
            </label>
            <input
              type="date"
              {...register("deceasedDOB")}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
            {errors.deceasedDOB && (
              <p className="mt-2 text-sm text-red-600">
                {errors.deceasedDOB.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Thời gian thuê (năm)
            </label>
            <input
              type="number"
              {...register("rentalPeriod", { valueAsNumber: true })}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
              min="1"
              max="10"
            />
            {errors.rentalPeriod && (
              <p className="mt-2 text-sm text-red-600">
                {errors.rentalPeriod.message}
              </p>
            )}
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
