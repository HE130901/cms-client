"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const NicheDetails = ({
  isVisible,
  onClose,
  selectedBuilding,
  selectedFloor,
  selectedArea,
  selectedNiche,
  onBook,
}) => {
  return (
    <Dialog open={isVisible} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Niche Details</DialogTitle>
        </DialogHeader>
        {selectedNiche && (
          <div className="mb-4">
            <p>
              <strong>Building:</strong> {selectedBuilding?.buildingName}
            </p>
            <p>
              <strong>Floor:</strong> {selectedFloor?.floorName}
            </p>
            <p>
              <strong>Area:</strong> {selectedArea?.areaName}
            </p>
            <p>
              <strong>Niche:</strong> {selectedNiche.nicheName}
            </p>
            <p>
              <strong>Status:</strong> {selectedNiche.status}
            </p>
            <p>
              <strong>Description:</strong> {selectedNiche.nicheDescription}
            </p>
          </div>
        )}
        <DialogFooter>
          <Button type="button" onClick={onClose}>
            Close
          </Button>
          {selectedNiche && selectedNiche.status === "Available" && (
            <Button type="button" onClick={onBook}>
              Book this Niche
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NicheDetails;
