import { useState } from "react";
import EditProductModal from "./products/EditProductModal";
import AddProductModal from "./products/AddProductModal";

export default function Inventory() {
  const [products, setProducts] = useState([
    { id: 1, name: "Shampoo", price: "20.00€", stock: 14, status: "Low stock" },
    { id: 2, name: "Densifying", price: "28.00€", stock: 50, status: "Good stock" },
    { id: 3, name: "For-me 308", price: "20.00€", stock: 0, status: "No stock" },
    { id: 4, name: "Repair", price: "12.00€", stock: 80, status: "Overstock" },
    { id: 5, name: "Love extension", price: "25.00€", stock: 17, status: "Good stock" },
    { id: 6, name: "Purifying", price: "20.00€", stock: 12, status: "Low stock" },
  ]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.name === updatedProduct.name ? updatedProduct : product
      )
    );
    setIsEditModalOpen(false);
  };

  const handleAddProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const handleDeleteProduct = (id) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  };

  const statusColors = {
    "Low stock": "bg-red-500 text-white",
    "Good stock": "bg-green-500 text-white",
    "No stock": "bg-black text-white",
    "Overstock": "bg-yellow-500 text-black",
  };

  return (
    <div className="min-h-screen bg-[#F5E5D3] p-6 font-sans">

      {/* Search Bar */}
      <div className="flex justify-end mb-6">
        <input
          type="text"
          placeholder="Search a product 🔍"
          className="rounded-lg px-4 py-2 text-white placeholder:text-white focus:outline-none bg-gray-500"
        />
      </div>

      {/* Product Grid */}
      <div className="bg-[#E1C6A8] p-6 rounded-md shadow-md">
        <div className="grid grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={index}
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
                className={`px-2 py-1 rounded-full text-xs font-bold ${statusColors[product.status]}`}
              >
                {product.status}
              </span>
            </div>
          ))}
          {/* Edit Product Modal */}
          {isEditModalOpen && selectedProduct && (
            <EditProductModal
              product={selectedProduct}
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              onUpdate={handleUpdateProduct}
              onDelete={(id) => {
                handleDeleteProduct(id);
                setIsEditModalOpen(false);
              }}
            />
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center mt-6">
        <button onClick={() => setIsAddModalOpen(true)} className="bg-green-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-700">
          New product
        </button>
      </div>
      
      {/* Add Product Modal */}
      {isAddModalOpen && (
        <AddProductModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddProduct}
        />
      )}
    </div>
  );
}
