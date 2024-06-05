import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const ResetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/reset-password", { email });
      if (response.status === 200) {
        setSuccess("Password reset link sent to your email");
        setEmail("");
      }
    } catch (err) {
      setError("Error sending password reset link");
    }
  };

  return (
    <form
      onSubmit={handleReset}
      className="w-full max-w-md bg-white p-8 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6">Reset Password</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Reset Password
      </button>
    </form>
  );
};

export default ResetPasswordForm;
