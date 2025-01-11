import React from "react";

export default function ManageReportsModal({
  isOpen,
  onClose,
  reports,
  onDelete,
}: {
  isOpen: boolean;
  onClose: () => void;
  reports: { id: number; name: string; labels: string[]; total_appointments: number; }[];
  onDelete: (reportId: number) => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#704214]">Manage Reports</h1>
          <button
            onClick={onClose}
            className="text-[#704214] hover:text-red-600"
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* Lista de reportes */}
        <ul className="space-y-4">
          {reports.map((report) => (
            <li
              key={report.id}
              className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm"
            >
              <div>
                <p className="text-lg font-bold text-[#704214]">{report.name}</p>
                <p className="text-sm text-gray-600">{report.labels[0]} - {report.labels[report.labels.length - 1]}</p>
                <p className="text-sm text-gray-600">{report.total_appointments}</p>
              </div>
              <button
                onClick={() => onDelete(report.id)}
                className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
