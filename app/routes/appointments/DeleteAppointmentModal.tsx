import { useState } from "react";

export default function DeleteAppointmentModal({ appointmentId, onClose, onDelete }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      console.log("Deleting appointment with ID:", appointmentId);
      const response = await fetch(`http://localhost:8000/api/appointments/${appointmentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response);

      if (response.ok) {
        onDelete(); 
      } else {
        alert("Failed to delete appointment.");
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
      alert("An error occurred. Please try again.");
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
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-bold text-[#704214] mb-4">Delete Appointment</h2>
        <p className="text-[#704214] mb-6">
          Are you sure you want to delete this appointment? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className={`bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
