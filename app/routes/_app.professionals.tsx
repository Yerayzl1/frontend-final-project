import Chart from "../components/Chart";
import AddProfessionalModal from "./professionals/AddProfessionalModal";
import ManageProfessionalsModal from "./professionals/ManageProfessionalsModal";
import { useState } from "react";
import AddReportModal from "./reports/AddReportModal";
import ManageReportsModal from "./reports/ManageReportsModal";
import { ProfessionalsData } from '~/components/data/professionals.server';
import { useLoaderData, useNavigate } from '@remix-run/react';

export async function loader() {
  return await ProfessionalsData();
}

export default function Professionals() {
  const navigate = useNavigate();

  const { appointmentsToday, appointmentsWeek, appointmentsMonth, appointmentsYear, professionals, reports } = useLoaderData();
  const [isAddProfessionalModalOpen, setIsAddProfessionalModalOpen] = useState(false);
  const [isManageProfessionalModalOpen, setIsManageProfessionalModalOpen] = useState(false);
  const [isAddReportModalOpen, setIsAddReportModalOpen] = useState(false);
  const [isManageReportModalOpen, setIsManageReportModalOpen] = useState(false);
  const [createdReports, setCreatedReports] = useState(reports);

  const handleAddProfessional = (newProfessional: any) => {
    professionals.push(newProfessional);
    navigate("/professionals");
  };

  const handleUpdateProfessional = (updatedProfessional) => {
    const index = professionals.findIndex((pro) => pro.id === updatedProfessional.id);
    professionals[index] = updatedProfessional;
    navigate("/professionals");
  };

  const handleGenerateReport = (reportData) => {
    setCreatedReports((prev) => [...prev, reportData]);
  };

  const handleDeleteReport = (reportId: number) => {
    setCreatedReports((prev) => prev.filter((report) => report.id !== reportId));
  };

  return (
    <div className="min-h-screen bg-[#F5E5D3] p-6 font-sans">

      {/* Stats Section */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: "Appointments for today", value: appointmentsToday },
          { label: "Appointments for week", value: appointmentsWeek },
          { label: "Appointments for month", value: appointmentsMonth },
          { label: "Appointments for year", value: appointmentsYear },
        ].map((item, index) => (
          <div key={index} className="bg-[#E1C6A8] p-6 rounded-md shadow-md text-center">
            <h2 className="text-xl font-semibold text-[#704214]">{item.label}</h2>
            <p className="text-3xl font-bold text-[#704214]">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Professionals Section */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold text-[#704214] mb-4">Professionals</h2>
          <div className="space-y-4">
            {professionals.map((pro) => (
              <div
                key={pro.id}
                className="flex items-center justify-between bg-white p-4 rounded-md shadow-md"
              >
                <div>
                  <h3 className="text-lg font-semibold text-[#704214]">{pro.name}</h3>
                  <p className="text-sm text-[#704214]">{pro.email}</p>
                  <p className="text-sm text-[#704214]">{pro.phone_number}</p>
                </div>
                <p
                  className={`text-sm font-bold ${
                    pro.is_active ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {pro.is_active ? "Online" : "Offline"}
                </p>
              </div>
            ))}
          </div>
          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button onClick={() => setIsAddProfessionalModalOpen(true)} className="bg-green-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-700">
              New professional
            </button>
            <button onClick={() => setIsManageProfessionalModalOpen(true)} className="bg-[#E1C6A8] text-[#704214] py-2 px-4 rounded-md shadow-md hover:bg-[#d4b090]">
              Modify professional
            </button>
          </div>
          {/* Add Professional Modal */}
          {isAddProfessionalModalOpen && (
            <AddProfessionalModal
              isOpen={isAddProfessionalModalOpen}
              onClose={() => setIsAddProfessionalModalOpen(false)}
              onAdd={handleAddProfessional}
            />
          )}
          {/* Manage Professional Modal */}
          {isManageProfessionalModalOpen && (
            <ManageProfessionalsModal
              isOpen={isManageProfessionalModalOpen}
              onClose={() => setIsManageProfessionalModalOpen(false)}
              professionals={professionals}
              onUpdate={handleUpdateProfessional}
            />
          )}
        </div>

        {/* Reports */}
        <div>
          <h2 className="text-2xl font-semibold text-[#704214] mb-4">Reports</h2>
          <div className="grid grid-cols-2 gap-4">
            {reports.map((report) => (
              <div key={report.id} className="[#D8C3A5] p-4 rounded-md shadow-md">
                <h3 className="text-center text-lg font-semibold text-[#704214] mb-2">{report.name}</h3>
                <div className="flex justify-center">
                  <Chart
                    data={{
                      labels: report.labels,
                      datasets: [
                        {
                          label: `Appointments`,
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
            <button onClick={() => setIsAddReportModalOpen(true)} className="bg-green-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-700">
              New report
            </button>
            <button onClick={() => setIsManageReportModalOpen(true)} className="bg-[#E1C6A8] text-[#704214] py-2 px-4 rounded-md shadow-md hover:bg-[#d4b090]">
              Modify report
            </button>
          </div>
          {/* Add Report Modal */}
          {isAddReportModalOpen && (
            <AddReportModal
              isOpen={isAddReportModalOpen}
              onClose={() => setIsAddReportModalOpen(false)}
              onGenerateReport={handleGenerateReport}
              professionals={professionals}
            />
          )}
          {/* Manage Report Modal */}
          {isManageReportModalOpen && (
            <ManageReportsModal
              isOpen={isManageReportModalOpen}
              onClose={() => setIsManageReportModalOpen(false)}
              reports={createdReports}
              onDelete={handleDeleteReport}
            />
          )}
        </div>
      </div>
    </div>
  );
}
