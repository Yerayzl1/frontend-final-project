export default function EditAppointment() {
  return (
    <div className="min-h-screen bg-[#F5E5D3] p-6 font-sans">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-[#704214] mb-6">Edit Appointment</h1>

        <form method="post" className="space-y-6">
          {/* Appointment ID */}
          <div>
            <label htmlFor="appointmentId" className="block text-sm font-medium text-[#704214]">
              Appointment ID
            </label>
            <input
              type="text"
              id="appointmentId"
              name="appointmentId"
              required
              disabled
              className="mt-1 block w-full bg-gray-100 border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
              value="12345"
            />
          </div>

          {/* Client Name */}
          <div>
            <label htmlFor="clientName" className="block text-sm font-medium text-[#704214]">
              Client Name
            </label>
            <input
              type="text"
              id="clientName"
              name="clientName"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
              value="John Doe"
            />
          </div>

          {/* Service */}
          <div>
            <label htmlFor="service" className="block text-sm font-medium text-[#704214]">
              Service
            </label>
            <select
              id="service"
              name="service"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
              defaultValue="Haircut"
            >
              <option value="Haircut">Haircut</option>
              <option value="Manicure">Manicure</option>
              <option value="Massage">Massage</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-[#704214]">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
              value="2025-01-10"
            />
          </div>

          {/* Time */}
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-[#704214]">
              Time
            </label>
            <input
              type="time"
              id="time"
              name="time"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
              value="09:30"
            />
          </div>

          {/* Professional */}
          <div>
            <label htmlFor="professional" className="block text-sm font-medium text-[#704214]">
              Professional
            </label>
            <select
              id="professional"
              name="professional"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
              defaultValue="Sarah Johnson" 
            >
              <option value="John Doe">John Doe</option>
              <option value="Sarah Johnson">Sarah Johnson</option>
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
