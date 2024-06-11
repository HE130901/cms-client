import { useState } from "react";
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

const ServiceOrder = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const tableData = [
    ["Order 1", "service1@example.com", "Pending"],
    ["Order 2", "service2@example.com", "Completed"],
    ["Order 3", "service3@example.com", "In Progress"],
  ];

  const filteredData = tableData.filter((row) =>
    row.some((cell) => cell.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="mt-4 bg-white rounded-md shadow-sm">
      <div className="flex items-center px-4 py-2 bg-white rounded-md shadow-sm">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
        <Input
          placeholder="Tìm kiếm đơn đặt dịch vụ"
          className="ml-2 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Order ID</TableHead>
            <TableHead className="w-[250px]">Service Email</TableHead>
            <TableHead className="w-[150px]">Status</TableHead>
            <TableHead className="w-[150px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((rowData, index) => (
            <TableRow key={index}>
              {rowData.map((cell, cellIndex) => (
                <TableCell key={cellIndex}>{cell}</TableCell>
              ))}
              <TableCell>
                <Button variant="outline" className="text-sm">
                  Update
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ServiceOrder;
