import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface ServiceCardProps {
  serviceName: string;
  description: string;
  price: number;
  servicePicture: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  serviceName,
  description,
  price,
  servicePicture,
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <Card className="w-full rounded-lg overflow-hidden shadow-lg dark:shadow-none">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="h-[300px] overflow-hidden"
      >
        <img
          src={servicePicture}
          alt={serviceName}
          width={400}
          height={400}
          className="w-full h-full object-cover"
        />
      </motion.div>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <CardTitle className="text-xl font-semibold">{serviceName}</CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            {description}
          </CardDescription>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">{formatPrice(price)}</span>
          <Button size="sm">Đặt ngay</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
