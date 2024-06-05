"use client";
import React, { useState } from "react";
import axios from "axios";

function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://localhost:7148/api/user/login",
        {
          username: username, // Sử dụng "username" để khớp với mô hình backend
          password: password, // Sử dụng "password" để khớp với mô hình backend
        }
      );
      // Xử lý đăng nhập thành công
      console.log("Login successful:", response.data);
    } catch (error) {
      // Xử lý lỗi đăng nhập
      console.error("Login failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={handleUsernameChange}
        placeholder="Tên người dùng"
      />
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="Mật khẩu"
      />
      <button type="submit">Đăng nhập</button>
    </form>
  );
}

export default Page;
