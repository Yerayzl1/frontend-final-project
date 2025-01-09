import Chart from "../components/Chart";
import AddProfessionalModal from "./professionals/AddProfessionalModal";
import ManageProfessionalsModal from "./professionals/ManageProfessionalsModal";
import { useState } from "react";
import AddReportModal from "./reports/AddReportModal";
import ManageReportsModal from "./reports/ManageReportsModal";

export default function Professionals() {
  const [isAddProfessionalModalOpen, setIsAddProfessionalModalOpen] = useState(false);
  const [isManageProfessionalModalOpen, setIsManageProfessionalModalOpen] = useState(false);
  const [isAddReportModalOpen, setIsAddReportModalOpen] = useState(false);
  const [isManageReportModalOpen, setIsManageReportModalOpen] = useState(false);

  const [professionals, setProfessionals] = useState([
    { id: 1, name: "John Doe", email: "john.doe@example.com", phone: "123456789" },
    { id: 2, name: "Sarah Smith", email: "sarah.smith@example.com", phone: "987654321" },
    { id: 3, name: "James Brown", email: "james.brown@example.com", phone: "456123789" },
    { id: 4, name: "Emma Wilson", email: "emma.wilson@example.com", phone: "321456987" },
    { id: 5, name: "Olivia Jones", email: "olivia.jones@example.com", phone: "654987123" },
  ]);

  const reports = [
    { name: "Sarah Johnson", data: [12, 19, 3, 5, 2, 3], labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    { name: "John Bones", data: [5, 2, 8, 1, 6, 4], labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    { name: "Yeray Zafra", data: [10, 15, 9, 3, 7, 12], labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    { name: "Jessica Jones", data: [3, 6, 4, 9, 2, 8], labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
  ];

  const [createdReports, setCreatedReports] = useState([
    { id: 1, title: "January Report", date: "2025-01-31" },
    { id: 2, title: "February Report", date: "2025-02-28" },
    { id: 3, title: "March Report", date: "2025-03-31" },
    { id: 4, title: "April Report", date: "2025-04-30" },
    { id: 5, title: "May Report", date: "2025-05-31" },
  ]);


  {/* Add Professional Modal */}
  const openAddModal = () => setIsAddProfessionalModalOpen(true);
  const closeAddModal = () => setIsAddProfessionalModalOpen(false);
  {/* Manage Professional Modal */}
  const openManageModal = () => setIsManageProfessionalModalOpen(true);
  const closeManageModal = () => setIsManageProfessionalModalOpen(false);
  {/* Add Report Modal */}
  const openAddReportModal = () => setIsAddReportModalOpen(true);
  const closeAddReportModal = () => setIsAddReportModalOpen(false);
  {/* Manage Report Modal */}
  const openManageReportModal = () => setIsManageReportModalOpen(true);
  const closeManageReportModal = () => setIsManageReportModalOpen(false);

  const handleAddProfessional = (professional) => {
    setProfessionals((prev) => [
      ...prev,
      { id: prev.length + 1, ...professional },
    ]);
    console.log("Added Professional:", professional);
  };

  const handleUpdateProfessional = (updatedProfessional) => {
    setProfessionals((prev) =>
      prev.map((p) =>
        p.id === updatedProfessional.id ? updatedProfessional : p
      )
    );
    console.log("Updated Professional:", updatedProfessional);
  };

  const handleGenerateReport = (reportData) => {
    console.log("Report Data:", reportData);
  };

  const handleEditReport = (reportId: number) => {
    console.log("Editing report:", reportId);
  };

  const handleDeleteReport = (reportId: number) => {
    setCreatedReports((prev) => prev.filter((report) => report.id !== reportId));
    console.log("Deleted report:", reportId);
  };

  return (
    <div className="min-h-screen bg-[#F5E5D3] p-6 font-sans">

      {/* Stats Section */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: "Appointments for today", value: 5 },
          { label: "Appointments for week", value: 10 },
          { label: "Appointments for month", value: 15 },
          { label: "Appointments for year", value: 100 },
        ].map((item, index) => (
          <div key={index} className="bg-[#E1C6A8] p-6 rounded-md shadow-md text-center">
            <h2 className="text-xl font-semibold text-[#704214]">{item.label}</h2>
            <p className="text-3xl font-bold text-[#704214]">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Professionals Section */}
      <div className="grid grid-cols-2 gap-6">
        {/* Professionals */}
        <div>
          <h2 className="text-2xl font-semibold text-[#704214] mb-4">Professionals</h2>
          <div className="space-y-4">
            {[
              { name: "Sarah Johnson", specialty: "Haircut & styling", status: "Online" },
              { name: "Yeray Zafra", specialty: "Nailing & depilation", status: "Online" },
              { name: "John Bones", specialty: "Haircut", status: "Offline" },
              { name: "Jessica Jones", specialty: "Styling", status: "Offline" },
            ].map((pro, index) => (
              <div key={index} className="flex items-center justify-between bg-white p-4 rounded-md shadow-md">
                <div>
                  <h3 className="text-lg font-semibold text-[#704214]">{pro.name}</h3>
                  <p className="text-sm text-[#704214]">{pro.specialty}</p>
                </div>
                <p
                  className={`text-sm font-bold ${
                    pro.status === "Online" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {pro.status}
                </p>
              </div>
            ))}
          </div>
          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button onClick={openAddModal} className="bg-green-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-700">
              New professional
            </button>
            <button onClick={openManageModal} className="bg-[#E1C6A8] text-[#704214] py-2 px-4 rounded-md shadow-md hover:bg-[#d4b090]">
              Modify professional
            </button>
          </div>
          {/* Add Professional Modal */}
          {isAddProfessionalModalOpen && (
            <AddProfessionalModal
              isOpen={isAddProfessionalModalOpen}
              onClose={closeAddModal}
              onAdd={handleAddProfessional}
            />
          )}
          {/* Manage Professional Modal */}
          {isManageProfessionalModalOpen && (
            <ManageProfessionalsModal
              isOpen={isManageProfessionalModalOpen}
              onClose={closeManageModal}
              professionals={professionals}
              onUpdate={handleUpdateProfessional}
            />
          )}
        </div>

        {/* Reports */}
        <div>
          <h2 className="text-2xl font-semibold text-[#704214] mb-4">Reports</h2>
          <div className="grid grid-cols-2 gap-4">
            {reports.map((report, index) => (
              <div key={index} className="[#D8C3A5] p-4 rounded-md shadow-md">
                <h3 className="text-center text-lg font-semibold text-[#704214] mb-2">{report.name}</h3>
                <div className="flex justify-center">
                  <Chart
                    data={{
                      labels: report.labels,
                      datasets: [
                        {
                          label: "Performance",
                          data: report.data,
                          backgroundColor: "#00DDFF",
                          borderColor: "#A3A3A3",
                          borderWidth: 1,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { display: false },
                        tooltip: { enabled: true },
                      },
                    }}
                    width={150}
                    height={150}
                  />
                </div>
              </div>
            ))}
          </div>
          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button onClick={openAddReportModal} className="bg-green-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-700">
              New report
            </button>
            <button onClick={openManageReportModal} className="bg-[#E1C6A8] text-[#704214] py-2 px-4 rounded-md shadow-md hover:bg-[#d4b090]">
              Modify report
            </button>
          </div>
          {/* Add Report Modal */}
          {isAddReportModalOpen && (
            <AddReportModal
              isOpen={isAddReportModalOpen}
              onClose={closeAddReportModal}
              onGenerateReport={handleGenerateReport}
              professionals={professionals}
            />
          )}
          {/* Manage Report Modal */}
          {isManageReportModalOpen && (
            <ManageReportsModal
              isOpen={isManageReportModalOpen}
              onClose={closeManageReportModal}
              reports={createdReports}
              onEdit={handleEditReport}
              onDelete={handleDeleteReport}
            />
          )}
        </div>
      </div>
    </div>
  );
}
