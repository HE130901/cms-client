"use client";

import React, { useEffect, useState } from "react";
import { useStateContext } from "@/context/StateContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";

const NicheReservationList = () => {
  const {
    user,
    fetchReservations,
    reservations,
    deleteReservation,
    fetchNiches,
    selectedBuilding,
    selectedFloor,
    selectedArea,
  } = useStateContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [reservationToDelete, setReservationToDelete] = useState(null);

  useEffect(() => {
    if (user && user.customerId) {
      fetchReservations(user.customerId);
    }
  }, [user, fetchReservations]);

  const confirmDeleteReservation = (reservationId) => {
    setReservationToDelete(reservationId);
    setIsDialogOpen(true);
  };

  const handleDeleteReservation = async () => {
    await deleteReservation(reservationToDelete);
    setIsDialogOpen(false);
    if (selectedBuilding && selectedFloor && selectedArea) {
      await fetchNiches(
        selectedBuilding.buildingId,
        selectedFloor.floorId,
        selectedArea.areaId
      );
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Danh sách đơn đặt chỗ</h3>
        {reservations.length > 0 ? (
          <ul className="space-y-4">
            {reservations.map((reservation) => (
              <li
                key={reservation.reservationId}
                className="p-4 border border-gray-300 rounded-md shadow-sm flex justify-between items-center"
              >
                <div>
                  <p>
                    <strong>ID Đặt chỗ:</strong> {reservation.reservationId}
                  </p>
                  <p>
                    <strong>ID Ô chứa:</strong> {reservation.nicheId}
                  </p>
                  <p>
                    <strong>Ngày tạo:</strong>{" "}
                    {new Date(reservation.createdDate).toLocaleString()}
                  </p>
                  <p>
                    <strong>Ngày xác nhận:</strong>{" "}
                    {new Date(reservation.confirmationDate).toLocaleString()}
                  </p>
                  <p>
                    <strong>Trạng thái:</strong> {reservation.status}
                  </p>
                </div>
                <Button
                  variant="destructive"
                  onClick={() =>
                    confirmDeleteReservation(reservation.reservationId)
                  }
                >
                  Xóa
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Bạn không có đơn đặt chỗ nào.</p>
        )}
      </div>

      {isDialogOpen && (
        <Dialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(false)}>
          <DialogContent>
            <h2 className="text-xl font-bold mb-4">Xác nhận xóa</h2>
            <p>Bạn có chắc muốn xóa đơn đặt chỗ này không?</p>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="default" onClick={() => setIsDialogOpen(false)}>
                Hủy
              </Button>
              <Button variant="destructive" onClick={handleDeleteReservation}>
                Xóa
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default NicheReservationList;
