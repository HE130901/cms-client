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
    if (user && user.customerId) {
      fetchReservations(user.customerId);
    }
  }, [user]);

  const fetchReservations = async (customerId) => {
    try {
      const response = await axios.get(
        `/api/NicheReservations/Customer/${customerId}`
      );
      console.log("Fetched reservations:", response.data); // Debugging line
      setReservations(response.data.$values);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  const confirmDeleteReservation = (reservationId) => {
    setReservationToDelete(reservationId);
    setIsDialogOpen(true);
  };

  const deleteReservation = async () => {
    try {
      await axios.delete(`/api/NicheReservations/${reservationToDelete}`);
      toast.success("Reservation deleted successfully!");
      setReservations(
        reservations.filter(
          (reservation) => reservation.reservationId !== reservationToDelete
        )
      );
      setIsDialogOpen(false);
      setReservationToDelete(null);
    } catch (error) {
      console.error("Error deleting reservation:", error);
      toast.error("Failed to delete the reservation.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Manage Reservations</h2>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Reservation List</h3>
        {reservations.length > 0 ? (
          <ul className="space-y-4">
            {reservations.map((reservation) => (
              <li
                key={reservation.reservationId}
                className="p-4 border border-gray-300 rounded-md shadow-sm flex justify-between items-center"
              >
                <div>
                  <p>
                    <strong>Reservation ID:</strong> {reservation.reservationId}
                  </p>
                  <p>
                    <strong>Niche ID:</strong> {reservation.nicheId}
                  </p>
                  <p>
                    <strong>Created Date:</strong> {reservation.createdDate}
                  </p>
                  <p>
                    <strong>Confirmation Date:</strong>{" "}
                    {reservation.confirmationDate}
                  </p>
                  <p>
                    <strong>Status:</strong> {reservation.status}
                  </p>
                </div>
                <Button
                  variant="destructive"
                  onClick={() =>
                    confirmDeleteReservation(reservation.reservationId)
                  }
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p>You have no reservations.</p>
        )}
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Service Reservations</h3>
        <p>This feature is under development.</p>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4">Visit Registrations</h3>
        <p>This feature is under development.</p>
      </div>

      {isDialogOpen && (
        <Dialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(false)}>
          <DialogContent>
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this reservation?</p>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="default" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={deleteReservation}>
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ReservationManagerPage;
