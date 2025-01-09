import { useState } from "react";
import Chart from "../components/Chart";
import EditServiceModal from "./services/EditServiceModal";
import DeleteServiceModal from "./services/DeleteServiceModal";
import EditOneServiceModal from "./services/EditOneServiceModal";

export default function Service() {
  const servicesDoneData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Services Done",
        data: [10, 15, 8, 20],
        backgroundColor: "rgba(0, 173, 255, 0.5)",
        borderColor: "rgba(0, 173, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const earningsData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Earnings",
        data: [500, 750, 600, 1000],
        backgroundColor: "rgba(0, 173, 255, 0.5)",
        borderColor: "rgba(0, 173, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const recentServices = [
    {
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
      service: "Haircut",
      description: "Haircut for a customer",
      price: "20.00€",
      client: "Sarah Johnson",
      professional: "John Bones",
      date: "22/03/2024",
      total: "20.00€",
      payment: "Credit",
    },
  ];

  const [services, setServices] = useState([
    { id: 1, name: "Haircut", description: "Standard haircut", price: "20.00" },
    { id: 2, name: "Hair dye", description: "Full hair dye", price: "35.00" },
  ]);

  const [isEditServiceModalOpen, setIsEditServiceModalOpen] = useState(false);
  const [isDeleteServiceModalOpen, setIsDeleteServiceModalOpen] = useState(false);
  const [isEditOneServiceModalOpen, setIsEditOneServiceModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedOneService, setSelectedOneService] = useState(null);

  const handleOpenModal = (service) => {
    setSelectedService(service);
    setIsEditServiceModalOpen(true);
  };
  
  const handleUpdateService = (updatedService) => {
    console.log("Updated Service:", updatedService);
    setIsEditServiceModalOpen(false);
  };

  const handleOpenDeleteModal = (service) => {
    setSelectedService(service);
    setIsDeleteServiceModalOpen(true);
  };

  const handleDeleteService = (id) => {
    console.log("Deleted service ID:", id);
    setIsDeleteServiceModalOpen(false);
  };

  const handleOpenEditModal = (service) => {
    setSelectedOneService(service);
    setIsEditOneServiceModalOpen(true);
  };

  const handleUpdateOneService = (updatedService) => {
    setServices((prev) =>
      prev.map((service) =>
        service.id === updatedService.id ? updatedService : service
      )
    );
    console.log("Updated Service:", updatedService);
  };

  return (
    <div className="min-h-screen bg-[#F5E5D3] p-6 font-sans">

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Services Done Chart */}
        <div className="[#D8C3A5] p-4 rounded-md shadow-md">
          <h3 className="text-lg font-semibold text-[#704214] mb-2">Services Done</h3>
          <Chart data={servicesDoneData} options={{ responsive: true, maintainAspectRatio: true }} />
        </div>

        {/* Earnings Chart */}
        <div className="[#D8C3A5] p-4 rounded-md shadow-md">
          <h3 className="text-lg font-semibold text-[#704214] mb-2">Earnings</h3>
          <Chart data={earningsData} options={{ responsive: true, maintainAspectRatio: true }} />
        </div>
      </div>

      {/* Recent Services */}
      <div className="bg-[#E1C6A8] p-4 rounded-md shadow-md mb-8">
        <h3 className="text-lg italic text-[#704214] mb-4">Last services</h3>
        <div className="space-y-4">
          {recentServices.map((service, index) => (
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
              {isEditServiceModalOpen && (
                <EditServiceModal
                  isOpen={isEditServiceModalOpen}
                  onClose={() => setIsEditServiceModalOpen(false)}
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

        {/* Find a Service Button */}
        <div className="flex justify-end mt-4">
          <input
            type="text"
            placeholder="Find a recent service"
            className="rounded-lg px-4 py-2 text-white placeholder:text-white focus:outline-none bg-blue-500"
          />
        </div>
      </div>

      {/* Services List */}
      <div className="bg-[#E1C6A8] p-4 rounded-md shadow-md">
        <h3 className="text-lg font-semibold text-[#704214] mb-4">Services</h3>
        <div className="space-y-4">
          {services.map((service, index) => (
            <div key={index} className="flex justify-between items-center bg-[#F5E5D3] p-2 rounded-md shadow-sm">
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
                <button onClick={() => handleOpenEditModal(service)} className="text-yellow-500 hover:text-yellow-600">
                  <i className="fa-regular fa-pen-to-square"></i>
                </button>
                <div className="border-l border-gray-300"></div>
                <button onClick={() => handleOpenDeleteModal(service)} className="text-red-500 hover:text-red-600">
                  <i className="fa-regular fa-trash-can"></i>
                </button>
              </div>

              {/* Edit Service Modal */}
              {isEditOneServiceModalOpen && selectedOneService && (
                <EditOneServiceModal
                  isOpen={isEditOneServiceModalOpen}
                  onClose={() => setIsEditOneServiceModalOpen(false)}
                  service={selectedOneService}
                  onUpdate={handleUpdateOneService}
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
        {/* Search a Service Button */}
        <div className="flex justify-end mt-4">
          <input
            type="text"
            placeholder="Search a service 🔍"
            className="rounded-lg px-4 py-2 text-white placeholder:text-white focus:outline-none bg-gray-500"
          />
        </div>
      </div>
    </div>
  );
}
