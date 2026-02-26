"use client";

import { Eye, Edit, Printer, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import type { Order } from "./types";
import {
  formatDate,
  getStatusBadgeVariant,
  getStatusBadgeVariant2,
} from "./utlis";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import Swal from "sweetalert2";

interface OrdersCardsProps {
  orders: Order[];
  selectedOrders: Set<string>;
  onToggleOrderSelection: (orderId: string) => void;
}

const courierStatusColors: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-800",
  "In Transit": "bg-blue-100 text-blue-800",
  Delivered: "bg-green-100 text-green-800",
  Failed: "bg-red-100 text-red-800",
};

export default function OrdersCards({
  orders,
  selectedOrders,
  onToggleOrderSelection,
}: OrdersCardsProps) {

  const [primaryOrders, setPrimaryOrders] = useState<Order[]>(orders);

  const handleAction = (action: string, orderId: string) => {
    switch (action) {
      case "view":
        alert(`View order: ${orderId}`);
        break;
      case "edit":
        alert(`Edit order: ${orderId}`);
        break;
      case "print":
        window.print();
        break;
      // case "delete":
      //   alert(`Delete order: ${orderId}`);
      //   break;
    }
  };

  const handleDelete = (id: string) => {
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
            `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/create-order/delete-order/${id}`
          );

          if (response.status === 200) {
             setPrimaryOrders((prevOrders) =>
               prevOrders.filter((o) => o._id !== id)
             );
            toast.success(response.data.message ?? "Deleted successfully");
          } else {
            alert("Failed to delete the order. Please try again.");
          }
        } catch (error: any) {
          console.error("Delete Error:", error);
          alert(
            error?.response?.data?.message ||
              "Something went wrong while deleting."
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

  if (primaryOrders.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground text-sm">
        No orders found
      </div>
    );
  }

  console.log(primaryOrders)

  return (
    <div className="space-y-3">
      {primaryOrders.map((order) => (
        <div
          key={order._id}
          className={`border rounded-lg p-4 transition-colors ${
            selectedOrders.has(order._id)
              ? "bg-blue-50 border-blue-300"
              : "bg-white border-gray-200 hover:bg-gray-50"
          }`}
        >
          {/* Checkbox and Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start gap-3 flex-1">
              <Checkbox
                checked={selectedOrders.has(order._id)}
                onCheckedChange={() => onToggleOrderSelection(order._id)}
                className="mt-1"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-gray-900">
                  {order.customerInfo.fullName}
                </h3>
                <p className="text-xs text-gray-500">
                  {order.customerInfo.phone}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-mono text-xs font-semibold text-gray-700">
                {order._id.slice(-6).toUpperCase()}
              </p>
            </div>
          </div>

          {/* Order Details Grid */}
          <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
            <div className="space-y-1">
              <p className="text-gray-500">Date</p>
              <p className="font-medium text-gray-900">
                {formatDate(order.createdAt)}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500">Quantity</p>
              <p className="font-medium text-gray-900">{order.products?.reduce((sum, p) => sum + p.quantity, 0)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500">Courier</p>
              <p className="font-medium text-gray-900">{order.courierName}</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500">Total</p>
              <p className="font-medium text-gray-900">
                ৳
                {order?.grandTotal ? order.grandTotal.toLocaleString("en-BD", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                }): "-"}
              </p>
            </div>
          </div>

          {/* Courier and Order Status */}
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge
              className={`text-xs ${
                courierStatusColors[order.courierStatus] ||
                "bg-gray-100 text-gray-800"
              }`}
            >
              {order.courierStatus}
            </Badge>
            <Badge
              variant={getStatusBadgeVariant2(order.orderStatus)}
              className="text-xs"
            >
              {" "}
              Order Status : {order.orderStatus.toUpperCase()}
            </Badge>
          </div>

          {/* Note */}
          {order.note && (
            <div className="mb-3 p-2 bg-gray-100 rounded text-xs text-gray-700">
              <p className="font-medium text-gray-600 mb-1">Note:</p>
              <p>{order.note}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            {/* <Button
              variant="outline"
              size="sm"
              onClick={() => handleAction("view", order._id)}
              className="flex-1 text-xs h-8"
            >
              <Eye className="h-3 w-3 mr-1" />
              View
            </Button> */}
            <Link href={`/admin/order/edit/${order._id}`}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAction("edit", order._id)}
                className="flex-1 text-xs h-8"
              >
                <Edit className="h-3 w-3 mr-1" />
                Edit
              </Button>
            </Link>
            <Link href={`/admin/order/edit/${order._id}`}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAction("edit", order._id)}
                className="flex-1 text-xs h-8"
              >
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
            </Link>

            <Button
              variant="outline"
              size="sm"
              onClick={()=> handleDelete(order._id)}
              className="text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>

            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-8 px-2 bg-transparent"
                >
                  ⋯
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem
                  onClick={() => handleAction("print", order._id)}
                >
                  <Printer className="mr-2 h-4 w-4" />
                  Print
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleAction("delete", order._id)}
                  className="text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
          </div>
        </div>
      ))}
    </div>
  );
}
