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
          <DialogTitle>Thông tin chi tiết ô chứa</DialogTitle>
        </DialogHeader>
        {selectedNiche && (
          <div className="mb-4">
            <p>
              <strong>Tòa nhà:</strong> {selectedBuilding?.buildingName}
            </p>
            <p>
              <strong>Tầng:</strong> {selectedFloor?.floorName}
            </p>
            <p>
              <strong>Khu:</strong> {selectedArea?.areaName}
            </p>
            <p>
              <strong>Ô số:</strong> {selectedNiche.nicheName}
            </p>
            <p>
              <strong>Trạng thái:</strong> {selectedNiche.status}
            </p>
            <p>
              <strong>Mô tả:</strong> {selectedNiche.nicheDescription}
            </p>
          </div>
        )}
        <DialogFooter>
          <Button type="button" variant={"secondary"} onClick={onClose}>
            Quay lại
          </Button>
          {selectedNiche && selectedNiche.status === "Available" && (
            <Button type="button" onClick={onBook}>
              Đặt ô số {selectedNiche.nicheName}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NicheDetails;
