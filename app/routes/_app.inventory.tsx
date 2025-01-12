import { useEffect, useState } from "react";
import { useLoaderData } from "@remix-run/react";
import EditProductModal from "./products/EditProductModal";
import AddProductModal from "./products/AddProductModal";
import { ProductsData, Product } from '~/components/data/products.server';

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || "1";
  const limit = url.searchParams.get("limit") || "8";
  const query = url.searchParams.get("query") || "";

  const response = await ProductsData({ page: Number(page), limit: Number(limit), query });
  return {
    data: response.products,
    total_elements: response.total_elements,
    total_pages: response.total_pages,
    page: Number(page),
    limit: Number(limit),
  };
}

export default function Inventory() {
  const { data: products, total_elements, total_pages, page, limit } = useLoaderData();

  const [searchQuery, setSearchQuery] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const roleId = localStorage.getItem("role_id");
    if (roleId !== "1" && roleId !== "2") {
      window.location.href = "/services";
    }
  }, []);

  const handleSearch = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("query", searchQuery);
    url.searchParams.set("page", "1");
    window.location.href = url.toString();
  };

  const handlePageChange = (newPage: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", String(newPage));
    window.location.href = url.toString();
  };

  const getStatus = (stock: number) => {
    if (stock === 0) return "No stock";
    if (stock < 10) return "Low stock";
    if (stock < 25) return "Good stock";
    return "Overstock";
  };

  const statusColors = {
    "No stock": "bg-black text-white",
    "Low stock": "bg-red-500 text-white",
    "Good stock": "bg-green-500 text-white",
    "Overstock": "bg-yellow-500 text-black",
  };

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F5E5D3] p-6 font-sans">
      {/* Search Bar */}
      <div className="flex justify-end mb-6">
        <input
          type="text"
          placeholder="Search a product"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="rounded-lg px-4 py-2 text-white placeholder:text-white focus:outline-none bg-gray-500"
        />
        <button
          onClick={handleSearch}
          className="ml-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-700 focus:outline-none"
        >
          Search
        </button>
      </div>

      {/* Product Grid */}
      <div className="bg-[#E1C6A8] p-6 rounded-md shadow-md">
        <div className="grid grid-cols-4 gap-6">
        {products.length > 0 ?
          products.map((product) => {
            const status = getStatus(product.stock);
            return (
              <div
                key={product.id}
                onClick={() => handleOpenModal(product)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleOpenModal(product);
                  }
                }}
                role="button"
                tabIndex={0}
                className="bg-white p-4 rounded-md shadow-md flex flex-col items-center text-center space-y-4 cursor-pointer hover:shadow-lg"
              >
                <img
                  src={`/img/products/${product.name.toLowerCase().replace(" ", "-")}.png`}
                  alt={product.name}
                  className="w-20 h-20 object-contain"
                />
                <div>
                  <p className="text-lg font-semibold text-[#704214]">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.price}</p>
                  <p className="text-sm text-gray-500">{product.stock} uds</p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-bold ${statusColors[status]}`}
                >
                  {status}
                </span>
              </div>
            );
          }) : (
            <h1 className="text-xl text-[#704214]">No products found</h1>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p>
          Showing from {(page - 1) * limit + 1} to {Math.min(page * limit, total_elements)} of{" "}
          {total_elements} products
        </p>
        <div className="flex items-center space-x-2">
          <button
            className="btn btn-outline-primary"
            disabled={page <= 1}
            onClick={() => handlePageChange(page - 1)}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <select
            className="form-select"
            value={page}
            onChange={(e) => handlePageChange(Number(e.target.value))}
          >
            {Array.from({ length: total_pages }, (_, i) => i + 1).map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <button
            className="btn btn-primary"
            disabled={page >= total_pages}
            onClick={() => handlePageChange(page + 1)}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-green-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-700"
        >
          New product
        </button>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <AddProductModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={() => window.location.reload()}
        />
      )}

      {/* Edit Product Modal */}
      {isEditModalOpen && selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={() => window.location.reload()}
          onDelete={() => window.location.reload()}
        />
      )}
    </div>
  );
}
