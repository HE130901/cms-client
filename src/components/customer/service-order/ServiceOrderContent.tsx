"use client";

import React, { useState, useEffect } from "react";
import axios from "@/utils/axiosConfig";
import ServiceCard from "@/components/customer/service-order/ServiceCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ServiceOrderContent: React.FC = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("/api/Services");
        setServices(response.data.$values);
        setFilteredServices(response.data.$values);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    const filtered = services.filter(
      (service) =>
        service.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        service.price >= minPrice &&
        service.price <= maxPrice
    );
    setFilteredServices(filtered);
    setCurrentPage(1);
  }, [searchTerm, minPrice, maxPrice, services]);

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(parseFloat(event.target.value));
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(parseFloat(event.target.value));
  };

  if (loading) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  if (error) {
    return <p className="text-center mt-20">Error: {error}</p>;
  }

  return (
    <main className="relative px-8 mx-4 min-h-screen rounded-md">
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 p-4 md:p-6">
        <div className="bg-white p-4 rounded-lg shadow-md h-full">
          <h2 className="text-lg font-semibold mb-4">Bộ lọc tìm kiếm</h2>
          <div className="mb-4">
            <label htmlFor="searchTerm" className="block font-medium mb-2">
              Tìm kiếm
            </label>
            <input
              type="text"
              id="searchTerm"
              value={searchTerm}
              onChange={handleSearchTermChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập từ khóa tìm kiếm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="minPrice" className="block font-medium mb-2">
              Giá từ
            </label>
            <input
              type="number"
              id="minPrice"
              value={minPrice}
              onChange={handleMinPriceChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập giá tối thiểu"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="maxPrice" className="block font-medium mb-2">
              Giá đến
            </label>
            <input
              type="number"
              id="maxPrice"
              value={maxPrice}
              onChange={handleMaxPriceChange}
              className="block w-full px-3 py-2 border border-gray-300
              rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập giá tối đa"
            />
          </div>
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredServices
              .slice(
                (currentPage - 1) * itemsPerPage,
                (currentPage - 1) * itemsPerPage + itemsPerPage
              )
              .map((service) => (
                <div
                  key={service.serviceId}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <ServiceCard
                    serviceName={service.serviceName}
                    description={service.description}
                    price={service.price}
                    servicePicture={service.servicePicture}
                  />
                </div>
              ))}
          </div>
          <div className="flex justify-center mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) handlePageChange(currentPage - 1);
                    }}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </PaginationPrevious>
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNumber) => (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(pageNumber);
                        }}
                        isActive={currentPage === pageNumber}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages)
                        handlePageChange(currentPage + 1);
                    }}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </PaginationNext>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ServiceOrderContent;
