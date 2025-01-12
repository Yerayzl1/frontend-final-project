import { useEffect, useState } from "react";

export default function NewAppointmentModal({ isOpen, onClose }) {
  const [clients, setClients] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetchSelectableData();
    }
  }, [isOpen]);

  const fetchSelectableData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/dashboard/selectable-data", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch selectable data");
      }

      const data = await response.json();
      setClients(data.clients);
      setProfessionals(data.professionals);
      setServices(data.services);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const hour = formData.get("hour");
    const formattedHour = `${hour}:00`;

    const appointmentData = {
      client_id: Number(formData.get("client_id")),
      professional_id: Number(formData.get("professional_id")),
      service_id: Number(formData.get("service_id")),
      start_date: formData.get("start_date"),
      hour: formattedHour,
      total_price: parseFloat(formData.get("total_price") as string),
      payment_method: formData.get("payment_method"),
    };

    try {
      const response = await fetch("http://localhost:8000/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        throw new Error("Failed to create appointment");
      }

      await response.json();
      onClose();
    } catch (err) {
      console.error(err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#704214]">New Appointment</h1>
          <button
            onClick={onClose}
            className="text-[#704214] hover:text-red-600"
            title="Close"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Client ID */}
          <div>
            <label
              htmlFor="client_id"
              className="block text-sm font-medium text-[#704214]"
            >
              Client
            </label>
            <select
              id="client_id"
              name="client_id"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
            >
              {clients.length > 0 ? (
                <>
                  <option value="">Select Client</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </>
              ) : (
                <option value="">No clients available</option>
              )}
            </select>
          </div>

          {/* Professional ID */}
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
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
            >
              {professionals.length > 0 ? (
                <>
                  <option value="">Select Professional</option>
                  {professionals.map((professional) => (
                    <option key={professional.id} value={professional.id}>
                      {professional.name}
                    </option>
                  ))}
                </>
              ) : (
                <option value="">No professionals available</option>
              )}
            </select>
          </div>

          {/* Service ID */}
          <div>
            <label
              htmlFor="service_id"
              className="block text-sm font-medium text-[#704214]"
            >
              Service
            </label>
            <select
              id="service_id"
              name="service_id"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
            >
              {services.length > 0 ? (
                <>
                  <option value="">Select Service</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                </>
              ) : (
                <option value="">No services available</option>
              )}
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label
              htmlFor="start_date"
              className="block text-sm font-medium text-[#704214]"
            >
              Start Date
            </label>
            <input
              type="date"
              id="start_date"
              name="start_date"
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
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
            />
          </div>

          {/* Total Price */}
          <div>
            <label
              htmlFor="total_price"
              className="block text-sm font-medium text-[#704214]"
            >
              Total Price
            </label>
            <input
              type="number"
              step="0.01"
              id="total_price"
              name="total_price"
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
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
            >
              <option value="Cash">Cash</option>
              <option value="Credit">Credit</option>
              <option value="Debit">Debit</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-green-700"
            >
              Create Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
