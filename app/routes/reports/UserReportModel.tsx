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
}: {
  isOpen: boolean;
  onClose: () => void;
  user: { id: number; name: string };
}) {
  const [chartData, setChartData] = useState<{ labels: string[]; data: number[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen && user) {
      fetchReportData(user.id);
    }
  }, [isOpen, user]);

  const fetchReportData = async (professionalId: number) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8000/api/professionals/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          professional_id: professionalId,
          start_month_year: new Date().toISOString().slice(0, 7),
          time_range: 6,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setChartData({
          labels: data.labels,
          data: data.data,
        });
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to fetch report data.");
      }
    } catch (error) {
      console.error("Error fetching report data:", error);
      setError("An error occurred while fetching the report.");
    } finally {
      setLoading(false);
    }
  };

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

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : chartData ? (
          <div className="h-64">
            <Bar
              data={{
                labels: chartData.labels,
                datasets: [
                  {
                    label: "Appointments",
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
          <p className="text-center text-gray-600">No data available for this report.</p>
        )}
      </div>
    </div>
  );
}
