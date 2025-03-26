"use client";

import { useState } from "react";
import Link from "next/link";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import "tailwindcss/tailwind.css";

export default function SignIn() {
  const [loading, setLoading] = useState(false);

  const handleSignIn = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="flex justify-center items-center h-[100vh] bg-gradient-to-br from-gray-950 to-gray-700">
      <div className="p-8 w-96 rounded-[10px] border border-white/18 backdrop-blur-[150px] bg-gray-900  shadow-lg">
        <h2 className="text-white text-2xl font-semibold text-center mb-6">Sign In</h2>
        <input
          type="text"
          placeholder="Username or email"
          className="input input-bordered w-full mb-4 bg-white/20 text-white placeholder-white"
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full mb-4 bg-white/20 text-white placeholder-white"
        />
        <div className="flex items-center justify-between mb-4">
          <label className="label cursor-pointer text-white">
            <input type="checkbox" className="checkbox checkbox-sm mr-2" /> Remember me
          </label>
          <Link href="/forgot-password" className="text-white text-sm">Forgot Password?</Link>
        </div>
        <button
  onClick={handleSignIn}
  className={`btn w-full text-lg font-semibold py-2 rounded-lg bg-gradient-to-r from-gray-700 to-black border-none text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-800 ${loading ? "loading" : ""}`}
>
  {loading ? "Signing In..." : "Sign In"}
</button>

        <div className="flex items-center my-4 text-white">
          <div className="flex-1 border-t border-white/30"></div>
          <span className="mx-4">Or</span>
          <div className="flex-1 border-t border-white/30"></div>
        </div>
        <button className="btn w-full mb-2 flex items-center justify-center bg-white/20 text-white py-2 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-green-500">
  <FaGoogle size={28} className="mr-2" /> Continue With Google
</button>
<button className="btn w-full flex items-center justify-center bg-white/20 text-white py-2 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-400">
  <FaFacebook size={28} className="mr-2" /> Continue With Facebook
</button>

        <p className="text-center text-white mt-4">
          Don’t have an account? <Link href="/sign-up" className="underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}