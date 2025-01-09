import React, { useEffect, useState } from "react";
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

export default function UserReportModal({
  isOpen,
  onClose,
  user,
  getReportData,
}: {
  isOpen: boolean;
  onClose: () => void;
  user: { id: number; name: string };
  getReportData: (userId: number) => {
    labels: string[];
    data: number[];
  };
}) {
  const [chartData, setChartData] = useState<{ labels: string[]; data: number[] } | null>(null);

  useEffect(() => {
    if (isOpen && user) {
      const reportData = getReportData(user.id); 
      setChartData(reportData);
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#704214]">Performance Report</h1>
          <button
            onClick={onClose}
            className="text-[#704214] hover:text-red-600"
            title="Close"
          >
            ✕
          </button>
        </div>

        {chartData ? (
          <div className="h-64">
            <Bar
              data={{
                labels: chartData.labels,
                datasets: [
                  {
                    label: "Performance",
                    data: chartData.data,
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
            />
          </div>
        ) : (
          <p className="text-center text-gray-600">Loading data...</p>
        )}
      </div>
    </div>
  );
}
