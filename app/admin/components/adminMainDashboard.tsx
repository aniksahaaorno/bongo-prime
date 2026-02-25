"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Bar,
  BarChart,
} from "recharts";
import { MetricCard } from "./MetricCard";
import { RevenueOverTime } from "./RevenueOverTime";
import { ProductAnalyticsChart } from "./ProductAnalyticsChart";
import { TopProductsList } from "./TopProductsList";
import { PaymentAnalytics } from "./PaymentAnalytics";
import { Calendar } from "lucide-react";

export default function Dashboard({ result }: any) {
  const [data, setData] = useState<any>(result);

  const analytics = data?.analytics[0];
  const ordersData = [
    { name: "Pending", value: analytics?.pending || 0, fill: "#f59e0b" },
    { name: "Processing", value: analytics?.processing || 0, fill: "#3b82f6" },
    { name: "Courier", value: analytics?.courier || 0, fill: "#8b5cf6" },
    { name: "Completed", value: analytics?.completed || 0, fill: "#10b981" },
    { name: "Cancelled", value: analytics?.cancelled || 0, fill: "#ef4444" },
  ];

  // const crossMargin = analytics.

  return (
    <div className="min-h-screen">     
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Welcome back! Here's your sales overview.
            </p>
          </div>
          <div className="flex items-center max-w-45  gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200">
            <Calendar className="w-5 h-5 text-gray-400" />
            <select className="bg-white text-gray-700 text-sm font-medium outline-none">
              <option>This Month</option>
              <option>Last Month</option>
              <option>Last 3 Months</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard
            title="Total Orders"
            value={analytics?.totalOrders || 0}
            description="All time orders"
            trend={null}
          />
          <MetricCard
            title="Total Revenue"
            value={`৳${(analytics?.totalGrandTotal || 0).toLocaleString(
              "bn-BD",
              { minimumFractionDigits: 2 }
            )}`}
            description="Total sales amount"
            trend={null}
          />
          <MetricCard
            title="Total Purchase"
            value={`৳${(data?.totalOverallPurchase || 0).toLocaleString(
              "bn-BD",
              { minimumFractionDigits: 2 }
            )}`}
            description="Total purchase amount"
            trend={null}
          />
          <MetricCard
            title="Paid Orders"
            value={`৳${(analytics?.totalPaidOrders || 0).toLocaleString(
              "bn-BD",
              { minimumFractionDigits: 2 }
            )}`}
            description={`৳${(analytics?.totalPaidAmount || 0).toLocaleString(
              "bn-BD",
              { minimumFractionDigits: 2 }
            )}`}
            trend={null}
          />
          <MetricCard
            title="Due Amount"
            value={`৳${(analytics?.totalDueAmount || 0).toLocaleString(
              "bn-BD",
              { minimumFractionDigits: 2 }
            )}`}
            description={`${analytics?.totalDueOrders || 0} pending orders`}
            trend={null}
          />
        </div>
        <div className="my-10">
          <PaymentAnalytics analytics={analytics} />
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Revenue Summary</CardTitle>
              <CardDescription>Paid vs Due amounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      {
                        name: "Payment Status",
                        Paid: analytics?.totalPaidAmount || 0,
                        Due: analytics?.totalDueAmount || 0,
                      },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        border: "1px solid var(--border)",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="Paid" fill="#10b981" />
                    <Bar dataKey="Due" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Order Status</CardTitle>
              <CardDescription>Distribution of orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ordersData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name}: ${entry.value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {ordersData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        
        <div className="my-10">
          <TopProductsList products={data?.productAnalytics || []} />
        </div>
        
        <ProductAnalyticsChart products={data?.productAnalytics || []} />
      </div>
    </div>
  );
}
