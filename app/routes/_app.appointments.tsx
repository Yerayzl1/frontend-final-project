import { useEffect, useState } from "react";
import EditAppointmentModal from './appointments/EditAppointmentModal';
import DeleteAppointmentModal from './appointments/DeleteAppointmentModal';
import { AppointmentsData } from '~/components/data/appointments.server';
import { useLoaderData } from '@remix-run/react';

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || "1";
  const limit = url.searchParams.get("limit") || "10";
  const query = url.searchParams.get("query") || "";

  const response = await AppointmentsData({ page: Number(page), limit: Number(limit), query });
  return {
    data: response.appointments,
    total_elements: response.total_elements,
    total_pages: response.total_pages,
    page: Number(page),
    limit: Number(limit),
  };
}


export default function AppointmentRecord() {
  const { data: appointments, total_elements, total_pages, page, limit } = useLoaderData();

  useEffect(() => {
    const roleId = localStorage.getItem("role_id");
    if (roleId !== "1" && roleId !== "2") {
      window.location.href = "/services";
    }
  }, []);

  const [isEditAppointmentModalOpen, setIsEditAppointmentModalOpen] = useState(false);
  const [isDeleteAppointmentModalOpen, setIsDeleteAppointmentModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handlePageChange = (newPage: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", String(newPage));
    window.location.href = url.toString();
  };

  const handleOpenModal = (appointment) => {
    setSelectedAppointment(appointment);
    setIsEditAppointmentModalOpen(true);
  };
  
  const handleUpdateAppointment = () => {
    window.location.reload();
  };

  const handleOpenDeleteModal = (appointment) => {
    setSelectedAppointment(appointment);
    setIsDeleteAppointmentModalOpen(true);
  };

  const handleDeleteAppointment = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#F5E5D3] p-6 font-sans">
     {/* Recent Appointments */}
     <div className="bg-[#E1C6A8] p-4 rounded-md shadow-md mb-8">
        <div className="space-y-4">
          {appointments.length > 0 ?
            appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex justify-between bg-white p-4 rounded-full shadow-md"
            >
              {/* Icon and Service Info */}
              <div className="flex items-center space-x-4">
                <img
                  src={`/img/services/${appointment.service.name.toLowerCase().replace(" ", "-")}.webp`}
                  alt={appointment.service.name}
                  className="w-10 h-10 rounded-lg"
                />
              <div>
                <p className="text-sm font-semibold text-[#704214]">{appointment.service.name}</p>
                <p className="text-xs text-gray-500">{appointment.service.price}</p>
              </div>
            </div>

              {/* Client and Professional */}
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <p className="text-sm font-semibold text-[#704214]">{appointment.client.name}</p>
                  <p className="text-xs text-gray-500">{appointment.client.name.toLowerCase()}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-[#704214]">{appointment.professional.name}</p>
                  <p className="text-xs text-gray-500">{appointment.professional.name.toLowerCase()}</p>
                </div>
              </div>

              {/* Date, Price, and Payment */}
              <div className="flex items-center space-x-4">
                <p className="text-sm text-[#704214]">{appointment.start_date}</p>
                <p className="text-sm font-semibold text-[#704214]">{appointment.total_price}</p>
                <p className="text-sm text-gray-500">{appointment.payment_method}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button onClick={() => handleOpenModal(appointment)} className="text-yellow-500 hover:text-yellow-600">
                  <i className="fa-regular fa-pen-to-square"></i>
                </button>
                <div className="border-l border-gray-300"></div>
                <button onClick={() => handleOpenDeleteModal(appointment)} className="text-red-500 hover:text-red-600">
                  <i className="fa-regular fa-trash-can"></i>
                </button>
              </div>

              {/* Edit Appointment Modal */}
              {isEditAppointmentModalOpen && (
                <EditAppointmentModal
                  isOpen={isEditAppointmentModalOpen}
                  onClose={() => setIsEditAppointmentModalOpen(false)}
                  appointment={selectedAppointment}
                  onUpdate={handleUpdateAppointment}
                />
              )}

              {/* Delete Appointment Modal */}
              {isDeleteAppointmentModalOpen && selectedAppointment && (
                <DeleteAppointmentModal
                  appointmentId={selectedAppointment.id}
                  onClose={() => setIsDeleteAppointmentModalOpen(false)}
                  onDelete={handleDeleteAppointment}
                />
              )}
            </div>
          )) : (
            <h1 className="text-lg text-[#704214]">No appointments found</h1>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <p>
          Showing from {(page - 1) * limit + 1} to {Math.min(page * limit, total_elements)} of{" "}
          {total_elements} appointments
        </p>
        <div className="flex items-center space-x-2">
          <button
            className="btn btn-outline-primary"
            disabled={page <= 1}
            onClick={() => handlePageChange(page - 1)}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <select
            className="form-select"
            value={page}
            onChange={(e) => handlePageChange(Number(e.target.value))}
          >
            {Array.from({ length: total_pages }, (_, i) => i + 1).map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <button
            className="btn btn-primary"
            disabled={page >= total_pages}
            onClick={() => handlePageChange(page + 1)}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
