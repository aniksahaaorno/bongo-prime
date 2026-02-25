"use client";
import { Eye, Edit, Printer, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { formatDate, getStatusBadgeVariant } from "./utlis";
import { Order } from "./AllProductTable";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";
import Swal from "sweetalert2";

interface OrdersTableProps {
  orders: any;
  selectedOrders: Set<string>;
  onToggleOrderSelection: (orderId: string) => void;
  onToggleSelectAll: () => void;
  allSelected: boolean;
}

const courierStatusColors: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-800",
  "In Transit": "bg-blue-100 text-blue-800",
  Delivered: "bg-green-100 text-green-800",
  Failed: "bg-red-100 text-red-800",
};

export const getOrderStatusClass = (status?: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 cursor-pointer";
    case "processing":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer";
    case "courier":
      return "bg-indigo-100 text-indigo-800 hover:bg-indigo-200 cursor-pointer";
    case "on-hold":
      return "bg-orange-100 text-orange-800 hover:bg-orange-200 cursor-pointer";
    case "cancelled":
      return "bg-red-100 text-red-800 hover:bg-red-200 cursor-pointer";
    case "return":
      return "bg-purple-100 text-purple-800 hover:bg-purple-200 cursor-pointer";
    case "completed":
      return "bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer";
    case "LEGIT":
      return "bg-green-200 text-green-800 hover:bg-green-200 cursor-pointer";
    case "TRUE":
      return "bg-green-200 text-green-800 hover:bg-green-200 cursor-pointer";
    case "FALSE":
      return "bg-red-200 text-green-800 hover:bg-green-200 cursor-pointer";
    case "SUSPICIOUS":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 cursor-pointer";
    case "FRAUD":
      return "bg-red-100 text-red-800 hover:bg-red-200 cursor-pointer";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200 cursor-pointer";
  }
};

export default function OrdersTable({
  orders,
  selectedOrders,
  onToggleOrderSelection,
  onToggleSelectAll,
  allSelected,
}: OrdersTableProps) {
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
      case "delete":
        alert(`Delete order: ${orderId}`);
        break;
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
            `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/create-order/delete-order/${id}`,
          );

          if (response.status === 200) {
            //  setPrimaryOrders((prevOrders) =>
            //    prevOrders.filter((o) => o._id !== id)
            //  );
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

  return (
    <div className="w-full border rounded-lg overflow-hidden bg-white">
      <Table className="text-xs sm:text-sm">
        <TableHeader>
          <TableRow className="bg-muted hover:bg-muted">
            <TableHead className="w-10 sm:w-12 px-2 sm:px-4">
              <Checkbox
                checked={allSelected}
                onCheckedChange={onToggleSelectAll}
              />
            </TableHead>
            <TableHead className="px-2 sm:px-4 min-w-32 sm:min-w-auto">
              Customer
            </TableHead>
            <TableHead className="hidden sm:table-cell px-2 sm:px-4">
              Phone
            </TableHead>
            <TableHead className="px-2 sm:px-4 min-w-24 sm:min-w-auto">
              Order ID
            </TableHead>
            <TableHead className="hidden md:table-cell px-2 sm:px-4">
              Date
            </TableHead>
            <TableHead className="px-2 sm:px-4 text-center w-16 sm:w-auto">
              Qty
            </TableHead>
            <TableHead className="hidden lg:table-cell px-2 sm:px-4">
              Courier
            </TableHead>
            <TableHead className="hidden lg:table-cell px-2 sm:px-4">
              C. Status
            </TableHead>
            <TableHead className="px-2 sm:px-4">Status</TableHead>
            <TableHead className="hidden xl:table-cell px-2 sm:px-4 max-w-32">
              Note
            </TableHead>
            <TableHead className="hidden sm:table-cell px-2 sm:px-4 text-right">
              Total
            </TableHead>
            <TableHead className="w-12 sm:w-16 px-2 sm:px-4 text-center">
              Acts
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={12}
                className="text-center py-8 text-muted-foreground text-sm"
              >
                No orders found
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order: any) => (
              <TableRow
                key={order._id}
                className={
                  selectedOrders.has(order._id)
                    ? "bg-blue-50 hover:bg-blue-100"
                    : "hover:bg-muted/50"
                }
              >
                <TableCell className="px-2 sm:px-4">
                  <Checkbox
                    checked={selectedOrders.has(order._id)}
                    onCheckedChange={() =>
                      onToggleOrderSelection(order._id)
                    }
                  />
                </TableCell>
                <TableCell className="px-2 sm:px-4 font-medium text-xs sm:text-sm">
                  <div>{order.customerInfo.fullName}</div>
                </TableCell>
                <TableCell className="hidden sm:table-cell px-2 sm:px-4 text-xs sm:text-sm">
                  {order.customerInfo.phone}
                </TableCell>
                <TableCell className="px-2 sm:px-4 font-mono text-xs">
                  {order._id.slice(-6).toUpperCase()}
                </TableCell>
                <TableCell className="hidden md:table-cell px-2 sm:px-4 text-xs sm:text-sm">
                  {formatDate(order.createdAt)}
                </TableCell>
                <TableCell className="px-2 sm:px-4 text-center font-medium text-xs sm:text-sm">
                  {/* {order.quantity} */}
                  {order.products.map((q: any) => q.quantity)}
                </TableCell>
                <TableCell className="hidden lg:table-cell px-2 sm:px-4 text-xs sm:text-sm">
                  {order.courierName}
                </TableCell>
                <TableCell className="hidden lg:table-cell px-2 sm:px-4">
                  <Badge
                    className={`text-xs ${
                      courierStatusColors[
                        order.courierStatus as string
                      ] || "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order.courierStatus}
                  </Badge>
                </TableCell>
                <TableCell className="px-2 sm:px-4">
                  <Badge
                    className={`text-xs ${getOrderStatusClass(
                      order.orderStatus,
                    )}`}
                  >
                    {order.orderStatus}
                  </Badge>
                </TableCell>

                <TableCell className="hidden xl:table-cell px-2 sm:px-4 text-xs max-w-32 truncate">
                  {order.note! || "—"}
                </TableCell>
                <TableCell className="hidden sm:table-cell px-2 sm:px-4 font-medium text-xs sm:text-sm text-right">
                  ৳
                  {order.grandTotal.toLocaleString("en-BD", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  })}
                </TableCell>
                <TableCell className="px-2 sm:px-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                      >
                        ⋯
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      {/* <DropdownMenuItem
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem> */}
                      <Link href={`/admin/order/edit/${order._id}`}>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem
                        onClick={() =>
                          handleAction("print", order._id)
                        }
                      >
                        <Printer className="mr-2 h-4 w-4" />
                        Print
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(order._id)}
                        className="text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
