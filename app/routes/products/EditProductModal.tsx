import { useState } from "react";

export default function EditProductModal({
  isOpen,
  onClose,
  product,
  onUpdate,
  onDelete,
}: {
  isOpen: boolean;
  onClose: () => void;
  product: { id: number; name: string; price: string; stock: number };
  onUpdate: () => void;
  onDelete: () => void;
}) {
  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price,
    stock: product.stock,
  });

  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/products/${product.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      onUpdate();
    } catch (error) {
      console.error("Error updating product:", error);
      alert("An error occurred while updating the product.");
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  const openDeleteConfirmModal = () => {
    setIsConfirmDeleteModalOpen(true);
  };

  const closeDeleteConfirmModal = () => {
    setIsConfirmDeleteModalOpen(false);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/products/${product.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      onDelete();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("An error occurred while deleting the product.");
    } finally {
      setIsLoading(false);
      closeDeleteConfirmModal();
      onClose();
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        role="dialog"
      >
        <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full relative">
          <button
            onClick={openDeleteConfirmModal}
            className="absolute top-4 right-4 text-red-500 hover:text-red-600"
            title="Delete Product"
          >
            <i className="fa-regular fa-trash-can"></i>
          </button>

          <h2 className="text-lg font-bold text-[#704214] mb-4">Edit Product</h2>
          <form className="space-y-4">
            <div>
              <img
                src={`/img/products/${formData.name.toLowerCase().replace(" ", "-")}.png`}
                alt={formData.name}
                className="w-36 h-36 object-contain mx-auto"
              />
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#704214]">
                Product Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
                required
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-[#704214]">
                Price (€)
              </label>
              <input
                type="text"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
                required
              />
            </div>
            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-[#704214]">
                Stock Units
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
                required
              />
            </div>
          </form>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>

      {isConfirmDeleteModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          role="dialog"
        >
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold text-[#704214] mb-4">Confirm Deletion</h2>
            <p className="text-sm text-gray-700 mb-6">
              Are you sure you want to delete <strong>{product.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeDeleteConfirmModal}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
                disabled={isLoading}
              >
                {isLoading ? "Deleting..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
