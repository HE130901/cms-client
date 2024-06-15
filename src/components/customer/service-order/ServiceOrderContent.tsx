"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "@/utils/axiosConfig";
import ServiceCard from "@/components/customer/service-order/ServiceCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ServiceOrderContent: React.FC = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("/api/Services");
        setServices(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  const handleNext = () => {
    if (currentIndex + itemsPerPage < services.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <main className="relative px-8 py-6 bg-orange-100 mx-4 my-4 h-screen rounded-md">
      <div className="relative flex items-center justify-between">
        <button
          className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 focus:outline-none"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          aria-label="Previous"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="flex space-x-6 px-12">
          <AnimatePresence initial={false} exitBeforeEnter>
            {services
              .slice(currentIndex, currentIndex + itemsPerPage)
              .map((service) => (
                <motion.div
                  key={service.serviceId}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col"
                >
                  <ServiceCard
                    serviceName={service.serviceName}
                    description={service.description}
                    price={service.price}
                    servicePicture={service.servicePicture}
                  />
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
        <button
          className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 focus:outline-none"
          onClick={handleNext}
          disabled={currentIndex + itemsPerPage >= services.length}
          aria-label="Next"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </main>
  );
};

export default ServiceOrderContent;
