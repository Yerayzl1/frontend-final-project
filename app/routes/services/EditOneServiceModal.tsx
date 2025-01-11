import { useState } from "react";

export default function EditOneServiceModal({ isOpen, onClose, service, onUpdate }) {
  const [formData, setFormData] = useState({
    name: service.name,
    description: service.description,
    price: service.price,
    duration: service.duration,
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/services/${service.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update service");
      }

      const updatedService = await response.json();
      onUpdate(updatedService);
    } catch (error) {
      console.error("Error updating service:", error);
      alert("Failed to update service. Please try again.");
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      role="dialog"
    >
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
        <h2 className="text-lg font-bold text-[#704214] mb-4">Edit Service</h2>
        <form className="space-y-4">
          {/* Service Image */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-[#704214]">
              Service Image
            </label>
            <img
              src={`/img/services/${formData.name.toLowerCase().replace(" ", "-")}.webp`}
              alt={formData.name}
              className="w-20 h-20 object-cover rounded-md"
            />
          </div>

          {/* Service Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#704214]">
              Service Name
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

          {/* Service Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-[#704214]">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214] resize-none h-6"
              rows={3}
              required
            />
          </div>

          {/* Service Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-[#704214]">
              Price (€)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
              required
            />
          </div>

          {/* Service Duration */}
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-[#704214]">
              Duration (minutes)
            </label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={formData.duration}
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
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className={`bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
