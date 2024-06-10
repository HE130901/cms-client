"use client";

import React, { useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useStateContext } from "@/context/StateContext";
import axios from "@/utils/axiosConfig";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const bookingSchema = z.object({
  customerName: z.string().min(1, "Tên của bạn là bắt buộc"),
  recipientFullname: z
    .string()
    .min(1, "Tên của người được đặt ô chứa là bắt buộc"),
  recipientCitizenId: z
    .string()
    .min(1, "Số CCCD là bắt buộc")
    .refine(
      async (val) => {
        try {
          const response = await axios.get(`/api/Recipients/check-citizen-id`, {
            params: { citizenId: val },
          });
          return !response.data.exists;
        } catch (error) {
          console.error("Error checking citizen ID:", error);
          return false;
        }
      },
      {
        message: "Số CCCD này đã tồn tại trong cơ sở dữ liệu.",
      }
    ),
  recipientDOB: z.string().refine(
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
  buyerCitizenId: z.string().min(1, "Số CCCD của người mua là bắt buộc"),
  rentalPeriod: z
    .number()
    .int()
    .min(1, "Thời gian thuê tối thiểu là 1 năm")
    .max(10, "Thời gian thuê tối đa là 10 năm"),
  contractDate: z.string().refine(
    (val) => {
      const contractDate = new Date(val);
      const today = new Date();
      const oneMonthLater = new Date(today);
      oneMonthLater.setMonth(today.getMonth() + 1);
      return contractDate >= today && contractDate <= oneMonthLater;
    },
    {
      message:
        "Ngày hẹn ký hợp đồng phải trong vòng 1 tháng kể từ ngày hiện tại.",
    }
  ),
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
    user,
  } = useStateContext();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingSchema),
  });

  useEffect(() => {
    if (user) {
      setValue("customerName", user.fullName);
      setValue("buyerCitizenId", user.citizenId);
    }
  }, [setValue, user]);

  const onSubmit = async (data) => {
    const dataToSubmit = {
      customerName: String(data.customerName),
      recipientFullname: String(data.recipientFullname),
      recipientCitizenId: String(data.recipientCitizenId),
      recipientDOB: new Date(data.recipientDOB).toISOString().split("T")[0],
      buyerCitizenId: String(data.buyerCitizenId),
      rentalPeriod: data.rentalPeriod,
      contractDate: new Date(data.contractDate).toISOString().split("T")[0],
      buildingId: selectedBuilding?.buildingId,
      floorId: selectedFloor?.floorId,
      areaId: selectedArea?.areaId,
      nicheId: selectedNiche?.nicheId,
      status: "Pending",
      reservationDate: new Date().toISOString().split("T")[0],
    };

    console.log("Submitting data:", dataToSubmit);

    try {
      await makeNicheReservation(dataToSubmit);
      const updatedNiches = niches.map((niche) =>
        niche.nicheId === selectedNiche.nicheId
          ? { ...niche, status: "booked" }
          : niche
      );
      setNiches(updatedNiches);

      onClose();
      toast.success("Reservation created successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
        if (error.response.data.errors) {
          Object.entries(error.response.data.errors).forEach(([key, value]) => {
            toast.error(`${key}: ${value}`);
          });
        } else {
          toast.error(
            `Failed to create reservation: ${error.response.data.message}`
          );
        }
      } else {
        toast.error("Failed to create reservation.");
      }
    }
  };

  return (
    <Dialog open={isVisible} onOpenChange={onClose}>
      <DialogContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 bg-white rounded"
        >
          <h2 className="text-xl font-bold mb-4">Đăng ký đặt chỗ</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Tên của người mua
            </label>
            <input
              type="text"
              {...register("customerName")}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
              readOnly
            />
            {errors.customerName && (
              <p className="mt-2 text-sm text-red-600">
                {errors.customerName.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Số CCCD của người mua
            </label>
            <input
              type="text"
              {...register("buyerCitizenId")}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
              readOnly
            />
            {errors.buyerCitizenId && (
              <p className="mt-2 text-sm text-red-600">
                {errors.buyerCitizenId.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Tên của người nhận ô chứa
            </label>
            <input
              type="text"
              {...register("recipientFullname")}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
            {errors.recipientFullname && (
              <p className="mt-2 text-sm text-red-600">
                {errors.recipientFullname.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Số CCCD của người nhận ô chứa
            </label>
            <input
              type="text"
              {...register("recipientCitizenId")}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
            {errors.recipientCitizenId && (
              <p className="mt-2 text-sm text-red-600">
                {errors.recipientCitizenId.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Ngày sinh của người nhận ô chứa
            </label>
            <input
              type="date"
              {...register("recipientDOB")}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
            {errors.recipientDOB && (
              <p className="mt-2 text-sm text-red-600">
                {errors.recipientDOB.message}
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
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Ngày hẹn ký hợp đồng
            </label>
            <input
              type="date"
              {...register("contractDate")}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
            {errors.contractDate && (
              <p className="mt-2 text-sm text-red-600">
                {errors.contractDate.message}
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
