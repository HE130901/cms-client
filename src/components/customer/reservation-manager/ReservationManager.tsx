"use client";
import React, { useEffect, useState } from "react";
import axios from "@/utils/axiosConfig";
import { useStateContext } from "@/context/StateContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";

const ReservationManagerPage = () => {
  const { user } = useStateContext();
  const [reservations, setReservations] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [reservationToDelete, setReservationToDelete] = useState(null);

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

  const confirmDeleteReservation = (reservationID) => {
    setReservationToDelete(reservationID);
    setIsDialogOpen(true);
  };

  const deleteReservation = async () => {
    try {
      await axios.delete(`/api/NicheReservations/${reservationToDelete}`);
      toast.success("Đơn đặt chỗ đã được xóa thành công!");
      fetchReservations(user.customerId);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error deleting reservation:", error);
      toast.error("Failed to delete the reservation.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Quản lý đơn</h2>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Danh sách đơn đặt chỗ</h3>
        {reservations.length > 0 ? (
          <ul className="space-y-4">
            {reservations.map((reservation) => (
              <li
                key={reservation.reservationID}
                className="p-4 border border-gray-300 rounded-md shadow-sm flex justify-between items-center"
              >
                <div>
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
                    <strong>Ngày hẹn ký hợp đồng:</strong>{" "}
                    {reservation.confirmationDate}
                  </p>
                  <p>
                    <strong>Trạng thái:</strong> {reservation.status}
                  </p>
                </div>
                <Button
                  variant="destructive"
                  onClick={() =>
                    confirmDeleteReservation(reservation.reservationID)
                  }
                >
                  Xóa
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Bạn chưa có đơn đặt chỗ nào.</p>
        )}
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Danh sách đơn đặt dịch vụ</h3>
        <p>Chức năng này đang được phát triển.</p>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4">Danh sách đơn đăng ký viếng</h3>
        <p>Chức năng này đang được phát triển.</p>
      </div>

      {isDialogOpen && (
        <Dialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(false)}>
          <DialogContent>
            <h2 className="text-xl font-bold mb-4">Xác nhận xóa</h2>
            <p>Bạn có chắc chắn muốn xóa đơn đặt chỗ này không?</p>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="default" onClick={() => setIsDialogOpen(false)}>
                Hủy
              </Button>
              <Button variant="destructive" onClick={deleteReservation}>
                Xóa
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ReservationManagerPage;
