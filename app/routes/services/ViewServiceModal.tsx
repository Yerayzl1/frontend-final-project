import { useNavigate } from '@remix-run/react';
import React, { useEffect, useState } from "react";

export default function ViewServiceModal({
  isOpen,
  onClose,
  service,
  user,
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
  user: any;
  onUpdate?: (updatedService: any) => void;
  onReserve?: (reservationData: any) => void;
}) {
  const navigate = useNavigate();
  const [professionals, setProfessionals] = useState([]);
  const [formData, setFormData] = useState({
    name: service.name,
    description: service.description,
    price: service.price,
    duration: service.duration,
  });

  const [reservationData, setReservationData] = useState({
    professional_id: "",
    start_date: "",
    hour: "",
    payment_method: "Cash",
    client_id: user.id,
    service_id: service.id,
    total_price: service.price,
  });

  useEffect(() => {
    const isNotAdmin = user.role_id !== 1;
    if (isNotAdmin) {
      fetchProfessionals();
    }
  }, [user.role_id]);

  const fetchProfessionals = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/professionals", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch professionals");
      }
      const data = await response.json();
      setProfessionals(data);
    } catch (err) {
      console.error("Error fetching professionals:", err.message);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReservationChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setReservationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
  
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
  
      if (onUpdate) {
        onUpdate(updatedService);
      }
      navigate("/services");
      onClose();
    } catch (err) {
      console.error("Error updating service:", err.message);
      alert("Error updating service");
    }
  };

  const handleReserve = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      reservationData.professional_id = Number(reservationData.professional_id);  
      reservationData.hour = `${reservationData.hour}:00`;  

      const response = await fetch("http://localhost:8000/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(reservationData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to create appointment");
      }
  
      const result = await response.json();
  
      if (onReserve) {
        onReserve(result.appointment);
      }
  
      navigate("/services");
      onClose();
    } catch (err) {
      console.error("Error creating appointment:", err.message);
      alert("Error creating appointment");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#704214]">
            {user.role_id == 1 ? "Edit Service" : "Reserve Service"}
          </h1>
          <button onClick={onClose} className="text-[#704214] hover:text-red-600" title="Close">
            ✕
          </button>
        </div>

        {user.role_id == 1 ? (
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
                className="mt-1 block w-full h-6 border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
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
          {/* Select Professional */}
            <div>
              <label
                htmlFor="professional_id"
                className="block text-sm font-medium text-[#704214]"
              >
                Professional
              </label>
              <select
                id="professional_id"
                name="professional_id"
                value={reservationData.professional_id}
                onChange={handleReservationChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
              >
                <option value="">Select Professional</option>
                {professionals.map((professional) => (
                  <option key={professional.id} value={professional.id}>
                    {professional.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Start date */}
            <div>
              <label
                htmlFor="start_date"
                className="block text-sm font-medium text-[#704214]"
              >
                Start date
              </label>
              <input
                type="date"
                id="start_date"
                name="start_date"
                value={reservationData.start_date}
                onChange={handleReservationChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
              />
            </div>

            {/* Hour */}
            <div>
              <label
                htmlFor="hour"
                className="block text-sm font-medium text-[#704214]"
              >
                Hour
              </label>
              <input
                type="time"
                id="hour"
                name="hour"
                value={reservationData.hour}
                onChange={handleReservationChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
              />
            </div>

            {/* Payment Method */}
            <div>
              <label
                htmlFor="payment_method"
                className="block text-sm font-medium text-[#704214]"
              >
                Payment Method
              </label>
              <select
                id="payment_method"
                name="payment_method"
                value={reservationData.payment_method}
                onChange={handleReservationChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
              >
                <option value="Cash">Cash</option>
                <option value="Credit">Credit</option>
                <option value="Debit">Debit</option>
              </select>
            </div>

            {/* Hidden Fields */}
            <input type="hidden" name="client_id" value={reservationData.client_id} />
            <input type="hidden" name="service_id" value={reservationData.service_id} />
            <input type="hidden" name="total_price" value={reservationData.total_price} />

            {/* Submit Button */}
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
