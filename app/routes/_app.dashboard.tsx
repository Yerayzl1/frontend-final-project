import { Link, useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import NewAppointmentModal from "./appointments/NewAppointmentModal";
import NewClientModal from "./clients/NewClientModal";
import DeleteAppointmentModal from "./appointments/DeleteAppointmentModal";
import { DashboardData } from '../components/data/dashboard.server';

export const loader = async () => {
  return await DashboardData();
};

export default function Dashboard() {
  const navigate = useNavigate();

  const { clientsCount, appointmentsCount, servicesCount, productsCount, appointments } = useLoaderData();

  const [isNewAppointmentModalOpen, setIsNewAppointmentModalOpen] = useState(false);
  const [isDeleteAppointmentModalOpen, setIsDeleteAppointmentModalOpen] = useState(false);
  const [deleteAppointmentId, setDeleteAppointmentId] = useState(null);
  const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false);

  useEffect(() => {
    const roleId = localStorage.getItem("role_id");
    if (roleId !== "1" && roleId !== "2") {
      window.location.href = "/services";
    }
  }, []);

  const openModal = (appointmentId) => {
    setDeleteAppointmentId(appointmentId);
    setIsDeleteAppointmentModalOpen(true);
  };

  const closeModal = () => {
    setDeleteAppointmentId(null);
    setIsDeleteAppointmentModalOpen(false);
  };

  const handleDeleteSuccess = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#F5E5D3] p-6 font-sans">
      {/* Summary Section */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: "Clients", value: clientsCount },
          { label: "Appointments", value: appointmentsCount },
          { label: "Services", value: servicesCount },
          { label: "Products", value: productsCount },
        ].map((item, index) => (
          <div key={index} className="bg-[#E1C6A8] p-6 rounded-md shadow-md text-center">
            <h2 className="text-xl font-semibold text-[#704214]">{item.label}</h2>
            <p className="text-3xl font-bold text-[#704214]">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Upcoming Appointments */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-[#704214] mb-4">Upcoming appointments</h2>
        <div className="space-y-4">
          {appointments && appointments.length > 0 ? (
            appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between bg-white p-4 rounded-md shadow-md"
              >
                <div>
                  <h3 className="text-lg font-semibold text-[#704214]">{appointment.client.name}</h3>
                  <p className="text-sm text-[#704214]">{appointment.service.name}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="text-sm text-[#704214]">{appointment.start_date}</p>
                  <p className="text-sm text-[#704214]">{appointment.hour.slice(0, -3)}</p>
                  <Link to={`/appointment/${appointment.id}`} className="text-yellow-500 hover:text-yellow-600">
                    <i className="fa-regular fa-pen-to-square"></i>
                  </Link>
                  <button onClick={() => openModal(appointment.id)} className="text-red-500 hover:text-red-600">
                    <i className="fa-solid fa-x"></i>
                  </button>
                </div>
                {/* Modal */}
                {isDeleteAppointmentModalOpen && (
                  <DeleteAppointmentModal
                    appointmentId={deleteAppointmentId}
                    onClose={closeModal}
                    onDelete={handleDeleteSuccess}
                  />
                )}
              </div>
            ))
          ) : (
            <h1 className="text-3xl text-center text-[#704214]">No upcoming appointments.</h1>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button
          onClick={() => setIsNewAppointmentModalOpen(true)}
          className="bg-green-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-700"
        >
          New Appointment
        </button>

        {/* Modal */}
        <NewAppointmentModal
          isOpen={isNewAppointmentModalOpen}
          onClose={() => {
            setIsNewAppointmentModalOpen(false)
            navigate("/dashboard")
          }}
        />

        <button
          onClick={() => setIsNewClientModalOpen(true)}
          className="bg-green-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-700"
        >
          New Client
        </button>

        {/* Modal */}
        <NewClientModal
          isOpen={isNewClientModalOpen}
          onClose={() => {
            setIsNewClientModalOpen(false)
            navigate("/dashboard")
          }}
        />

        <Link to={"/appointments"} className="bg-[#E1C6A8] text-[#704214] py-2 px-4 rounded-md shadow-md hover:bg-[#d4b090]">
          Manage appointments
        </Link>
      </div>
    </div>
  );
}
