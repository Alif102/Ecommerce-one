"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleResetPassword = () => {
    setLoading(true);
    // Simulating an API call
    setTimeout(() => {
      setLoading(false);
      setMessage("If that email is registered, we’ll send you a link to reset your password.");
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center h-[100vh] bg-gradient-to-br from-gray-950 to-gray-700">
      <div className="p-8 w-96 rounded-[10px] border border-white/18 backdrop-blur-[150px] bg-gray-900 shadow-lg">
        <h2 className="text-white text-2xl font-semibold text-center mb-6">Forgot Password</h2>
        <p className="text-white text-sm text-center mb-4">
          Enter your email address to reset your password.
        </p>
        <input
          type="email"
          placeholder="Email Address"
          className="input input-bordered w-full mb-4 bg-white/20 text-white placeholder-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleResetPassword}
          className={`btn w-full text-lg font-semibold py-2 rounded-lg bg-gradient-to-r from-gray-700 to-black border-none text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-800 ${loading ? "loading" : ""}`}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
        {message && <p className="text-center text-white mt-4">{message}</p>}
        <div className="mt-4 text-center">
          <Link href="/sign-in" className="underline text-white">Back to Sign In</Link>
        </div>
      </div>
    </div>
  );
}
