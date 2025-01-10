import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditAppointment() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [client, setClient] = useState([]);
  const [professional, setProfessional] = useState([]);
  const [service, setService] = useState([]);

  useEffect(() => {
    if (id) {
      fetchAppointmentData();
    }
  }, [id]);

  const fetchAppointmentData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/appointments/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch appointment details");
      }
      const data = await response.json();
      setAppointment(data.data);
      setClient(data.data.client);
      setProfessional(data.data.professional);
      setService(data.data.service);
    } catch (err) {
      console.error("Fetching appointment error: ", err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const hour = formData.get("hour");
    const formattedHour = `${hour}:00`;

    const updatedAppointment = {
      client_id: Number(formData.get("client_id")),
      professional_id: Number(formData.get("professional_id")),
      service_id: Number(formData.get("service_id")),
      start_date: formData.get("start_date"),
      hour: formattedHour,
      total_price: parseFloat(formData.get("total_price") as string),
      payment_method: formData.get("payment_method"),
    };

    try {
      const response = await fetch(`http://localhost:8000/api/appointments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedAppointment),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      await response.json();

      navigate("/dashboard");
    } catch (err) {
      console.error(err.message);
    }
  };

  if (!appointment) {
    return (
      <div className="min-h-screen bg-[#F5E5D3] flex items-center justify-center">
        <p className="text-xl text-[#704214]">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5E5D3] p-6 font-sans">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-[#704214] mb-6">Edit Appointment</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Appointment ID */}
          <div>
            <label htmlFor="appointmentId" className="block text-sm font-medium text-[#704214]">
              Appointment ID
            </label>
            <input
              type="text"
              id="appointmentId"
              name="appointmentId"
              disabled
              className="mt-1 block w-full bg-gray-100 border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
              value={appointment.id || ""}
            />
          </div>

          {/* Client */}
          <div>
            <label htmlFor="client_id" className="block text-sm font-medium text-[#704214]">
              Client
            </label>
            <select
              id="client_id"
              name="client_id"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
              defaultValue={client.id || ""}
            >
              <option key={client.id} value={client.id}>
                {client.username}
              </option>
            </select>
          </div>

          {/* Professional */}
          <div>
            <label htmlFor="professional_id" className="block text-sm font-medium text-[#704214]">
              Professional
            </label>
            <select
              id="professional_id"
              name="professional_id"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
              defaultValue={professional.id || ""}
            >
              <option key={professional.id} value={professional.id}>
                {professional.username}
              </option>
            </select>
          </div>

          {/* Service */}
          <div>
            <label htmlFor="service_id" className="block text-sm font-medium text-[#704214]">
              Service
            </label>
            <select
              id="service_id"
              name="service_id"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
              defaultValue={service.id || ""}
            >
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label htmlFor="start_date" className="block text-sm font-medium text-[#704214]">
              Start Date
            </label>
            <input
              type="date"
              id="start_date"
              name="start_date"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
              defaultValue={appointment.start_date || ""}
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
              defaultValue={appointment.hour.slice(0, -3) || ""}
            />
          </div>

          {/* Total Price */}
          <div>
            <label htmlFor="total_price" className="block text-sm font-medium text-[#704214]">
              Total Price
            </label>
            <input
              type="number"
              step="0.01"
              id="total_price"
              name="total_price"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
              defaultValue={appointment.total_price || ""}
            />
          </div>

          {/* Payment Method */}
          <div>
            <label htmlFor="payment_method" className="block text-sm font-medium text-[#704214]">
              Payment Method
            </label>
            <select
              id="payment_method"
              name="payment_method"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
              defaultValue={appointment.payment_method || "Credit"}
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
              className="bg-blue-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-blue-700"
            >
              Update Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
