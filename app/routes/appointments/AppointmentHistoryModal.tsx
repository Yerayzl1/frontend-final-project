import React, { useEffect, useState } from "react";

export default function AppointmentHistoryModal({
  isOpen,
  onClose,
  clientId,
  userName,
}: {
  isOpen: boolean;
  onClose: () => void;
  clientId: number;
  userName: string;
}) {
  const [appointments, setAppointments] = useState<
    { id: number; service: string; date: string; time: string; professional: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      fetchAppointments();
    }
  }, [isOpen]);

  const fetchAppointments = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`http://localhost:8000/api/appointments/client/${clientId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      } else {
        setError("Failed to fetch appointments.");
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setError("An error occurred while fetching appointments.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      onClick={onClose} // Cierra el modal al hacer clic fuera del contenido
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full"
        onClick={(e) => e.stopPropagation()} // Evita cerrar el modal al hacer clic dentro del contenido
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#704214]">
            {userName}'s Appointment History
          </h1>
          <button
            onClick={onClose}
            className="text-[#704214] hover:text-red-600"
            title="Close"
          >
            ✕
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : appointments.length > 0 ? (
          <ul className="space-y-4">
            {appointments.map((appointment) => (
              <li
                key={appointment.id}
                className="flex flex-col bg-gray-100 p-4 rounded-md shadow-sm"
              >
                <p className="text-lg font-bold text-[#704214]">
                  Service: {appointment.service}
                </p>
                <p className="text-sm text-gray-600">Date: {appointment.date}</p>
                <p className="text-sm text-gray-600">Time: {appointment.time}</p>
                <p className="text-sm text-gray-600">
                  Professional: {appointment.professional}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">
            No appointments found for this user.
          </p>
        )}
      </div>
    </div>
  );
}
