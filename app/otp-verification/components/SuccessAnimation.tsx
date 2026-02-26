"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { makePayment } from "@/lib/makePayment";

export default function SuccessAnimation({
  orderId,
  amount,
  paymentMethod,
}: {
  orderId: string;
  amount: string;
  paymentMethod: string;
}) {
  const router = useRouter();
  const [counter, setCounter] = useState<number>(3);

  // todo: send bkash payment request from here or send to home if selected cod

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (paymentMethod === "cash") {
            router.push(
              `/thank-you?orderId=${orderId}&amount=${amount}&paymentMethod=${paymentMethod}`,
            );
          } else {
            makePayment({
              orderId,
              amount,
            });
          }
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md w-full text-center">
        {/* Animated Checkmark */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-75"></div>
          <div className="absolute inset-4 bg-emerald-200 rounded-full animate-pulse"></div>
          <div className="relative flex items-center justify-center w-full h-full bg-emerald-500 rounded-full">
            <svg
              className="w-16 h-16 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Verified Successfully! 🎉
        </h1>
        <p className="text-gray-600 mb-8 text-lg">
          Your order has been verified and confirmed.
        </p>

        {/* Redirect Countdown */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <div className="text-sm text-gray-500 mb-2">
            Redirecting to home page in
          </div>
          <div className="text-4xl font-bold text-emerald-600">
            {counter}
          </div>
          <div className="text-xs text-gray-400 mt-2">seconds</div>
        </div>

        {/* Manual Redirect Button */}
        <button
          onClick={() =>
            router.push(
              `/thank-you?orderId=${orderId}&amount=${amount}&paymentMethod=${paymentMethod}`,
            )
          }
          className="w-full py-3 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 transition duration-200"
        >
          Go to Home Now
        </button>
      </div>
    </div>
  );
}
