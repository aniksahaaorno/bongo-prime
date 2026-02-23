"use client";

import React, { useState } from "react";
import {
  Eye,
  Edit2,
  Printer,
  Trash2,
  MapPin,
  Calendar,
  Package,
  X,
  History,
  Send,
} from "lucide-react";
import { ComLogo } from "@/app/shared/components/ComLogo";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getOrderStatusClass } from "./OrdersTable";
import axios from "axios";
import { toast } from "sonner";

// ============ TYPE DEFINITIONS ============
interface CustomerInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

interface ShippingAddress {
  street: string;
  city: string;
  region: string;
  postalCode: string;
}

interface VariantAttributes {
  color?: string;
  size?: string;
  [key: string]: string | undefined;
}

interface OrderVariant {
  attributes: VariantAttributes;
  sku: string;
  stock: number;
}

interface OrderProduct {
  productId: string;
  title: string;
  slug: string;
  quantity: number;
  price: number;
  subtotal: number;
  variant: OrderVariant;
}
export interface Order {
  _id: string;
  customerInfo: CustomerInfo;
  shippingAddress: ShippingAddress;
  products: OrderProduct[];
  subtotal: number;
  deliveryCharge: number;
  grandTotal: number;
  paymentMethod: string;
  deliveryMethod: string;
  promoCode: string;
  createdAt: string;
  courierName?: string;
  courierStatus?: string;
  note?: string;
  orderStatus?: "pending" | "confirmed" | "shipped" | "delivered";
  paymentStatus?: "pending" | "paid";
  courier?: {};
  FakeOrderStatus: string;
  isEmailVerified: boolean;
  customerIp: string;
}

