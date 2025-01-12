import { useEffect, useState } from "react";
import { Link, useLoaderData } from '@remix-run/react';
import Chart from "../components/Chart";
import EditAppointmentModal from './appointments/EditAppointmentModal';
import DeleteAppointmentModal from './appointments/DeleteAppointmentModal';
import EditOneServiceModal from "./services/EditOneServiceModal";
import DeleteServiceModal from "./services/DeleteServiceModal";
import { ServiceData } from '~/components/data/service.server';

export async function loader() {
  const data = await ServiceData();
  return data;
}

export default function Service() {
  const { labels, appointmentsData, earningsData, recentAppointments, services } = useLoaderData();

  useEffect(() => {
    const roleId = localStorage.getItem("role_id");
    if (roleId !== "1") {
      window.location.href = "/services";
    }
  }, []);

  const [isEditAppointmentModalOpen, setIsEditAppointmentModalOpen] = useState(false);
  const [isDeleteAppointmentModalOpen, setIsDeleteAppointmentModalOpen] = useState(false);
  const [isEditOneServiceModalOpen, setIsEditOneServiceModalOpen] = useState(false);
  const [isDeleteServiceModalOpen, setIsDeleteServiceModalOpen] = useState(false);

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  const handleOpenEditAppointmentModal = (appointment) => {
    setSelectedAppointment(appointment);
    setIsEditAppointmentModalOpen(true);
  };
  
  const handleUpdateAppointment = () => {
    window.location.reload();
  };

  const handleOpenDeleteAppointmentModal = (appointment) => {
    setSelectedAppointment(appointment);
    setIsDeleteAppointmentModalOpen(true);
  };

  const handleDeleteAppointment = () => {
    window.location.reload();
  };

  const handleOpenEditServiceModal = (service) => {
    setSelectedService(service);
    setIsEditOneServiceModalOpen(true);
  };

  const handleOpenDeleteServiceModal = (service) => {
    setSelectedService(service);
    setIsDeleteServiceModalOpen(true);
  };

  const handleUpdateOneService = () => {
    window.location.reload();
  };

  const handleDeleteOneService = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#F5E5D3] p-6 font-sans">

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Appointments Done Chart */}
        <div className="[#D8C3A5] p-4 rounded-md shadow-md">
          <h3 className="text-lg font-semibold text-[#704214] mb-2">Appointments Done</h3>
          <Chart
            data={{
              labels: labels,
              datasets: [
                {
                  label: "Appointments Done",
                  data: appointmentsData,
                  backgroundColor: "rgba(0, 173, 255, 0.5)",
                  borderColor: "rgba(0, 173, 255, 1)",
                  borderWidth: 1,
                },
              ],
            }}
            options={{ responsive: true, maintainAspectRatio: true }}
          />
        </div>

        {/* Earnings Chart */}
        <div className="[#D8C3A5] p-4 rounded-md shadow-md">
          <h3 className="text-lg font-semibold text-[#704214] mb-2">Earnings</h3>
          <Chart
            data={{
              labels: labels,
              datasets: [
                {
                  label: "Earnings (€)",
                  data: earningsData,
                  backgroundColor: "rgba(255, 99, 132, 0.5)",
                  borderColor: "rgba(255, 99, 132, 1)",
                  borderWidth: 1,
                },
              ],
            }}
            options={{ responsive: true, maintainAspectRatio: true }}
          />
        </div>
      </div>

      {/* Recent appointments */}
      <div className="bg-[#E1C6A8] p-4 rounded-md shadow-md mb-8">
        <h3 className="text-lg font-semibold text-[#704214] mb-4">Last appointments</h3>
        <div className="space-y-4">
        {recentAppointments.length > 0 ? 
          recentAppointments.map((appointment) => (
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
                <p className="text-sm font-semibold text-[#704214]">{appointment.total_price}€</p>
                <p className="text-sm text-gray-500">{appointment.payment_method}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button onClick={() => handleOpenEditAppointmentModal(appointment)} className="text-yellow-500 hover:text-yellow-600">
                  <i className="fa-regular fa-pen-to-square"></i>
                </button>
                <div className="border-l border-gray-300"></div>
                <button onClick={() => handleOpenDeleteAppointmentModal(appointment)} className="text-red-500 hover:text-red-600">
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
            <h1 className="text-[#704214] text-xl text-center">No last appointments found</h1>
          )}
        </div>

        {/* Find a Appointment Button */}
        <div className="flex justify-end mt-4">
          <Link to={"/appointments"} className="text-white py-2 px-4 rounded-md shadow-md bg-blue-500 hover:bg-blue-600">
            Find a recent appointment
          </Link>
        </div>
      </div>

      {/* Services List */}
      <div className="bg-[#E1C6A8] p-4 rounded-md shadow-md">
        <h3 className="text-lg font-semibold text-[#704214] mb-4">Services</h3>
        <div className="space-y-4">
          {services.length > 0 ? 
            services.map((service) => (
            <div key={service.id} className="flex justify-between items-center bg-[#F5E5D3] p-2 rounded-md shadow-sm">
              <div className="flex items-center space-x-4">
                <img
                  src={`/img/services/${service.name.toLowerCase().replace(" ", "-")}.webp`}
                  alt={service.name}
                  className="w-10 h-10 rounded-lg"
                />
                <p className="text-lg font-semibold text-[#704214]">{service.name}</p>
                <p className="text-sm text-gray-500">{service.price}€</p>
              </div>
              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button onClick={() => handleOpenEditServiceModal(service)} className="text-yellow-500 hover:text-yellow-600">
                  <i className="fa-regular fa-pen-to-square"></i>
                </button>
                <div className="border-l border-gray-300"></div>
                <button onClick={() => handleOpenDeleteServiceModal(service)} className="text-red-500 hover:text-red-600">
                  <i className="fa-regular fa-trash-can"></i>
                </button>
              </div>

              {/* Edit Service Modal */}
              {isEditOneServiceModalOpen && selectedService && (
                <EditOneServiceModal
                  isOpen={isEditOneServiceModalOpen}
                  onClose={() => setIsEditOneServiceModalOpen(false)}
                  service={selectedService}
                  onUpdate={handleUpdateOneService}
                />
              )}

              {/* Delete Service Modal */}
              {isDeleteServiceModalOpen && selectedService && (
                <DeleteServiceModal
                  isOpen={isDeleteServiceModalOpen}
                  onClose={() => setIsDeleteServiceModalOpen(false)}
                  service={selectedService}
                  onDelete={handleDeleteOneService}
                />
              )}
            </div>
          )) : (
            <h1 className="text-[#704214] text-xl text-center">No services found</h1>
          )}
        </div>

        {/* View services Button */}
        <div className="flex justify-end mt-4">
          <Link to={"/services"} className="text-white py-2 px-4 rounded-md shadow-md bg-blue-500 hover:bg-blue-600">
            View all services
          </Link>
        </div>
      </div>
    </div>
  );
}
