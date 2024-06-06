"use client";

import React, { useState } from "react";
import { useStateContext } from "@/context/StateContext";
import BuildingSelector from "@/components/BuildingSelector";
import FloorSelector from "@/components/FloorSelector";
import SectionSelector from "@/components/SectionSelector";
import NicheSelector from "@/components/NicheSelector";
import Modal from "@/components/Modal";

const BookingPage = () => {
  const { selectedBuilding, selectedFloor, selectedSection, selectedNiche } =
    useStateContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setIsFormVisible(false);
  };

  const handleBack = () => {
    closeModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    closeModal();
  };

  const showForm = () => {
    setIsFormVisible(true);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center mb-4">Booking</h1>
      <div className="flex justify-center mb-4">
        <BuildingSelector />
      </div>
      {selectedBuilding && (
        <div className="flex justify-center mb-4">
          <FloorSelector />
        </div>
      )}
      {selectedBuilding && selectedFloor && (
        <div className="flex justify-center mb-4">
          <SectionSelector />
        </div>
      )}
      {selectedBuilding && selectedFloor && selectedSection && (
        <div className="flex justify-center">
          <NicheSelector openModal={openModal} />
        </div>
      )}
      <Modal isVisible={isModalVisible} onClose={closeModal}>
        {selectedBuilding &&
          selectedFloor &&
          selectedSection &&
          selectedNiche &&
          !isFormVisible && (
            <div>
              <h2 className="text-xl font-semibold">Selected:</h2>
              <div className="mt-4">
                <p>
                  <strong>Building:</strong> {JSON.stringify(selectedBuilding)}
                </p>
                <p>
                  <strong>Floor:</strong> {JSON.stringify(selectedFloor)}
                </p>
                <p>
                  <strong>Section:</strong> {JSON.stringify(selectedSection)}
                </p>
                <p>
                  <strong>Niche:</strong> {JSON.stringify(selectedNiche)}
                </p>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Thông tin chi tiết</h3>
                <p>Kích thước: 30x40 cm</p>
                <p>Giá niêm yết: 1.000.000đ/ô/năm</p>
                <div className="mt-2 flex space-x-4">
                  <button
                    className="px-4 py-2 bg-gray-200 rounded"
                    onClick={handleBack}
                  >
                    Quay lại
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={showForm}
                  >
                    Đặt ô {selectedNiche?.id}
                  </button>
                </div>
              </div>
            </div>
          )}
        {isFormVisible && (
          <form onSubmit={handleFormSubmit}>
            <h2 className="text-xl font-semibold mb-4">Đăng ký đặt chỗ</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Họ và tên
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Số điện thoại
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={closeModal}
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Xác nhận
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default BookingPage;
