import { useEffect, useState } from "react";

export default function EditAppointmentModal({ isOpen, onClose, appointment, onUpdate }) {
  const [updatedAppointment, setUpdatedAppointment] = useState(appointment);
  const [selectableData, setSelectableData] = useState({ clients: [], professionals: [] });

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
      setSelectableData(data);
    } catch (error) {
      console.error("Error fetching selectable data:", error);
    }
  };

  const handleChange = (field: string, value: string | number) => {
    setUpdatedAppointment((prevAppointment) => ({
      ...prevAppointment,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/appointments/${appointment.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedAppointment),
      });

      if (!response.ok) {
        throw new Error("Failed to update appointment");
      }

      const updatedData = await response.json();
      onUpdate(updatedData);
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      role="dialog"
    >
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-lg w-full">
        <h2 className="text-lg font-bold text-[#704214] mb-6">Edit Appointment</h2>

        {/* Appointment Section */}
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={`/img/services/${updatedAppointment.service.name.toLowerCase().replace(" ", "-")}.webp`}
            alt={updatedAppointment.service.name}
            className="w-22 h-40 object-cover rounded-md"
          />
          <div className="flex-1">
            <p className="text-sm text-gray-500">Service</p>
            <input
              type="text"
              value={updatedAppointment.service.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="block w-full text-lg font-bold focus:outline-none focus:border-[#704214]"
            />
            <p className="text-sm text-gray-500 mt-2">Description</p>
            <textarea
              value={updatedAppointment.service.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="block w-full mt-2 text-sm focus:outline-none focus:border-[#704214] resize-none h-6"
            />
            <p className="text-sm text-gray-500 mt-2">Price (€)</p>
            <input
              type="number"
              value={updatedAppointment.service.price}
              onChange={(e) => handleChange("price", e.target.value)}
              className="block w-full mt-2 text-sm focus:outline-none focus:border-[#704214]"
              placeholder="Price (€)"
            />
          </div>
        </div>

        <hr className="my-4 border-t-2 border-[#704214]" />

        {/* Professional Section */}
        <div className="mb-4">
          <h3 className="text-sm font-bold text-[#704214] mb-2">Professional</h3>
          <select
            value={updatedAppointment.professional_id}
            onChange={(e) => handleChange("professional_id", parseInt(e.target.value))}
            className="block w-full text-sm focus:outline-none focus:border-[#704214] rounded-md"
          >
            {selectableData.professionals.map((prof: any) => (
              <option key={prof.id} value={prof.id}>
                {prof.name}
              </option>
            ))}
          </select>
        </div>

        <hr className="my-4 border-t-2 border-[#704214]" />

        {/* Client Section */}
        <div className="mb-4">
          <h3 className="text-sm font-bold text-[#704214] mb-2">Client</h3>
          <select
            value={updatedAppointment.client_id}
            onChange={(e) => handleChange("client_id", parseInt(e.target.value))}
            className="block w-full text-sm focus:outline-none focus:border-[#704214] rounded-md"
          >
            {selectableData.clients.map((client: any) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>

        <hr className="my-4 border-t-2 border-[#704214]" />

        {/* Appointment Details Section */}
        <div className="mb-4">
          <h3 className="text-sm font-bold text-[#704214] mb-2">Details</h3>
          <p className="text-sm text-gray-500 mb-2">Start Date</p>
          <input
            type="date"
            value={updatedAppointment.start_date}
            onChange={(e) => handleChange("date", e.target.value)}
            className="focus:outline-none focus:border-[#704214]"
          />
          <p className="text-sm text-gray-500 mt-4 mb-2">Total (€)</p>
          <input
            type="number"
            value={updatedAppointment.total_price}
            onChange={(e) => handleChange("total", e.target.value)}
            className="block w-full mt-4 text-sm focus:outline-none focus:border-[#704214]"
            placeholder="Total (€)"
          />
          <p className="text-sm text-gray-500 mt-4 mb-2">Payment Method</p>
          <select
            value={updatedAppointment.payment_method}
            onChange={(e) => handleChange("paymentType", e.target.value)}
            className="block w-full mt-4 focus:outline-none focus:border-[#704214]"
          >
            <option value="Credit">Credit</option>
            <option value="Debit">Debit</option>
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
