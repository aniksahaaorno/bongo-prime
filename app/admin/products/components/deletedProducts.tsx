// components/DeletedProductsTable.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Trash2, RotateCcw, ChevronLeft, ChevronRight, X } from "lucide-react";
import { toast } from "sonner";

interface Variant {
  sku: string;
  stock: number;
  attributes: {
    color: string;
    size: string;
  };
}

interface Product {
  _id: string;
  title: string;
  slug: string;
  thumbnail: string | null;
  category: string;
  sku: string;
  basePrice: string;
  purchase?: string;
  variants: Variant[];
  isDelete: boolean;
  deletedAt: string;
}

interface DeletedProductsTableProps {
  initialProducts: Product[];
}

type SortField = "title" | "category" | "sku" | "deletedAt";
type SortOrder = "asc" | "desc";

type ActionType = "delete" | "undo" | null;

const DeletedProductsTable: React.FC<DeletedProductsTableProps> = ({
  initialProducts,
}) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortField, setSortField] = useState<SortField>("deletedAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [actionType, setActionType] = useState<ActionType>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Filter products based on search
  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    if (sortField === "deletedAt") {
      aValue = a.deletedAt || "";
      bValue = b.deletedAt || "";
    }

    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return sortOrder === "asc" ? " ↑" : " ↓";
  };

  const handleAction = (product: Product, type: "delete" | "undo") => {
    setSelectedProduct(product);
    setActionType(type);
    setIsModalOpen(true);
  };

  const executeAction = async () => {
    if (!selectedProduct || !actionType) return;

    setIsLoading(true);

    try {
      // API endpoint calls
      const endpoint =
        actionType === "delete"
          ? `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/api/products/permanent-delete/${selectedProduct._id}`
          : `${process.env.NEXT_PUBLIC_EXPRESS_SERVER_BASE_URL}/api/products/restore/${selectedProduct._id}`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json()


      if (response.ok) {
        // Remove from local state
        
        setProducts(products.filter((p) => p._id !== selectedProduct._id));
        setIsModalOpen(false);
        setSelectedProduct(null);
        setActionType(null);
        toast.success(result.message);
      } else {
        // Handle error
        console.error("Action failed");
        toast.error(result.message)
      }
    } catch (error) {
      console.error("Error:", error);
      
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setActionType(null);
  };

  const getProductSku = (product: Product): string => {
    if (product.sku) return product.sku;
    if (product.variants && product.variants.length > 0) {
      return product.variants[0].sku || "N/A";
    }
    return "N/A";
  };

  // Responsive card view for mobile
  const renderMobileCard = (product: Product) => (
    <div
      key={product._id}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-3"
    >
      <div className="flex items-start gap-3">
        {/* Product Image */}
        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shrink-0 border border-gray-200">
          {product.thumbnail ? (
            <Image
              src={product.thumbnail}
              alt={product.title}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
              No image
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
            {product.title}
          </h3>
          <div className="space-y-1 text-xs">
            <p className="text-gray-600">
              <span className="font-medium">Category:</span> {product.category}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">SKU:</span> {getProductSku(product)}
            </p>
            <p className="text-gray-500">
              <span className="font-medium">Deleted:</span>{" "}
              {product.deletedAt || "N/A"}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-1">
          <button
            onClick={() => handleAction(product, "undo")}
            className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
            title="Restore Product"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleAction(product, "delete")}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Permanently Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-linear-to-br from-red-50 to-orange-50 min-h-screen p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Deleted Products{" "}
          <span className="text-red-600">({products.length})</span>
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Manage your deleted items. You can restore or permanently delete them.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by title, category, or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
            <option value={50}>50 per page</option>
          </select>
        </div>
      </div>

      {/* Desktop Table View - Hidden on mobile */}
      <div className="hidden md:block bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-linear-to-r from-red-600 to-red-500">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Product
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer hover:bg-red-700"
                  onClick={() => handleSort("title")}
                >
                  Title {getSortIcon("title")}
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer hover:bg-red-700"
                  onClick={() => handleSort("category")}
                >
                  Category {getSortIcon("category")}
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer hover:bg-red-700"
                  onClick={() => handleSort("sku")}
                >
                  SKU {getSortIcon("sku")}
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer hover:bg-red-700"
                  onClick={() => handleSort("deletedAt")}
                >
                  Deleted At {getSortIcon("deletedAt")}
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-white uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentItems.map((product) => (
                <tr
                  key={product._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                      {product.thumbnail ? (
                        <Image
                          src={product.thumbnail}
                          alt={product.title}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                          No img
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                      {product.title}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600 font-mono">
                      {getProductSku(product)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">
                      {product.deletedAt || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleAction(product, "undo")}
                      className="inline-flex items-center px-3 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      <RotateCcw className="w-4 h-4 mr-1" />
                      Restore
                    </button>
                    <button
                      onClick={() => handleAction(product, "delete")}
                      className="inline-flex items-center px-3 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden">
        {currentItems.length > 0 ? (
          currentItems.map(renderMobileCard)
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500">No deleted products found</p>
          </div>
        )}
      </div>

      {/* Empty State */}
      {currentItems.length === 0 && (
        <div className="hidden md:block text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">No deleted products found</p>
        </div>
      )}

      {/* Pagination */}
      {sortedProducts.length > 0 && (
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{indexOfFirstItem + 1}</span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(indexOfLastItem, sortedProducts.length)}
            </span>{" "}
            of <span className="font-medium">{sortedProducts.length}</span>{" "}
            results
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="px-4 py-2 bg-red-600 text-white rounded-lg">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-white/40 backdrop-blur-2xl bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <div
                className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                  actionType === "delete" ? "bg-red-100" : "bg-emerald-100"
                }`}
              >
                {actionType === "delete" ? (
                  <Trash2 className="w-6 h-6 text-red-600" />
                ) : (
                  <RotateCcw className="w-6 h-6 text-emerald-600" />
                )}
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {actionType === "delete"
                  ? "Permanently Delete Product?"
                  : "Restore Product?"}
              </h3>

              <p className="text-sm text-gray-600 mb-4">
                {actionType === "delete"
                  ? `Are you sure you want to permanently delete "${selectedProduct.title}"? This action cannot be undone.`
                  : `Are you sure you want to restore "${selectedProduct.title}"? The product will be moved back to active products.`}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={executeAction}
                  disabled={isLoading}
                  className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors flex items-center justify-center ${
                    actionType === "delete"
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-emerald-600 hover:bg-emerald-700"
                  } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : actionType === "delete" ? (
                    "Delete Permanently"
                  ) : (
                    "Restore"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeletedProductsTable;
