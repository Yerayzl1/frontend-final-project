export default function NewAppointmentModal({ isOpen, onClose }) {
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

        <form method="post" className="space-y-6">
          {/* Client Name */}
          <div>
            <label
              htmlFor="clientName"
              className="block text-sm font-medium text-[#704214]"
            >
              Client Name
            </label>
            <input
              type="text"
              id="clientName"
              name="clientName"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
            />
          </div>

          {/* Service */}
          <div>
            <label
              htmlFor="service"
              className="block text-sm font-medium text-[#704214]"
            >
              Service
            </label>
            <select
              id="service"
              name="service"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
            >
              <option value="Haircut">Haircut</option>
              <option value="Manicure">Manicure</option>
              <option value="Massage">Massage</option>
              {/* Agrega más opciones aquí */}
            </select>
          </div>

          {/* Date */}
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-[#704214]"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
            />
          </div>

          {/* Time */}
          <div>
            <label
              htmlFor="time"
              className="block text-sm font-medium text-[#704214]"
            >
              Time
            </label>
            <input
              type="time"
              id="time"
              name="time"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
            />
          </div>

          {/* Professional */}
          <div>
            <label
              htmlFor="professional"
              className="block text-sm font-medium text-[#704214]"
            >
              Professional
            </label>
            <select
              id="professional"
              name="professional"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
            >
              <option value="John Doe">John Doe</option>
              <option value="Sarah Johnson">Sarah Johnson</option>
              {/* Agrega más profesionales aquí */}
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