// ============ ORDER DETAIL MODAL ============
interface OrderDetailModalProps {
  open: boolean | null;
  order: Order | null;
  onClose: () => void;
}
interface AssignCourierModalProps {
  open: boolean | null;
  order: Order | null;
  onClose: () => void;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  open,
  order,
  onClose,
}) => {
  if (!open) return null;
  if (!order) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };






  const fullAddress = `${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.region}, ${order.shippingAddress.postalCode}`;

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-y-auto">
        <div
          className="sticky top-0 px-6 py-4 border-b border-gray-200 flex justify-between items-center"
          style={{ backgroundColor: "#0970B4" }}
        >
          <div>
            <h2 className="text-2xl font-bold text-white">
              Order Details
            </h2>
            <p className="text-blue-100 text-sm mt-1">
              ID: {order._id}
            </p>
            {/* <p className="text-blue-100 text-sm mt-1">ID: {order.slug}</p> */}
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-red-400 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center text-2xl"
          >
            <X />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Customer
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-600">Name</p>
                  <p className="font-semibold text-gray-900">
                    {order.customerInfo.firstName}{" "}
                    {order.customerInfo.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Email</p>
                  <p className="font-semibold text-gray-900">
                    {order.customerInfo.email}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Phone</p>
                  <p className="font-semibold text-gray-900">
                    {order.customerInfo.phone}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin size={20} />
                Address
              </h3>
              <p className="text-sm text-gray-900 font-semibold">
                {fullAddress}
              </p>
              <p className="text-xs text-gray-600 mt-2">
                Delivery:{" "}
                <span className="capitalize">
                  {order.deliveryMethod === "inside"
                    ? "Inside Dhaka"
                    : "Outside Dhaka"}
                </span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-3 rounded-lg border border-green-200 text-center">
              <p className="text-xs text-gray-600">Order Status</p>
              <p className="text-sm font-semibold text-gray-900 capitalize mt-1">
                {order.orderStatus || "pending"}
              </p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg border border-orange-200 text-center">
              <p className="text-xs text-gray-600">Payment Status</p>
              <p className="text-sm font-semibold text-gray-900 capitalize mt-1">
                {order.paymentStatus || "pending"}
              </p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg border border-purple-200 text-center">
              <p className="text-xs text-gray-600">Payment Method</p>
              <p className="text-sm font-semibold text-gray-900 capitalize mt-1">
                {order.paymentMethod}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
            <Calendar size={18} className="text-primary" />
            <span>
              <strong>Ordered on:</strong>{" "}
              {formatDate(order.createdAt)}
            </span>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Package size={20} />
              Order Items
            </h3>
            <div className="space-y-3">
              {order.products.map((product, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-600 font-semibold mb-1">
                        PRODUCT
                      </p>
                      <p className="font-semibold text-gray-900">
                        {product.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {product.slug}
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <p className="text-xs text-gray-600 font-semibold mb-1">
                          SKU
                        </p>
                        <p className="font-mono text-sm font-semibold text-gray-900">
                          {product.variant.sku}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 font-semibold mb-1">
                          QTY
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                          {product.quantity}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 font-semibold mb-1">
                          SUBTOTAL
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                          ৳{product.subtotal.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 pt-3 border-t border-gray-200">
                    <p className="font-semibold">
                      Variant:{" "}
                      {Object.entries(product.variant.attributes)
                        .map(([k, v]) => `${k}: ${v}`)
                        .join(", ")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-linear-to-br from-blue-50 to-blue-100 p-6 rounded-lg border-2 border-blue-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Order Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-700">Subtotal</span>
                <span className="font-semibold text-gray-900">
                  ৳{order.subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Delivery</span>
                <span className="font-semibold text-gray-900">
                  ৳{order.deliveryCharge.toFixed(2)}
                </span>
              </div>
              <div className="border-t-2 border-blue-300 pt-3 flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">
                  Total
                </span>
                <span
                  className="text-3xl font-bold"
                  style={{ color: "#0970B4" }}
                >
                  ৳{order.grandTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex gap-3 justify-end sticky bottom-0">
          <button
            onClick={() => window.print()}
            className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Print
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg font-medium text-white transition-colors"
            style={{ backgroundColor: "#0970B4" }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const AssignCourierModal: React.FC<AssignCourierModalProps> = ({
  open,
  order,
  onClose,
}) => {
  if (!open) return;
  if (!order) return;

  const [courier, setCourier] = React.useState("steadfast");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/courier/assign?courierService=${courier}&orderId=${order._id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      },
    );

    const data = await res.json();

    if (!data.success) {
      alert("Failed to assign courier");
      return;
    }

    alert(data.message);
  };

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="relative w-full h-full bg-white rounded-lg p-6 flex flex-col justify-center gap-4 max-w-md mx-auto max-h-min"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold">Assign to Courier</h2>

        <select
          className="w-full border rounded-md p-2"
          value={courier}
          onChange={(e) => setCourier(e.target.value)}
        >
          <option value="">Select courier</option>
          <option value="steadfast">Stead Fast</option>
          <option value="pathao">Pathao</option>
        </select>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

// ============ MAIN ORDER TABLE COMPONENT ============
const AllProductTable = ({
  INITIAL_ORDERS,
}: {
  INITIAL_ORDERS: Order[];
}) => {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(
    null,
  );



  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>(
    [],
  );

  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [courierModalOpen, setCourierModalOpen] = useState(false);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  const getFullAddress = (address: ShippingAddress) =>
    `${address.street}, ${address.city}, ${address.region}`;

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?",
    );
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/create-order/delete-order/${id}`,
      );

      if (response.status === 200) {
        setOrders((prevOrders) =>
          prevOrders.filter((o) => o._id !== id),
        );
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
  };

  const handlePrint = (order: Order): void => {
    const logoUrl =
      "https://res.cloudinary.com/dqyfwfeed/image/upload/v1768827949/cc8lg5jdyacwfecagecg.png";
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(
        `<html><head>
        <title>Order #${order._id}</title> 
        
        <div><img src="${logoUrl}" style="max-width: 150px; height: auto;"/></div> <style>body{font-family:Arial;margin:40px;color:#333;}h1{color:#0970B4;}table{width:100%;border-collapse:collapse;margin:20px 0;}th,td{padding:10px;text-align:left;border:1px solid #ddd;}th{background:#0970B4;color:white;}.total{font-weight:bold;font-size:18px;}.section{margin:20px 0;padding:15px;border:1px solid #ddd;border-radius:5px;}</style></head><body><h1>Order Details</h1><p><strong>Order ID:</strong> ${
          order._id
        }</p><div class="section"><h3>Customer</h3><p><strong>Name:</strong> ${
          order.customerInfo.firstName
        } ${order.customerInfo.lastName}</p><p><strong>Email:</strong> ${
          order.customerInfo.email
        }</p><p><strong>Phone:</strong> ${
          order.customerInfo.phone
        }</p></div><div class="section"><h3>Address</h3><p>${getFullAddress(
          order.shippingAddress,
        )}, ${
          order.shippingAddress.postalCode
        }</p></div><div class="section"><h3>Items</h3><table><tr><th>Product</th><th>SKU</th><th>Qty</th><th>Price</th><th>Subtotal</th></tr>${order.products
          .map(
            (p) =>
              `<tr><td>${p.title}</td><td>${p.variant.sku}</td><td>${
                p.quantity
              }</td><td>৳${p.price.toFixed(2)}</td><td>৳${p.subtotal.toFixed(
                2,
              )}</td></tr>`,
          )
          .join(
            "",
          )}</table></div><div class="section"><p>Subtotal: <strong>৳${order.subtotal.toFixed(
          2,
        )}</strong></p><p>Delivery: <strong>৳${order.deliveryCharge.toFixed(
          2,
        )}</strong></p><p class="total">Grand Total: ৳${order.grandTotal.toFixed(
          2,
        )}</p></div></body></html>`,
      );
      printWindow.document.close();
      printWindow.print();
    }
  };

  const toggleOrderSelection = (orderId: string) => {
    setSelectedOrderIds((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId],
    );
  };

  const handleGetSelectedOrders = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/courier/assign/bulk?courierService=steadfast`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedOrderIds),
      },
    );

    const data = await res.json();

    if (!data.success) {
      alert("Failed to assign courier in bulk");
      return;
    }

    alert(data.message);
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-400 mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Orders
            </h1>
            <p className="text-gray-600 mt-2">
              Manage and track customer orders
            </p>
          </div>

          {selectedOrderIds.length > 0 && (
            <button
              onClick={handleGetSelectedOrders}
              className="bg-primary p-2 px-4 font-semibold rounded text-white"
            >
              Assign courier
            </button>
          )}
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b-2 border-gray-300">
                <tr>
                  <th className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={
                        orders.length > 0 &&
                        selectedOrderIds.length === orders.length
                      }
                      onChange={(e) =>
                        setSelectedOrderIds(
                          e.target.checked ? orders.map((o) => o._id) : [],
                        )
                      }
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Customer
                  </th>
                  {/* <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Location
                  </th> */}
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    SKU
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Qty
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Total
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Fraud Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    isEmailVerification
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Payment Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders?.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedOrderIds.includes(order._id)}
                        onChange={() => toggleOrderSelection(order._id)}
                      />
                    </td>

                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-gray-900">
                        {order.customerInfo.firstName}{" "}
                        {order.customerInfo.lastName}
                      </div>
                      {/* <div className="text-xs text-gray-500">
                        {order.customerInfo.email}
                      </div> */}
                    </td>
                    {/* <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {getFullAddress(order.shippingAddress)}
                      </div>
                    </td> */}
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {order.products[0]?.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        {order.products.length > 1 &&
                          `+${order.products.length - 1} more`}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-mono text-gray-900">
                        {order.products[0]?.variant.sku}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-gray-900">
                        {order.products.reduce((sum, p) => sum + p.quantity, 0)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-gray-900">
                        ৳{order.grandTotal?.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">
                        {formatDate(order.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <Badge
                          className={`text-xs flex justify-center ${getOrderStatusClass(
                            order.orderStatus,
                          )}`}
                        >
                          {order.orderStatus}
                        </Badge>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <Badge
                          className={`text-xs flex justify-center ${getOrderStatusClass(
                            order.FakeOrderStatus,
                          )}`}
                        >
                          {order.FakeOrderStatus}
                        </Badge>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <Badge
                          className={`text-xs flex justify-center ${getOrderStatusClass(
                            order.orderStatus ? "TRUE": "FALSE",
                          )}`}
                        >
                          {order.isEmailVerified ? "True" : "False"}
                        </Badge>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col justify-center items-center gap-1">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            order.paymentStatus === "pending"
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {order.paymentStatus || "pending"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setOrderModalOpen(true);
                          }}
                          className="p-2 hover:bg-blue-50 rounded-lg text-primary"
                          title="View"
                        >
                          <Eye size={18} />
                        </button>
                        <Link href={`/admin/order/edit/${order._id}`}>
                          <button
                            // onClick={() => alert("Edit coming soon")}
                            className="p-2 hover:bg-green-50 rounded-lg text-green-600"
                            title="Edit"
                          >
                            <Edit2 size={18} />
                          </button>
                        </Link>
                        <button
                          onClick={() => handlePrint(order)}
                          className="p-2 hover:bg-purple-50 rounded-lg text-purple-600"
                          title="Print"
                        >
                          <Printer size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(order._id)}
                          className="p-2 hover:bg-red-50 rounded-lg text-red-600"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>

                        <Link
                          href={`/admin/order/history/${order.customerInfo.phone}`}
                        >
                          <button
                            // onClick={() => handleDelete(order._id)}
                            className="p-2 hover:bg-red-50 rounded-lg text-red-600"
                            title="Delete"
                          >
                            <History size={18} />
                          </button>
                        </Link>
                        <button
                          disabled={!!order?.courier}
                          onClick={() => {
                            setCourierModalOpen(true);
                            setSelectedOrder(order);
                          }}
                          className={`p-2 hover:bg-green-50 rounded-lg ${!!order.courier ? "text-gray-600" : "text-green-600"}`}
                          title={
                            !!order.courier
                              ? "Already Assigned"
                              : "Assign to courier"
                          }
                        >
                          <Send size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile & Tablet Cards */}
        <div className="lg:hidden space-y-4">
          {orders?.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
            >
              <div className="p-4 md:p-6">
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <h3 className="text-base font-semibold text-gray-900">
                    {order.customerInfo.firstName} {order.customerInfo.lastName}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 mt-1">
                    {order.customerInfo.email}
                  </p>
                </div>

                <div className="mb-4 pb-4 border-b border-gray-200">
                  <p className="text-xs font-semibold text-gray-700 mb-1">
                    📍 LOCATION
                  </p>
                  <p className="text-sm text-gray-900">
                    {getFullAddress(order.shippingAddress)}
                  </p>
                </div>

                <div className="mb-4 pb-4 border-b border-gray-200 space-y-2">
                  {order.products.map((product, idx) => (
                    <div key={idx}>
                      <p className="text-xs font-semibold text-gray-700 mb-1">
                        PRODUCT {idx + 1}
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        {product.title}
                      </p>
                      <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
                        <div>
                          <p className="text-gray-600">SKU</p>
                          <p className="font-mono font-semibold text-gray-900">
                            {product.variant.sku}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Qty</p>
                          <p className="font-semibold text-gray-900">
                            {product.quantity}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Subtotal</p>
                          <p className="font-semibold text-gray-900">
                            ৳{product.subtotal}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mb-4 pb-4 border-b border-gray-200 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total:</span>
                    <span className="text-lg font-semibold text-gray-900">
                      ৳{order.grandTotal?.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Date:</span>
                    <span className="text-gray-900">
                      {formatDate(order.createdAt)}
                    </span>
                  </div>
                </div>

                <div className="mb-4 flex gap-2">
                  <span
                    className={`flex-1 text-center py-1 rounded text-xs font-semibold ${
                      order.orderStatus === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {order.orderStatus || "pending"}
                  </span>
                  <span
                    className={`flex-1 text-center py-1 rounded text-xs font-semibold ${
                      order.paymentStatus === "pending"
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {order.paymentStatus || "pending"}
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="py-2 bg-blue-50 text-primary rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium flex items-center justify-center"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => alert("Edit coming soon")}
                    className="py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium flex items-center justify-center"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handlePrint(order)}
                    className="py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium flex items-center justify-center"
                  >
                    <Printer size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(order._id)}
                    className="py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium flex items-center justify-center"
                  >
                    <Trash2 size={16} />
                  </button>
                  <button
                    // onClick={() => handleDelete(order._id)}
                    className="py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium flex items-center justify-center"
                    title="Delete"
                  >
                    <History size={18} />
                  </button>
                  <button
                    disabled={!!order?.courier}
                    onClick={() => {
                      setCourierModalOpen(true);
                      setSelectedOrder(order);
                    }}
                    className="p-2 hover:bg-green-50 rounded-lg text-green-600"
                    title="Assign to courier"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <OrderDetailModal
        open={orderModalOpen}
        order={selectedOrder}
        onClose={() => setOrderModalOpen(false)}
      />

      <AssignCourierModal
        open={courierModalOpen}
        order={selectedOrder}
        onClose={() => setCourierModalOpen(false)}
      />
    </div>
  );
};

export default AllProductTable;
