"use client";

import { useState } from "react";
import Link from "next/link";
import { useStateContext } from "@/context/StateContext";

const Register = () => {
  const { register } = useStateContext();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    citizenId: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(formData);
  };

  return (
    <div className="max-w-md mx-auto mt-10 pt-36">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Họ và Tên
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-300 focus:border-orange-300 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-300 focus:border-orange-300 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Số điện thoại
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-300 focus:border-orange-300 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Địa chỉ
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-300 focus:border-orange-300 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mật khẩu
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-300 focus:border-orange-300 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Số CCCD
          </label>
          <input
            type="text"
            name="citizenId"
            value={formData.citizenId}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-300 focus:border-orange-300 sm:text-sm"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-orange-300 rounded-md hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-300"
          >
            Đăng ký
          </button>
        </div>
      </form>
      <Link href="/auth/login">
        <p className="w-full mt-4 px-4 py-2 text-orange-300 border border-orange-300 rounded-md hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-300 block text-center">
          Đăng nhập
        </p>
      </Link>
    </div>
  );
};

export default Register;
