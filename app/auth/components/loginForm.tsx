"use client";

import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  LogIn,
  Mail,
  Lock,
  UserLock,
  CheckCircle,
} from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { refetchUser, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        toast.error("Password and email is required");
        return;
      }
      const payload = {
        email: email,
        password: password,
        rememberMe: rememberMe,
        loginAt: new Date().toLocaleString(),
      };
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/api/v1/auth/sign-in`,
        payload,
        { withCredentials: true },
      );

      if (!res.data.success) {
        toast.error(`${res.data.message}`);
      }

      const user = await axios.get(
        `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/api/v1/auth/me`,
        { withCredentials: true },
      );

      setLoading(false);
      setSuccessMessage("User Login in successfully");
      toast.success(res.data.message);
      await refetchUser();

      if (user.data.data.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "Something went wrong";

      toast.error(message);
      setLoading(false);
      setSuccessMessage("");
      setErrorMessage(`${message}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="p-6">
        <Link
          href="/"
          className="px-4 py-2 border border-primary rounded-lg hover:bg-primary font-bold hover:text-white"
        >
          Go Home
        </Link>
      </div>
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
        {/* Animated Background Elements */}

        {/* Login Container */}
        <div className="relative w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Top Accent Bar */}
            <div className="h-1 bg-linear-to-r from-primary via-primary to-primary-foreground"></div>

            {/* Content */}
            <div className="p-6 sm:p-8 md:p-10">
              {/* Logo Section */}
              <div className="text-center mb-8 sm:mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br from-primary to-primary rounded-2xl mb-4 shadow-lg">
                  <UserLock size={40} color="white" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-4">
                  Login
                </h1>
                <p className="text-gray-500 text-sm mt-2">
                  Welcome back to Bongo Prime BD
                </p>
              </div>

              {successMessage && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                  <CheckCircle
                    className="text-green-600 shrink-0"
                    size={20}
                  />
                  <p className="text-green-800 text-sm">
                    {successMessage}
                  </p>
                </div>
              )}
              {errorMessage && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <CheckCircle
                    className="text-red-600 shrink-0"
                    size={20}
                  />
                  <p className="text-red-800 text-sm">
                    {errorMessage}
                  </p>
                </div>
              )}

              {/* Login Form */}
              <form
                onSubmit={handleLogin}
                className="space-y-5 sm:space-y-6"
              >
                {/* Email Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@example.com"
                      className="w-full pl-10 sm:pl-12 pr-4 sm:pr-5 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-foreground focus:ring-opacity-20 transition text-sm sm:text-base"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 sm:pl-12 pr-12 sm:pr-14 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-foreground focus:ring-opacity-20 transition text-sm sm:text-base"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                    >
                      {showPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) =>
                        setRememberMe(e.target.checked)
                      }
                      className="w-4 h-4 rounded border-gray-300 cursor-pointer accent-primary"
                    />
                    <span className="text-gray-600">Remember me</span>
                  </label>
                  <a
                    href="#"
                    className="text-primary hover:text-[#064a8a] font-semibold transition"
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-linear-to-r from-primary to-primary-foreground hover:from-primary-foreground hover:to-primary text-white font-semibold py-2.5 sm:py-3 rounded-lg transition duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base hover:cursor-pointer"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Logging in...
                    </>
                  ) : (
                    <>
                      <LogIn size={20} />
                      Sign In
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6 sm:my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid gap-3 sm:gap-4">
                <button className="flex items-center bg-linear-to-r hover:from-primary hover:to-primary-foreground justify-center gap-2 px-4 py-2.5 sm:py-3 border border-primary rounded-lg hover:bg-gray-50 transition text-sm sm:text-base font-medium text-gray-700 hover:text-white hover:cursor-pointer">
                  <span>
                    <FaGoogle size={28} />
                  </span>
                  Google
                </button>
              </div>

              {/* Sign Up Link */}
              <p className="text-center text-gray-600 text-sm mt-6 sm:mt-8">
                Don't have an account?{" "}
                <Link
                  href="/auth/sign-up"
                  className="text-primary font-bold"
                >
                  Sign up here
                </Link>
              </p>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 sm:px-8 md:px-10 py-4 border-t border-gray-200">
              <p className="text-center text-gray-500 text-xs sm:text-sm">
                By signing in, you agree to our{" "}
                <a href="#" className="text-primary hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
