"use client";

import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Trash2, Search } from "lucide-react";
import axios from "axios";
import config from "@/lib/config";
import Swal from "sweetalert2";
import { toast } from "sonner";

// Types
interface Variant {
  size: string;
  stock: number;
  sku: string;
}

interface Product {
  productId: string;
  title: string;
  slug: string;
  sku: string;
  quantity: number;
  price: number;
  subtotal: number;
  variant: Variant;
}

interface CustomerInfo {
  fullName: string;
  phone: string;
  email: string;
  address: string;
}

interface OrderData {
  _id: string;
  customerInfo: CustomerInfo;
  products: Product[];
  subtotal: number;
  deliveryCharge: number;
  grandTotal: number;
  paymentMethod: string;
  deliveryMethod: string;
  promoCode: string;
  createdAt: string;
  orderStatus: string;
  paymentStatus: string;
}

interface FormInputs {
  orderStatus: string;
  paymentStatus: string;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  shippingMethod: string;
  courier: string;
  courierTrackingId: string;
  advanceAmount: string;
  orderNote: string;
}

const OrderDetailsPage = ({
  orderData,
}: {
  orderData: OrderData;
}) => {
  const BASE_URL = process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL;

  const [products, setProducts] = useState<Product[]>(
    orderData.products,
  );

  console.log(products);
  const [searchId, setSearchId] = useState<string>("");
  const { control, handleSubmit } = useForm<FormInputs>({
    defaultValues: {
      orderStatus: orderData.orderStatus,
      paymentStatus: orderData.paymentStatus,
      fullName: orderData.customerInfo.fullName,
      phone: orderData.customerInfo.phone,
      email: orderData.customerInfo.email,
      address: orderData.customerInfo.address,
      shippingMethod: orderData.deliveryMethod,
      courier: "",
      courierTrackingId: "",
      advanceAmount: "",
      orderNote: "",
    },
  });

  // const handleDeleteProduct = (productId: string): void => {
  //   setProducts(products.filter((p) => p.productId !== productId));
  // };

  const handleDeleteProduct = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0970B4",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/create-order/delete-order/${id}`,
          );

          if (response.status === 200) {
            setProducts(products.filter((p) => p.productId !== id));
            toast.success(
              response.data.message ?? "Deleted successfully",
            );
          } else {
            alert("Failed to delete the order. Please try again.");
          }
        } catch (error: any) {
          console.error("Delete Error:", error);
          alert(
            error?.response?.data?.message ||
              "Something went wrong while deleting.",
          );
        }
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const handleProductChange = (
    productId: string,
    field: "quantity" | "color" | "size" | "price" | "sku",
    value: string | number,
  ): void => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.productId !== productId) return p;

        // Quantity change
        if (field === "quantity") {
          const qty = parseInt(value as string) || 0;
          return {
            ...p,
            quantity: qty,
            subtotal: qty * p.price,
          };
        }

        // Price change (ROOT LEVEL)
        if (field === "price") {
          const pr = parseFloat(value as string) || 0;
          return {
            ...p,
            price: pr,
            subtotal: p.quantity * pr,
          };
        }

        // Color change
        if (field === "color") {
          return {
            ...p,
            variant: {
              ...p.variant,
              color: value as string,
            },
          };
        }

        // Size change
        if (field === "size") {
          return {
            ...p,
            variant: {
              ...p.variant,
              size: value as string,
            },
          };
        }

        // SKU change
        if (field === "sku") {
          return {
            ...p,
            sku: value as string,
            variant: {
              ...p.variant,
              sku: value as string,
            },
          };
        }

        return p;
      }),
    );
  };

  const onSubmit: SubmitHandler<FormInputs> = async (
    data: FormInputs,
  ) => {
    const updatedOrderData: Partial<OrderData> & Partial<FormInputs> =
      {
        ...orderData,
        ...data,
        products,
        customerInfo: {
          fullName: data.fullName,
          phone: data.phone,
          email: data.email,
          address: data.address,
        },
      };

    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/create-order/update-order/${orderData._id}`,
        updatedOrderData,
      );
      if (res.data.success) {
        toast.success("Order updated successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update order");
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.productId.includes(searchId) ||
      p.title.toLowerCase().includes(searchId.toLowerCase()),
  );

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Order Details
          </h1>
          <p className="text-gray-600">Order ID: {orderData._id}</p>
        </div>

        {/* Status and Search Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Update Status
            </label>
            <Controller
              name="orderStatus"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                >
                  <option value="pending">Pending Order</option>
                  <option value="processing">Processing Order</option>
                  <option value="courier">Courier Order</option>
                  <option value="on-hold">On Hold Order</option>
                  <option value="cancelled">Cancelled Order</option>
                  <option value="return">Return Order</option>
                  <option value="completed">Completed Order</option>
                </select>
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Payment Status
            </label>
            <Controller
              name="paymentStatus"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                >
                  <option value="pending">Pending</option>
                  <option value="success">Success</option>
                </select>
              )}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Search by ID or Title
            </label>
            <div>
              <input
                type="text"
                placeholder="Search order by id or title..."
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              Products
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Product Title
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Size
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Quantity
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Total Price
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr
                    key={product.productId}
                    className="border-b border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          {product.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {product.slug}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={product.variant.size}
                        onChange={(e) =>
                          handleProductChange(
                            product.productId,
                            "size",
                            e.target.value,
                          )
                        }
                        className="w-20 px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-primary"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        value={product.quantity}
                        onChange={(e) =>
                          handleProductChange(
                            product.productId,
                            "quantity",
                            e.target.value,
                          )
                        }
                        className="w-16 px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-primary"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <td className="px-6 py-4">
                        <td className="px-6 py-4">
                          <input
                            type="number"
                            value={product.price}
                            onChange={(e) =>
                              handleProductChange(
                                product.productId,
                                "price",
                                e.target.value,
                              )
                            }
                            className="w-24 px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-primary"
                          />
                        </td>
                      </td>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {(product.quantity * product.price).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() =>
                          handleDeleteProduct(product.productId)
                        }
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Customer & Shipping Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
          {/* Customer Information */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6">
              Customer Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <Controller
                  name="fullName"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                    />
                  )}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone
                </label>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                    />
                  )}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                    />
                  )}
                />
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="mb-8 border-t border-gray-200 pt-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6">
              Address
            </h3>

            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary resize-none"
                />
              )}
            />
          </div>

          {/* Shipping & Courier Details */}
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6">
              Shipping & Courier Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Shipping Method *
                </label>
                <Controller
                  name="shippingMethod"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                    >
                      <option value="inside">Inside Dhaka</option>
                      <option value="outside">Outside Dhaka</option>
                    </select>
                  )}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Courier
                </label>
                <Controller
                  name="courier"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                    >
                      <option value="">Select Courier</option>
                      <option value="pathao">Pathao</option>
                      <option value="redix">Redix</option>
                      <option value="statefast">StateFast</option>
                    </select>
                  )}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Courier Tracking ID
                </label>
                <Controller
                  name="courierTrackingId"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Enter tracking ID"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  )}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Advance Amount
                </label>
                <Controller
                  name="advanceAmount"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="number"
                      placeholder="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  )}
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Order Note
              </label>
              <Controller
                name="orderNote"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    rows={4}
                    placeholder="Add any notes about this order..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  />
                )}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex flex-col md:flex-row gap-4">
            <button
              onClick={handleSubmit(onSubmit)}
              className="px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary transition w-full md:w-auto"
            >
              Update Order
            </button>
            <button
              type="button"
              className="px-8 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition w-full md:w-auto"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
