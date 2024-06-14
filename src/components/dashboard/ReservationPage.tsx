"use client";
import React, { useEffect, useState } from "react";
import axios from "@/utils/axiosConfig";
import { useStateContext } from "@/context/StateContext";

const ReservationList = () => {
  const { user } = useStateContext();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    if (user) {
      fetchReservations(user.customerId);
    }
  }, [user]);

  const fetchReservations = async (customerId) => {
    try {
      const response = await axios.get(
        `/api/NicheReservations/customer/${customerId}`
      );
      setReservations(response.data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Danh sách đơn đặt chỗ</h2>
      {reservations.length > 0 ? (
        <ul>
          {reservations.map((reservation) => (
            <li
              key={reservation.reservationID}
              className="mb-2 p-4 border border-gray-300 rounded-md"
            >
              <p>
                <strong>Mã đặt chỗ:</strong> {reservation.reservationID}
              </p>
              <p>
                <strong>Ô chứa:</strong> {reservation.nicheID}
              </p>
              <p>
                <strong>Ngày đặt:</strong> {reservation.createdDate}
              </p>
              <p>
                <strong>Ngày ký hợp đồng:</strong>{" "}
                {reservation.confirmationDate}
              </p>
              <p>
                <strong>Trạng thái:</strong> {reservation.status}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Bạn chưa có đơn đặt chỗ nào.</p>
      )}

      <h2 className="text-xl font-bold mb-4">Danh sách đơn đặt dịch vụ</h2>

      <h2 className="text-xl font-bold mb-4">Danh sách đơn đăng ký viếng</h2>
    </div>
  );
};

export default ReservationList;
