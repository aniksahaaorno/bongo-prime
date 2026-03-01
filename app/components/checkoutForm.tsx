"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  clearCart,
  getCart,
  updateCartItems,
} from "@/utils/cartStorage";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { fraudRoles } from "./fackOuterCheckLayer";
import { makePayment } from "@/lib/makePayment";

export interface CartItem {
  selectedProductSize: string;
  quantity: number;
  selectedColor: string;
  selectedVariant: {
    size: string;
    stock: number;
    sku: string;
    price: number | null; // because it can be null
  } | null;
  sku: string;
  productPrice: number;
  slug: string;
  title: string;
  thumbnail: string;
}

interface IFrodState {
  invalidFields: string[];
  invalidCount: number;
  fieldErrorCount: {
    name: number;
    phone: number;
    email: number;
    address: number;
  };
}

export default function CheckoutForm() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    fullAddress: "",
    phoneNumber: "",
    email: "",
    promoCode: "",
  });

  const [deliveryMethod, setDeliveryMethod] = useState("inside");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fraudState, setFraudState] = useState<IFrodState>({
    invalidCount: 0,
    invalidFields: [],
    fieldErrorCount: {
      name: 0,
      phone: 0,
      email: 0,
      address: 0,
    },
  });

  useEffect(() => {
    const saveFraudData = async () => {
      await axios.put(
        `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/api/update-fraud-user`,
        fraudState,
      );
    };

    if (fraudState.invalidCount > 0) {
      saveFraudData();
    }
  }, [fraudState]);

  let localInvalidCount = 0;
  let localInvalidFields: string[] = [];

  function markLocal(field: string) {
    localInvalidCount++;
    if (!localInvalidFields.includes(field)) {
      localInvalidFields.push(field);
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const updateCart = () => {
      const latestCart = getCart();
      setCartItems((prev) =>
        JSON.stringify(prev) !== JSON.stringify(latestCart)
          ? latestCart
          : prev,
      );
    };

    updateCart();
    window.addEventListener("cart_updated", updateCart);
    return () =>
      window.removeEventListener("cart_updated", updateCart);
  }, []);

  const handleQuantityChange = (
    index: number,
    newQuantity: number,
  ) => {
    if (newQuantity < 1) return;

    const updatedItems = [...cartItems];
    updatedItems[index].quantity = newQuantity;

    setCartItems(updatedItems);
    updateCartItems(updatedItems);
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedItems);

    // sync localStorage immediately
    updateCartItems(updatedItems);
  };

  const subtotal = cartItems.reduce((total, item) => {
    const price = item.selectedVariant?.price ?? item.productPrice;

    return total + price * item.quantity;
  }, 0);

  const deliveryCharge = deliveryMethod === "inside" ? 80 : 130;

  const grandTotal = subtotal + deliveryCharge;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // reset local counters each submit
    localInvalidCount = 0;
    localInvalidFields = [];

    // Fraud validation

    if (!fraudRoles.isValidBDPhone(formData.phoneNumber)) {
      markLocal("phone");
    }

    if (!fraudRoles.isValidEmail(formData.email)) {
      markLocal("email");
    }

    if (!fraudRoles.isValidAddress(formData.fullAddress)) {
      markLocal("address");
    }

    // update fraud state
    setFraudState((prev) => ({
      ...prev,
      invalidCount: prev.invalidCount + localInvalidCount,
      invalidFields: [
        ...new Set([...prev.invalidFields, ...localInvalidFields]),
      ],
      fieldErrorCount: {
        ...prev.fieldErrorCount,
        name:
          prev.fieldErrorCount.name +
          (localInvalidFields.includes("name") ? 1 : 0),
        phone:
          prev.fieldErrorCount.phone +
          (localInvalidFields.includes("phone") ? 1 : 0),
        email:
          prev.fieldErrorCount.email +
          (localInvalidFields.includes("email") ? 1 : 0),
        address:
          prev.fieldErrorCount.address +
          (localInvalidFields.includes("address") ? 1 : 0),
      },
    }));

    if (localInvalidCount > 0) {
      toast.error(
        `Invalid field${localInvalidCount > 1 ? "s" : ""}: ${localInvalidFields.join(", ")}`,
      );
      return;
    }

    // Required check
    const requiredFields: (keyof typeof formData)[] = [
      "fullName",
      "phoneNumber",
      "email",
      "fullAddress",
    ];

    const missingField = requiredFields.find(
      (field) => !formData[field]?.trim(),
    );

    if (missingField) {
      toast.error(`${missingField} is required`);
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    const orderData = {
      customerInfo: {
        fullName: formData.fullName,
        phone: formData.phoneNumber,
        email: formData.email,
        address: formData.fullAddress,
      },
      products: cartItems.map((item) => ({
        productTitle: item.title,
        slug: item.slug,
        sku: item.sku,
        price: item.selectedVariant?.price ?? item.productPrice,
        quantity: item.quantity,
        variant: item.selectedVariant,
        color: item.selectedColor,
        size: item.selectedProductSize,
      })),
      subtotal,
      deliveryCharge,
      grandTotal,
      paymentMethod,
      deliveryMethod,
      promoCode: formData.promoCode,
      orderStatus: "pending",
      paymentStatus: "pending",
      sourceUrl: window.location.href,
    };

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/create-order`,
        orderData,
      );

      if (response.data.isRedirect) {
        router.push(
          `/otp-verification?orderId=${response.data.orderId}&amount=${grandTotal}&paymentMethod=${paymentMethod}`,
        );
        toast.error("OTP verification required. Redirecting...");
        return;
      }

      if (response.data.success) {
        Swal.fire({
          title: response.data.message,
          text: `Order Id : ${response.data.orderId}`,
          icon: "success",
        });

        clearCart();

        if (paymentMethod === "cash") {
          router.push(
            `/thank-you?orderId=${response.data.orderId}&amount=${grandTotal}&paymentMethod=${paymentMethod}`,
          );
          return;
        }

        makePayment({
          orderId: response.data.orderId,
          amount: grandTotal,
        });

        /* router.push(
          `/thank-you?orderId=${response.data.orderId}&amount=${grandTotal}&paymentMethod=${paymentMethod}`,
        ); */
      }
    } catch (error: any) {
      console.error("Order submission error:", error);

      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again later.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-12">
      <form onSubmit={handleSubmit}>
        <div className="mx-auto max-w-7xl">
          {/* Main Grid - Responsive */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            {/* Left Column - Form */}
            <div className="space-y-6 lg:col-span-3">
              {/* Customer Information */}
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">
                  কাস্টমার তথ্য:
                </h2>

                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      নাম <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      name="fullName"
                      placeholder="আপনার নাম লিখুন"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full border-gray-300 bg-gray-50"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      ফোন নম্বর{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="tel"
                      name="phoneNumber"
                      placeholder="আপনার ফোন নম্বর লিখুন"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full border-gray-300 bg-gray-50"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      ইমেইল <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="আপনার ইমেইল লিখুন"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full border-gray-300 bg-gray-50"
                    />
                  </div>

                  {/* Full Address */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      সম্পুর্ণ ঠিকানা{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="fullAddress"
                      placeholder="হাউজ/রোড/এলাকা/জেলা লিখুন"
                      value={formData.fullAddress}
                      onChange={handleInputChange}
                      className="h-[100px] w-full border-gray-300 bg-gray-50 p-2 rounded"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">
                  প্রোমো কোড:
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      এপ্লাই কুপন/প্রোমো
                    </label>
                    <Input
                      type="text"
                      name="promoCode"
                      placeholder="COUPON123"
                      value={formData.promoCode}
                      onChange={handleInputChange}
                      className="w-full border-gray-300 bg-gray-50"
                    />
                  </div>
                  <button
                    type="button"
                    className="w-full text-white bg-primary rounded-xl py-2 hover:bg-accent-foreground font-semibold hover:cursor-pointer"
                  >
                    এপ্লাই করুন
                  </button>
                </div>
              </div>

              {/* Delivery Method */}
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">
                  ডেলিভারি মেথড
                </h2>
                <div className="space-y-3">
                  <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-3 hover:bg-gray-50">
                    <input
                      type="radio"
                      name="delivery"
                      value="inside"
                      checked={deliveryMethod === "inside"}
                      onChange={(e) =>
                        setDeliveryMethod(e.target.value)
                      }
                      className="h-4 w-4"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        ঢাকার ভিতরে
                      </p>
                      <p className="text-xs text-gray-500">২-৩ দিন</p>
                    </div>
                    <span className="font-semibold text-gray-900">
                      ৳80.00
                    </span>
                  </label>

                  <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-3 hover:bg-gray-50">
                    <input
                      type="radio"
                      name="delivery"
                      value="outside"
                      checked={deliveryMethod === "outside"}
                      onChange={(e) =>
                        setDeliveryMethod(e.target.value)
                      }
                      className="h-4 w-4"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        ঢাকার বাহিরে
                      </p>
                      <p className="text-xs text-gray-500">৩-৪ দিন</p>
                    </div>
                    <span className="font-semibold text-gray-900">
                      ৳130.00
                    </span>
                  </label>
                </div>
              </div>

              {/* Payment Method */}
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">
                  পেমেন্ট মেথড
                </h2>
                <p className="mb-4 text-xs text-gray-600">
                  সকল ট্রানজেকশন নিরাপদ এবং এনক্রিপ্ট করা
                </p>

                <div className="space-y-4">
                  {/* Cash on Delivery */}
                  <label className="block cursor-pointer">
                    <div className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="cash"
                        checked={paymentMethod === "cash"}
                        onChange={(e) =>
                          setPaymentMethod(e.target.value)
                        }
                        className="h-4 w-4"
                      />
                      <span className="flex-1 font-medium text-gray-900">
                        ক্যাশ অন ডেলিভারি
                      </span>
                    </div>
                  </label>

                  {/* bkash */}
                  <label className="block cursor-pointer">
                    <div className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 bg-gray-50 opacity-60 cursor-not-allowed">
                      <input
                        type="radio"
                        name="payment"
                        value="bkash"
                        checked={paymentMethod === "bkash"}
                        onChange={(e) =>
                          setPaymentMethod(e.target.value)
                        }
                        className="h-4 w-4 cursor-not-allowed"
                        disabled
                      />
                      <span className="flex-1 font-medium text-gray-500">
                        বিকাশ - coming soon
                      </span>
                      <div className="flex gap-2">
                        <span className="inline-block">
                          <img
                            src="https://i.postimg.cc/C1Q00cqc/BKash-b-Kash2-Logo-wine-removebg-preview.png"
                            alt="bkash"
                            className="h-20 w-30 opacity-50"
                          />
                        </span>
                      </div>
                    </div>
                  </label>

                  {/* SSLCOMMERZ */}
                  {/* <label className="block cursor-pointer">
                    <div className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="sslcommerz"
                        checked={paymentMethod === "sslcommerz"}
                        // onChange={(e) => setPaymentMethod(e.target.value)}
                        className="h-4 w-4"
                      />
                      <span className="flex-1 font-medium text-gray-900">
                        SSLCOMMERZ
                      </span>
                      <div className="flex gap-2">
                        <span className="inline-block h-6 w-9 rounded bg-primary text-xs font-bold text-white items-center justify-center">
                          V
                        </span>
                        <span className="inline-block h-6 w-9 rounded bg-red-600 text-xs font-bold text-white items-center justify-center">
                          M
                        </span>
                        <span className="inline-block h-6 w-9 rounded bg-purple-600 text-xs font-bold text-white items-center justify-center">
                          AM
                        </span>
                      </div>
                    </div>
                  </label> */}
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Cart Items */}
                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <div className="space-y-4">
                    {cartItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex gap-4 border-b pb-4 last:border-b-0 last:pb-0"
                      >
                        <img
                          src={item.thumbnail || "/placeholder.svg"}
                          alt={item.title}
                          className="h-20 w-20 rounded-lg bg-gray-100 object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-gray-900">
                            {item.title}
                          </h3>
                          <p className="mt-1 text-sm font-semibold text-gray-900">
                            ৳{" "}
                            {(
                              item.productPrice * item.quantity
                            ).toLocaleString("en-BD")}
                          </p>
                          <div className="mt-2 flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1 rounded-md border border-gray-300">
                              <button
                                type="button"
                                onClick={() =>
                                  handleQuantityChange(
                                    index,
                                    item.quantity - 1,
                                  )
                                }
                                className="p-1 hover:bg-gray-100"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="w-8 text-center text-sm font-medium">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  handleQuantityChange(
                                    index,
                                    item.quantity + 1,
                                  )
                                }
                                className="p-1 hover:bg-gray-100"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <h2 className="mb-4 text-lg font-semibold text-gray-900">
                    অর্ডার সামারি
                  </h2>
                  <div className="space-y-3 border-b pb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        মোট প্রোডাক্ট:
                      </span>
                      <span className="font-medium text-gray-900">
                        {cartItems.length.toString().padStart(2, "0")}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">সাবটোটাল</span>
                      <span className="font-medium text-gray-900">
                        ৳ {subtotal.toLocaleString("en-BD")}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        ডেলিভারি চার্জ
                      </span>
                      <span className="font-medium text-gray-900">
                        ৳ {deliveryCharge}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4 text-base font-bold">
                    <span className="text-gray-900">
                      গ্রান্ড টোটাল
                    </span>
                    <span className="text-gray-900">
                      ৳ {grandTotal.toLocaleString("en-BD")}
                    </span>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-6 w-full bg-primary py-2 text-white hover:bg-accent-foreground hover:cursor-pointer font-semibold"
                  >
                    {isSubmitting
                      ? "অর্ডার প্লেস করা হচ্ছে..."
                      : "অর্ডার প্লেস করুন"}
                  </Button>

                  <p className="mt-3 text-center text-xs text-gray-500">
                    <a
                      href="#"
                      className="underline hover:text-gray-700"
                    >
                      টার্ম অ্যান্ড কন্ডিশনস পরুন
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
