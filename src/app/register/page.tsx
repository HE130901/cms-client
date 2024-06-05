"use client";
import React, { useState } from "react";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your registration logic here
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="w-64">
        <label className="mb-2">
          Username:
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            className="border border-gray-300 rounded px-2 py-1 w-full"
          />
        </label>
        <br />
        <label className="mb-2">
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="border border-gray-300 rounded px-2 py-1 w-full"
          />
        </label>
        <br />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
