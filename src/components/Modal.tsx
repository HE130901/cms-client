"use client";

import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Modal = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  return (
    <Dialog open={isVisible} onOpenChange={onClose}>
      <DialogContent className="bg-white p-6 rounded shadow-lg w-96">
        {children}
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
