import { useState } from "react";

export default function EditServiceModal({ isOpen, onClose, service, onUpdate }) {
  const [updatedService, setUpdatedService] = useState(service);

  if (!isOpen) return null;

  const handleChange = (field: string, value: string | number) => {
    setUpdatedService((prevService) => ({
      ...prevService,
      [field]: value,
    }));
  };

  const handleSave = () => {
    onUpdate(updatedService);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      role="dialog"
    >
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-lg w-full">
        <h2 className="text-lg font-bold text-[#704214] mb-6">Edit Service</h2>

        {/* Service Section */}
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={`/img/services/${updatedService.service.toLowerCase().replace(" ", "-")}.webp`}
            alt={updatedService.service}
            className="w-20 h-20 object-cover rounded-md"
          />
          <div className="flex-1">
            <input
              type="text"
              value={updatedService.service}
              onChange={(e) => handleChange("name", e.target.value)}
              className="block w-full text-lg font-bold focus:outline-none focus:border-[#704214]"
            />
            <textarea
              value={updatedService.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="block w-full mt-2 text-sm focus:outline-none focus:border-[#704214] resize-none h-6"
            />
            <input
              type="number"
              value={updatedService.price}
              onChange={(e) => handleChange("price", e.target.value)}
              className="block w-full mt-2 text-sm focus:outline-none focus:border-[#704214]"
              placeholder="Price (€)"
            />
          </div>
        </div>

        <hr className="my-4" />

        {/* Professional Section */}
        <div className="mb-4">
          <h3 className="text-sm font-bold text-[#704214] mb-2">Professional</h3>
          <input
            type="text"
            value={updatedService.professional}
            onChange={(e) => handleChange("professional", e.target.value)}
            className="block w-full text-sm focus:outline-none focus:border-[#704214]"
          />
        </div>

        <hr className="my-4" />

        {/* Client Section */}
        <div className="mb-4">
          <h3 className="text-sm font-bold text-[#704214] mb-2">Client</h3>
          <input
            type="text"
            value={updatedService.client}
            onChange={(e) => handleChange("client", e.target.value)}
            className="block w-full text-sm focus:outline-none focus:border-[#704214]"
          />
        </div>

        <hr className="my-4" />

        {/* Service Details Section */}
        <div className="mb-4">
          <h3 className="text-sm font-bold text-[#704214] mb-2">Details</h3>
          <input
            type="date"
            value={updatedService.date}
            onChange={(e) => handleChange("date", e.target.value)}
            className="focus:outline-none focus:border-[#704214]"
          />
          <input
            type="number"
            value={updatedService.total}
            onChange={(e) => handleChange("total", e.target.value)}
            className="block w-full mt-4 text-sm focus:outline-none focus:border-[#704214]"
            placeholder="Total (€)"
          />
          <select
            value={updatedService.paymentType}
            onChange={(e) => handleChange("paymentType", e.target.value)}
            className="block w-full mt-4 focus:outline-none focus:border-[#704214]"
          >
            <option value="Credit">Credit</option>
            <option value="Cash">Cash</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
