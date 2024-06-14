// src/app/auth/login/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useStateContext } from "@/context/StateContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const Login = () => {
  const { login } = useStateContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      toast.error(error.response?.data.message || "Login failed");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-5 pt-36">
      <h1 className="text-2xl font-bold mb-4">Đăng nhập</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-300 focus:border-orange-300 sm:text-sm"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Mật khẩu
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-300 focus:border-orange-300 sm:text-sm"
          />
          {errors.password && (
            <p className="mt-2 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-black bg-orange-200 rounded-md hover:bg-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-300"
        >
          Đăng nhập
        </button>
      </form>
      <Link href="/auth/register">
        <p className="w-full mt-4 px-4 py-2 text-black border border-orange-300 rounded-md hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 block text-center">
          Đăng ký tài khoản mới
        </p>
      </Link>
    </div>
  );
};

export default Login;
