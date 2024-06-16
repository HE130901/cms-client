import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Input } from "@/components/ui/input";
import { useStateContext } from "@/context/StateContext";
import axios from "@/utils/axiosConfig";
import { toast } from "sonner";

const OrderList = () => {
  return <div className="mt-4 bg-orange-50 rounded-lg p-6 "></div>;
};

export default OrderList;
