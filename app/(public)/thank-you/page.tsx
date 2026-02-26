"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Package, CreditCard } from "lucide-react";

export default function ThankYou() {
  const searchParams = useSearchParams();

  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");
  const paymentMethod = searchParams.get("paymentMethod");

  // Basic validation
  if (!orderId || !amount || !paymentMethod) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4">Invalid Access</h2>
          <p className="text-gray-500 mb-6">
            No order information found.
          </p>
          <Link
            href="/shop"
            className="px-6 py-3 bg-black text-white rounded-lg"
          >
            Go to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="max-w-2xl w-full bg-white shadow-xl rounded-2xl p-8 text-center">
        
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <CheckCircle className="text-green-500 w-20 h-20" />
        </div>

        <h1 className="text-3xl font-bold mb-2">
          Payment Successful 🎉
        </h1>

        <p className="text-gray-600 mb-8">
          Thank you! Your order has been confirmed.
        </p>

        {/* Order Details */}
        <div className="bg-gray-100 rounded-xl p-6 text-left space-y-4 mb-8">
          
          <div className="flex justify-between">
            <span className="text-gray-500">Order ID</span>
            <span className="font-semibold">{orderId}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Total Amount</span>
            <span className="font-semibold">৳ {amount}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500 flex items-center gap-2">
              <CreditCard size={16} />
              Payment Method
            </span>
            <span className="font-semibold capitalize">
              {paymentMethod}
            </span>
          </div>
        </div>

        {/* Status Info */}
        <div className="flex items-center justify-center gap-3 bg-green-50 text-green-700 p-4 rounded-lg mb-8">
          <Package size={20} />
          <span>Your order is now being processed.</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/shop/all"
            className="px-6 py-3 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition"
          >
            Continue Shopping
          </Link>

          <Link
            href={`/order-tracking`}
            className="px-6 py-3 rounded-lg border border-black font-medium hover:bg-gray-100 transition"
          >
            Track Order
          </Link>
        </div>
      </div>
    </div>
  );
}