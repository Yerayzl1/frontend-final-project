import React, { useState } from "react";

export default function ViewServiceModal({
  isOpen,
  onClose,
  service,
  isAdmin,
  onUpdate,
  onReserve,
}: {
  isOpen: boolean;
  onClose: () => void;
  service: {
    id: string;
    name: string;
    description: string;
    price: string;
    duration: string;
  };
  isAdmin: boolean;
  onUpdate?: (updatedService: any) => void;
  onReserve?: (reservationData: any) => void;
}) {
  const [formData, setFormData] = useState({
    name: service.name,
    description: service.description,
    price: service.price,
    duration: service.duration,
  });

  const [reservationData, setReservationData] = useState({
    date: "",
    time: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReservationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setReservationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdate) {
      onUpdate({ ...service, ...formData });
    }
    onClose();
  };

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    if (onReserve) {
      onReserve({ serviceId: service.id, ...reservationData });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#704214]">
            {isAdmin ? "Edit Service" : "Reserve Service"}
          </h1>
          <button onClick={onClose} className="text-[#704214] hover:text-red-600" title="Close">
            ✕
          </button>
        </div>

        {isAdmin ? (
          <form onSubmit={handleUpdate} className="space-y-6">
            <input type="hidden" name="id" value={service.id} />
            <div>
              <img src={`/img/services/${service.name.toLowerCase().replace(" ", "-")}.webp`} alt={service.name} className="w-full h-48 object-cover" />
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#704214]">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-[#704214]">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-[#704214]">
                Price (€)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
              />
            </div>

            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-[#704214]">
                Duration (mins)
              </label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-green-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-green-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleReserve} className="space-y-6">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-[#704214]">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={reservationData.date}
                onChange={handleReservationChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
              />
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-medium text-[#704214]">
                Time
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={reservationData.time}
                onChange={handleReservationChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-blue-700"
              >
                Reserve
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
