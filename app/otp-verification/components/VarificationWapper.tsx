"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  checkAttempts,
  resendOTP,
  verifyOTP,
} from "@/lib/otpService";
import SuccessAnimation from "./SuccessAnimation";
import { SupportNav } from "@/app/support/components/supportNavbar";
import OTPInput from "./OTPInput";
import ResendTimer from "./ResendTimer";

export default function OTPVerificationWrapper({
  orderId = "N/A",
  amount,
  paymentMethod,
}: {
  orderId: string | undefined;
  amount: string;
  paymentMethod: string;
}) {
  const router = useRouter();
  const [otp, setOtp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [resendCount, setResendCount] = useState<number>(0);
  const [canResend, setCanResend] = useState<boolean>(false);
  const [isBlocked, setIsBlocked] = useState<boolean>(false);
  const [blockTimeRemaining, setBlockTimeRemaining] =
    useState<number>(0);



  //   const orderId =
  //     typeof window !== "undefined"
  //       ? localStorage.getItem("orderId") || "N/A"
  //       : "N/A";

  // OTP length
  const OTP_LENGTH = 6;

  // Check if user is blocked
  useEffect(() => {
    checkBlockStatus();
  }, []);

  const checkBlockStatus = async () => {
    try {
      const response = await checkAttempts(orderId);
      if (response.blocked) {
        setIsBlocked(true);
        setBlockTimeRemaining(response.timeRemaining || 0);
      }
    } catch (err) {
      console.error("Error checking block status:", err);
    }
  };

  // Handle OTP verification
  const handleVerifyOTP = async () => {
    if (otp.length !== OTP_LENGTH) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    if (isBlocked) {
      setError("Too many attempts. Please try again after 2 hours.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await verifyOTP(orderId, otp);
      if (response.success) {
        setSuccess(true);
        // Clear local storage
        localStorage.removeItem("orderId");
        localStorage.removeItem("otpAttempts");
      } else {
        setError(
          response.message || "Invalid OTP. Please try again.",
        );
      }
    } catch (err: any) {
      setError(
        err.message || "Verification failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle resend OTP
  const handleResendOTP = async () => {
    if (resendCount >= 3) {
      setError(
        "Maximum resend attempts reached. Please try again later.",
      );
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await resendOTP(orderId);
      if (response.success) {
        setResendCount((prev) => prev + 1);
        setCanResend(false);
        setOtp("");
        setError("New OTP has been sent to your email!");
        setTimeout(() => setError(""), 3000);
      } else {
        setError(response.message || "Failed to resend OTP");
      }
    } catch (err: any) {
      setError(err.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  // Calculate remaining attempts
  const remainingAttempts = 3 - resendCount;

  if (success) {
    return (
      <SuccessAnimation
        orderId={orderId}
        amount={amount}
        paymentMethod={paymentMethod}
      />
    );
  }

  if (isBlocked) {
    const hours = Math.floor(blockTimeRemaining / 3600);
    const minutes = Math.floor((blockTimeRemaining % 3600) / 60);

    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-3xl">🔒</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Account Temporarily Blocked
          </h1>
          <p className="text-gray-600 mb-6">
            Too many unsuccessful attempts. For security reasons, OTP
            verification has been temporarily disabled.
          </p>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-red-700 font-medium">
              Try again in: {hours}h {minutes}m
            </p>
          </div>
          <button
            onClick={() => router.push("/")}
            className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <section>
      {/* <nav className="sticky top-0 z-50">
        <SupportNav />
      </nav> */}
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🔐</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Verify Your Order
            </h1>
            <p className="text-gray-600">
              Enter the 6-digit OTP sent to your email
            </p>
            <div className="mt-4 inline-block px-4 py-2 bg-gray-100 rounded-lg">
              <span className="text-sm font-medium text-gray-700">
                Order: <span className="font-bold">{orderId}</span>
              </span>
            </div>
          </div>

          {/* OTP Input */}
          <div className="mb-8">
            <OTPInput
              length={OTP_LENGTH}
              value={otp}
              onChange={setOtp}
              onComplete={handleVerifyOTP}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                error.includes("sent")
                  ? "bg-green-50 border border-green-200 text-green-700"
                  : "bg-red-50 border border-red-200 text-red-700"
              }`}
            >
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Verify Button */}
          <button
            onClick={handleVerifyOTP}
            disabled={loading || otp.length !== OTP_LENGTH}
            className="w-full py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed mb-6"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Verifying...
              </span>
            ) : (
              "Verify OTP"
            )}
          </button>

          {/* Resend Section */}
          <div className="text-center space-y-4">
            <ResendTimer
              initialTime={30}
              onResend={handleResendOTP}
              canResend={canResend}
              setCanResend={setCanResend}
              disabled={resendCount >= 3 || loading}
            />

            {resendCount < 3 && (
              <p className="text-sm text-gray-500">
                {remainingAttempts} resend attempt
                {remainingAttempts !== 1 ? "s" : ""} remaining
              </p>
            )}

            {resendCount >= 3 && (
              <p className="text-sm text-amber-600 font-medium">
                Maximum resend attempts reached
              </p>
            )}
          </div>

          {/* Security Note */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-start space-x-3">
              <span className="text-amber-500 mt-0.5">⚠️</span>
              <div>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Security Tip:</span>{" "}
                  The OTP will expire in 2 minutes. Never share this
                  code with anyone.
                </p>
              </div>
            </div>
            <div className="mt-4">
              {resendCount >= 3 && (
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Notice:</span> We
                  noticed multiple OTP attempts in a short time.
                  Please take a short break and try again later. If
                  you need help, contact our{" "}
                  <a
                    href="/support/help-center"
                    className="text-red-500 font-bold underline"
                  >
                    support team
                  </a>
                  .
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
