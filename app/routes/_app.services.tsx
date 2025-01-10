import { Link, useLoaderData } from "@remix-run/react";
import ViewServiceModal from "./services/ViewServiceModal";
import { useState } from "react";
import { ServicesData } from '~/components/data/services.server';

export const loader = async () => {
  return await ServicesData();
};

export default function Services() {
  const { services, user } = useLoaderData();
  const [isViewServiceModalOpen, setIsViewServiceModalOpen] = useState(false);
  const [viewService, setViewService] = useState(null);

  const openViewModal = (service) => {
    setViewService(service);
    setIsViewServiceModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewServiceModalOpen(false);
    setViewService(null);
  };

  const handleUpdate = (updatedService) => {
    console.log("Updated Service:", updatedService);
  };

  const handleReserve = (reservationData) => {
    console.log("Reservation Data:", reservationData);
  };

  return (
    <div className="min-h-screen bg-[#F5E5D3] p-6 font-sans">
      {/* Grid de Servicios */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <Link
            key={index}
            to="#"
            onClick={() => openViewModal(service)}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
          >
            <div>
              {/* Imagen del Servicio */}
              <img
                src={`/img/services/${service.name.toLowerCase().replace(" ", "-")}.webp`}
                alt={service.name}
                className="w-full h-48 object-cover"
              />
              {/* Nombre del Servicio */}
              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold text-[#704214]">
                  {service.name}
                </h2>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Modal */}
      {isViewServiceModalOpen && viewService && (
        <ViewServiceModal
          isOpen={isViewServiceModalOpen}
          onClose={closeViewModal}
          service={viewService}
          user={user}
          onUpdate={handleUpdate}
          onReserve={handleReserve}
        />
      )}
    </div>
  );
}
