import React from "react";

export default function AppointmentHistoryModal({
  isOpen,
  onClose,
  appointments,
  userName,
}: {
  isOpen: boolean;
  onClose: () => void;
  appointments: {
    id: number;
    service: string;
    date: string;
    time: string;
    professional: string;
  }[];
  userName: string;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
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

        {appointments.length > 0 ? (
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
