import { useState } from "react";

export default function EditProductModal({ isOpen, onClose, product, onUpdate, onDelete }) {
  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price,
    stock: product.stock,
    status: product.status,
  });

  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    const updatedProduct = { ...product, ...formData };
    onUpdate(updatedProduct);
    onClose();
  };

  const openDeleteConfirmModal = () => {
    setIsConfirmDeleteModalOpen(true);
  };

  const closeDeleteConfirmModal = () => {
    setIsConfirmDeleteModalOpen(false);
  };

  const handleDelete = () => {
    onDelete(product.id);
    closeDeleteConfirmModal(); 
    onClose();
  };

  return (
    <>
      {/* Edit Product Modal */}
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        role="dialog"
      >
        <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full relative">
          {/* Delete Button */}
          <button
            onClick={openDeleteConfirmModal}
            className="absolute top-4 right-4 text-red-500 hover:text-red-600"
            title="Delete Product"
          >
            <i className="fa-regular fa-trash-can"></i>
          </button>

          <h2 className="text-lg font-bold text-[#704214] mb-4">Edit Product</h2>
          <form className="space-y-4">
            {/* Product Image */}
            <div>
              <img
                src={`/img/products/${formData.name.toLowerCase().replace(" ", "-")}.png`}
                alt={formData.name}
                className="w-36 h-36 object-contain mx-auto"
              />
            </div>

            {/* Product Name */}
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

            {/* Product Price */}
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

            {/* Product Stock */}
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

            {/* Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-[#704214]">
                Stock Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
              >
                <option value="Good stock">Good stock</option>
                <option value="Low stock">Low stock</option>
                <option value="No stock">No stock</option>
                <option value="Overstock">Overstock</option>
              </select>
            </div>
          </form>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Confirm Delete Modal */}
      {isConfirmDeleteModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          role="dialog"
        >
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold text-[#704214] mb-4">Confirm Deletion</h2>
            <p className="text-sm text-gray-700 mb-6">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeDeleteConfirmModal}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
