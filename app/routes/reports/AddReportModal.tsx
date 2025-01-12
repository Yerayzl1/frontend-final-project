import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AddReportModal({
  isOpen,
  onClose,
  professionals,
}: {
  isOpen: boolean;
  onClose: () => void;
  professionals: { id: number; name: string }[];
}) {
  const [formData, setFormData] = useState({
    startMonthYear: "",
    professional: "",
    timeRange: "1",
  });

  const [chartData, setChartData] = useState(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerateReport = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:8000/api/professionals/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          professional_id: parseInt(formData.professional),
          start_month_year: formData.startMonthYear,
          time_range: parseInt(formData.timeRange),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch report data");
      }

      const reportData = await response.json();

      const chartData = {
        labels: reportData.labels,
        datasets: [
          {
            label: "Services Completed",
            data: reportData.data,
            backgroundColor: "#00DDFF",
          },
        ],
      };
  
      setChartData(chartData);
    } catch (error) {
      console.error("Error generating report:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#704214]">
            {chartData ? "Report Chart" : "Generate Report"}
          </h1>
          <button
            onClick={onClose}
            className="text-[#704214] hover:text-red-600"
            title="Close"
          >
            ✕
          </button>
        </div>

        {!chartData ? (
          <form onSubmit={handleGenerateReport} className="space-y-6">
            {/* Start Month and Year */}
            <div>
              <label
                htmlFor="startMonthYear"
                className="block text-sm font-medium text-[#704214]"
              >
                Start Month & Year
              </label>
              <input
                type="month"
                id="startMonthYear"
                name="startMonthYear"
                value={formData.startMonthYear}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
              />
            </div>

            {/* Professional */}
            <div>
              <label
                htmlFor="professional"
                className="block text-sm font-medium text-[#704214]"
              >
                Professional
              </label>
              <select
                id="professional"
                name="professional"
                value={formData.professional}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
              >
                {professionals.length > 0 ? (
                  <>
                    <option value="">Select Professional</option>
                    {professionals.map((professional) => (
                      <option key={professional.id} value={professional.id}>
                        {professional.name}
                      </option>
                    ))}
                  </>
                ) : (
                  <option value="">No professionals available</option>
                )}
              </select>
            </div>

            {/* Time Range */}
            <div>
              <label
                htmlFor="timeRange"
                className="block text-sm font-medium text-[#704214]"
              >
                Time Range (Months, Max: 6)
              </label>
              <input
                type="number"
                id="timeRange"
                name="timeRange"
                value={formData.timeRange}
                onChange={handleChange}
                min="1"
                max="6"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#704214] focus:border-[#704214]"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-blue-700"
              >
                Generate Report
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <Bar
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  title: {
                    display: true,
                    text: "Services Report",
                  },
                },
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
