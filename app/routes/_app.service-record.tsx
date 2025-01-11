import { useState } from "react";
import EditOneServiceModal from './services/EditOneServiceModal';
import DeleteServiceModal from "./services/DeleteServiceModal";

export default function ServiceRecord() {
  const [records, setRecords] = useState([
    {
      id: 1,
      service: "Haircut",
      description: "Haircut for a customer",
      price: "20.00€",
      client: "Sarah Johnson",
      professional: "John Bones",
      date: "22/03/2024",
      total: "20.00€",
      payment: "Credit",
    },
    {
      id: 2,
      service: "Haircut",
      description: "Haircut for a customer",
      price: "20.00€",
      client: "Sarah Johnson",
      professional: "John Bones",
      date: "22/03/2024",
      total: "20.00€",
      payment: "Credit",
    },
    {
      id: 3,
      service: "Haircut",
      description: "Haircut for a customer",
      price: "20.00€",
      client: "Sarah Johnson",
      professional: "John Bones",
      date: "22/03/2024",
      total: "20.00€",
      payment: "Credit",
    },
    {
      id: 4,
      service: "Haircut",
      description: "Haircut for a customer",
      price: "20.00€",
      client: "Sarah Johnson",
      professional: "John Bones",
      date: "22/03/2024",
      total: "20.00€",
      payment: "Credit",
    },
    {
      id: 5,
      service: "Haircut",
      description: "Haircut for a customer",
      price: "20.00€",
      client: "Sarah Johnson",
      professional: "John Bones",
      date: "22/03/2024",
      total: "20.00€",
      payment: "Credit",
    },
    {
      id: 6,
      service: "Haircut",
      description: "Haircut for a customer",
      price: "20.00€",
      client: "Sarah Johnson",
      professional: "John Bones",
      date: "22/03/2024",
      total: "20.00€",
      payment: "Credit",
    },
  ]);

  const [isEditOneServiceModalOpen, setIsEditOneServiceModalOpen] = useState(false);
  const [isDeleteServiceModalOpen, setIsDeleteServiceModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  
  const handleOpenModal = (service) => {
    setSelectedService(service);
    setIsEditOneServiceModalOpen(true);
  };
  
  const handleUpdateService = (updatedService) => {
    console.log("Updated Service:", updatedService);
    setIsEditOneServiceModalOpen(false);
  };

  const handleOpenDeleteModal = (service) => {
    setSelectedService(service);
    setIsDeleteServiceModalOpen(true);
  };

  const handleDeleteService = (id) => {
    console.log("Deleted service ID:", id);
    setIsDeleteServiceModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F5E5D3] p-6 font-sans">

      {/* Search Bar */}
      <div className="flex justify-end mb-6">
        <input
          type="text"
          placeholder="Search a record"
          className="rounded-lg px-4 py-2 text-white placeholder:text-white focus:outline-none bg-gray-500"
        />
      </div>

     {/* Recent Services */}
     <div className="bg-[#E1C6A8] p-4 rounded-md shadow-md mb-8">
        <div className="space-y-4">
          {records.map((service, index) => (
            <div
              key={index}
              className="flex justify-between bg-white p-4 rounded-full shadow-md"
            >
              {/* Icon and Service Info */}
              <div className="flex items-center space-x-4">
                <img
                  src={`/img/services/${service.service.toLowerCase().replace(" ", "-")}.webp`}
                  alt={service.service}
                  className="w-10 h-10 rounded-lg"
                />
              <div>
                <p className="text-sm font-semibold text-[#704214]">{service.service}</p>
                <p className="text-xs text-gray-500">{service.price}</p>
              </div>
            </div>

              {/* Client and Professional */}
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <p className="text-sm font-semibold text-[#704214]">{service.client}</p>
                  <p className="text-xs text-gray-500">{service.client.toLowerCase()}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-[#704214]">{service.professional}</p>
                  <p className="text-xs text-gray-500">{service.professional.toLowerCase()}</p>
                </div>
              </div>

              {/* Date, Price, and Payment */}
              <div className="flex items-center space-x-4">
                <p className="text-sm text-[#704214]">{service.date}</p>
                <p className="text-sm font-semibold text-[#704214]">{service.price}</p>
                <p className="text-sm text-gray-500">{service.payment}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button onClick={() => handleOpenModal(service)} className="text-yellow-500 hover:text-yellow-600">
                  <i className="fa-regular fa-pen-to-square"></i>
                </button>
                <div className="border-l border-gray-300"></div>
                <button onClick={() => handleOpenDeleteModal(service)} className="text-red-500 hover:text-red-600">
                  <i className="fa-regular fa-trash-can"></i>
                </button>
              </div>

              {/* Edit Service Modal */}
              {isEditOneServiceModalOpen && (
                <EditOneServiceModal
                  isOpen={isEditOneServiceModalOpen}
                  onClose={() => setIsEditOneServiceModalOpen(false)}
                  service={selectedService}
                  onUpdate={handleUpdateService}
                />
              )}

              {/* Delete Service Modal */}
              {isDeleteServiceModalOpen && selectedService && (
                <DeleteServiceModal
                  isOpen={isDeleteServiceModalOpen}
                  onClose={() => setIsDeleteServiceModalOpen(false)}
                  service={selectedService}
                  onDelete={handleDeleteService}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
