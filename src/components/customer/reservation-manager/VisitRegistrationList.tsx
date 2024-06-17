"use client";

import React, { useEffect, useState } from "react";
import axios from "@/utils/axiosConfig";
import { useStateContext } from "@/context/StateContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";

const VisitRegistrationList = () => {
  const {
    user,
    visitRegistrations,
    setVisitRegistrations,
    fetchVisitRegistrations,
    deleteVisitRegistration,
  } = useStateContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [registrationToDelete, setRegistrationToDelete] = useState(null);

  useEffect(() => {
    if (user && user.customerId) {
      fetchVisitRegistrations(user.customerId);
    }
  }, [user]);

  const confirmDeleteRegistration = (visitId) => {
    setRegistrationToDelete(visitId);
    setIsDialogOpen(true);
  };

  const handleDeleteRegistration = async () => {
    await deleteVisitRegistration(registrationToDelete);
    setIsDialogOpen(false);
    setRegistrationToDelete(null);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Danh sách đơn đăng ký viếng</h3>
        {visitRegistrations.length > 0 ? (
          <ul className="space-y-4">
            {visitRegistrations.map((registration) => (
              <li
                key={registration.visitId}
                className="p-4 border border-gray-300 rounded-md shadow-sm flex justify-between items-center"
              >
                <div>
                  <p>
                    <strong>Visit ID:</strong> {registration.visitId}
                  </p>
                  <p>
                    <strong>Niche ID:</strong> {registration.nicheId}
                  </p>
                  <p>
                    <strong>Visit Date:</strong>{" "}
                    {new Date(registration.visitDate).toLocaleString()}
                  </p>
                  <p>
                    <strong>Status:</strong> {registration.status}
                  </p>
                </div>
                <Button
                  variant="destructive"
                  onClick={() =>
                    confirmDeleteRegistration(registration.visitId)
                  }
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p>You have no visit registrations.</p>
        )}
      </div>

      {isDialogOpen && (
        <Dialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(false)}>
          <DialogContent>
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this visit registration?</p>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="default" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteRegistration}>
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default VisitRegistrationList;
