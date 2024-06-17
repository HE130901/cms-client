"use client";

import React, { useState } from "react";
import ComboboxSelector from "@/components/customer/visit-registration/ComboboxSelector";
import { Button } from "@/components/ui/button";
import axios from "@/utils/axiosConfig";
import { toast } from "sonner";
import { useStateContext } from "@/context/StateContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const visitSchema = z.object({
  customerName: z.string().min(1, "Họ và tên là bắt buộc"),
  visitDate: z.string().refine(
    (val) => {
      const visitDate = new Date(val);
      const today = new Date();
      return visitDate >= today;
    },
    {
      message: "Ngày đăng ký phải là ngày hiện tại hoặc sau đó.",
    }
  ),
  note: z.string().optional(),
});

const VisitRegistrationPage = () => {
  const { selectedNiche, user, fetchVisitRegistrations } = useStateContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(visitSchema),
  });

  const onSubmit = async (data) => {
    if (!selectedNiche) {
      toast.error("Vui lòng chọn một ô.");
      return;
    }

    const dataToSubmit = {
      customerId: user.customerId,
      nicheId: selectedNiche.nicheId,
      visitDate: data.visitDate,
      note: data.note,
      customerName: data.customerName,
    };

    setIsSubmitting(true);
    try {
      await axios.post("/api/VisitRegistrations", dataToSubmit);
      toast.success("Đăng ký thăm viếng thành công!");
      fetchVisitRegistrations(user.customerId); // Fetch visit registrations after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to create visit registration.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
        Đăng ký viếng thăm
      </h1>
      <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
        <ComboboxSelector />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 p-4 md:p-6 bg-white rounded-lg shadow-lg"
      >
        <div className="mb-4 md:mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Họ và tên
          </label>
          <input
            type="text"
            {...register("customerName")}
            className="mt-1 p-2 md:p-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
          {errors.customerName && (
            <p className="mt-2 text-sm text-red-600">
              {errors.customerName.message}
            </p>
          )}
        </div>

        <div className="mb-4 md:mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Ngày viếng thăm
          </label>
          <input
            type="datetime-local"
            {...register("visitDate")}
            className="mt-1 p-2 md:p-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
          {errors.visitDate && (
            <p className="mt-2 text-sm text-red-600">
              {errors.visitDate.message}
            </p>
          )}
        </div>
        <div className="mb-4 md:mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Ghi chú
          </label>
          <textarea
            {...register("note")}
            className="mt-1 p-2 md:p-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <Button
          type="submit"
          className="w-full py-3 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Đang gửi..." : "Xác nhận"}
        </Button>
      </form>
    </div>
  );
};

export default VisitRegistrationPage;
