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
  const [searchTerm, setSearchTerm] = useState("");
  const { reservations, fetchReservations, loading } = useStateContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const recordsPerPage = 10;

  useEffect(() => {
    fetchReservations();
  }, []);

  const filteredData = reservations.filter((reservation) =>
    Object.values(reservation).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortConfig.key === null) {
      return 0;
    }
    const order = sortConfig.direction === "ascending" ? 1 : -1;
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return -order;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return order;
    }
    return 0;
  });

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = sortedData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  const handleApprove = async (reservationId) => {
    try {
      await axios.post(`/api/reservations/${reservationId}/approve`);
      toast.success("Reservation approved successfully!");
      fetchReservations(); // Refresh the reservations
    } catch (error) {
      console.error("Failed to approve reservation", error);
      toast.error("Failed to approve reservation.");
    }
  };

  const handleReject = async (reservationId) => {
    try {
      await axios.post(`/api/reservations/${reservationId}/reject`);
      toast.success("Reservation rejected successfully!");
      fetchReservations(); // Refresh the reservations
    } catch (error) {
      console.error("Failed to reject reservation", error);
      toast.error("Failed to reject reservation.");
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? "▲" : "▼";
    }
    return "▲▼";
  };

  return (
    <div className="mt-4 bg-orange-50 rounded-lg p-6 ">
      <div className="flex items-center px-4 py-2 bg-orange-100 rounded-lg shadow-inner mb-4 w-96 relative">
        <MagnifyingGlassIcon className="absolute left-8 h-5 w-5 text-gray-500" />
        <Input
          placeholder="Tìm kiếm đơn đặt ô chứa"
          className="pl-10 pr-4 w-full text-center"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {loading ? (
        <div className="flex justify-center items-center py-6">
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <Table className="min-w-full bg-orange-50">
            <TableHeader>
              <TableRow>
                <TableHead
                  className="w-[100px] px-4 py-2 cursor-pointer"
                  onClick={() => handleSort("reservationId")}
                >
                  ID{" "}
                  <span className="text-xs">
                    {getSortIndicator("reservationId")}
                  </span>
                </TableHead>
                <TableHead
                  className="w-[150px] px-4 py-2 cursor-pointer"
                  onClick={() => handleSort("customerFullName")}
                >
                  Người đặt{" "}
                  <span className="text-xs">
                    {getSortIndicator("customerFullName")}
                  </span>
                </TableHead>
                <TableHead
                  className="w-[150px] px-4 py-2 cursor-pointer"
                  onClick={() => handleSort("recipientFullName")}
                >
                  Người nhận{" "}
                  <span className="text-xs">
                    {getSortIndicator("recipientFullName")}
                  </span>
                </TableHead>
                <TableHead
                  className="w-[200px] px-4 py-2 cursor-pointer"
                  onClick={() => handleSort("buildingName")}
                >
                  Tòa nhà{" "}
                  <span className="text-xs">
                    {getSortIndicator("buildingName")}
                  </span>
                </TableHead>
                <TableHead
                  className="w-[150px] px-4 py-2 cursor-pointer"
                  onClick={() => handleSort("floorName")}
                >
                  Tầng{" "}
                  <span className="text-xs">
                    {getSortIndicator("floorName")}
                  </span>
                </TableHead>
                <TableHead
                  className="w-[150px] px-4 py-2 cursor-pointer"
                  onClick={() => handleSort("areaName")}
                >
                  Khu{" "}
                  <span className="text-xs">
                    {getSortIndicator("areaName")}
                  </span>
                </TableHead>
                <TableHead
                  className="w-[150px] px-4 py-2 cursor-pointer"
                  onClick={() => handleSort("nicheName")}
                >
                  Ô{" "}
                  <span className="text-xs">
                    {getSortIndicator("nicheName")}
                  </span>
                </TableHead>
                <TableHead
                  className="w-[150px] px-4 py-2 cursor-pointer"
                  onClick={() => handleSort("reservationDate")}
                >
                  Ngày đặt{" "}
                  <span className="text-xs">
                    {getSortIndicator("reservationDate")}
                  </span>
                </TableHead>
                <TableHead
                  className="w-[150px] px-4 py-2 cursor-pointer"
                  onClick={() => handleSort("confirmationDate")}
                >
                  Ngày hẹn ký{" "}
                  <span className="text-xs">
                    {getSortIndicator("confirmationDate")}
                  </span>
                </TableHead>
                <TableHead
                  className="w-[150px] px-4 py-2 cursor-pointer"
                  onClick={() => handleSort("status")}
                >
                  Trạng thái{" "}
                  <span className="text-xs">{getSortIndicator("status")}</span>
                </TableHead>
                <TableHead className="w-[200px] px-4 py-2">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentRecords.map((reservation, index) => (
                <TableRow key={index}>
                  <TableCell className="px-4 py-2">
                    {reservation.reservationId}
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    {reservation.customerFullName}
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    {reservation.recipientFullName}
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    {reservation.buildingName}
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    {reservation.floorName}
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    {reservation.areaName}
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    {reservation.nicheName}
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    {reservation.reservationDate}
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    {reservation.confirmationDate}
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    {reservation.status}
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    <div className="flex space-x-2">
                      <Button
                        variant="secondary"
                        className="text-sm"
                        onClick={() => handleApprove(reservation.reservationId)}
                      >
                        Duyệt
                      </Button>
                      <Button
                        variant="destructive"
                        className="text-sm"
                        onClick={() => handleReject(reservation.reservationId)}
                      >
                        Từ chối
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-center mt-4 space-x-2">
            <Button
              variant="outline"
              className="mx-1"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </Button>
            {[...Array(totalPages)].map((_, i) => (
              <Button
                key={i}
                variant="outline"
                className={`mx-1 ${
                  currentPage === i + 1 ? "bg-orange-100 text-black" : ""
                }`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              className="mx-1"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderList;
