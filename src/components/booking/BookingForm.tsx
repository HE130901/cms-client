import React, { useEffect, useState } from "react";
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
  customerPhone: z.string().min(1, "Số điện thoại của bạn là bắt buộc"),
  customerAddress: z.string().min(1, "Địa chỉ của bạn là bắt buộc"),
  contractDate: z.string().refine(
    (val) => {
      const contractDate = new Date(val);
      const today = new Date();
      const sevenDaysLater = new Date(today);
      sevenDaysLater.setDate(today.getDate() + 7);
      return contractDate >= today && contractDate <= sevenDaysLater;
    },
    {
      message:
        "Ngày hẹn ký hợp đồng phải trong vòng 7 ngày kể từ ngày hiện tại.",
    }
  ),
});

const BookingForm = ({ isVisible, onClose }) => {
  const { selectedBuilding, selectedFloor, selectedArea, selectedNiche, user } =
    useStateContext();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingSchema),
  });

  const [reservationDetails, setReservationDetails] = useState(null);

  useEffect(() => {
    if (user) {
      setValue("customerName", user.fullName);
      setValue("customerPhone", user.phone);
      setValue("customerAddress", user.address);
      setValue("contractDate", new Date().toISOString().split("T")[0]);
    }
  }, [setValue, user]);

  const onSubmit = async (data) => {
    const dataToSubmit = {
      customerID: user.customerId, // Ensure this matches the user data
      nicheID: selectedNiche?.nicheId,
      confirmationDate: data.contractDate,
    };

    console.log("Submitting data:", dataToSubmit);

    try {
      const response = await axios.post("/api/NicheReservations", dataToSubmit);
      const reservation = response.data;
      setReservationDetails(reservation);

      toast.success("Đặt ô chứa thành công!");
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
        if (error.response.data.errors) {
          Object.entries(error.response.data.errors).forEach(([key, value]) => {
            toast.error(`${key}: ${value}`);
          });
        } else {
          toast.error(`Bạn chỉ được đặt duy nhất 1 ô chứa!`);
        }
      } else {
        toast.error("Failed to create reservation.");
      }
    }
  };

  return (
    <Dialog open={isVisible} onOpenChange={onClose}>
      <DialogContent>
        {!reservationDetails ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-4 bg-white rounded"
          >
            <h2 className="text-xl font-bold mb-4">Đăng ký đặt chỗ</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Họ và tên
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
                Số điện thoại
              </label>
              <input
                type="text"
                {...register("customerPhone")}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
                readOnly
              />
              {errors.customerPhone && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.customerPhone.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Địa chỉ
              </label>
              <input
                type="text"
                {...register("customerAddress")}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
                readOnly
              />
              {errors.customerAddress && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.customerAddress.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Ô đã chọn
              </label>
              <input
                type="text"
                value={`${selectedBuilding?.buildingName} - ${selectedFloor?.floorName} - ${selectedArea?.areaName} - Ô số ${selectedNiche?.nicheName}`}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                readOnly
              />
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
        ) : (
          <div className="p-4 bg-white rounded">
            <h2 className="text-xl font-bold mb-4">Thông tin đặt chỗ</h2>
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700">Mã đặt chỗ:</p>
              <p>{reservationDetails.reservationID}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700">Họ và tên:</p>
              <p>{reservationDetails.customerName}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700">
                Số điện thoại:
              </p>
              <p>{reservationDetails.customerPhone}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700">Địa chỉ:</p>
              <p>{reservationDetails.customerAddress}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700">Ô đã chọn:</p>
              <p>{`${selectedBuilding?.buildingName} - ${selectedFloor?.floorName} - ${selectedArea?.areaName} - Ô số ${selectedNiche?.nicheName}`}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700">
                Ngày hẹn ký hợp đồng:
              </p>
              <p>{reservationDetails.confirmationDate}</p>
            </div>
            <div className="flex justify-end">
              <Button type="button" onClick={onClose}>
                Quay lại
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingForm;
