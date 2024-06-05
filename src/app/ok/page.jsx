"use client";
import React from "react";
import axios from "axios";

// Hàm login
const login = async (username, password) => {
  try {
    const response = await axios.post("https://localhost:7148/api/user/login", {
      username,
      password,
    });
    // Xử lý dữ liệu phản hồi
    console.log(response.data);
  } catch (error) {
    // Xử lý lỗi
    console.error(error);
  }
};

// Component trang
function Page() {
  return (
    <div>
      <button onClick={() => login("admin", "password")}>Login</button>
    </div>
  );
}

export default Page;
