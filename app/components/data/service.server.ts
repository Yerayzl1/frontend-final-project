import { format, startOfWeek, subWeeks, endOfToday } from "date-fns";

export async function ServiceData() {
  const endDate = endOfToday();
  const startDate = startOfWeek(subWeeks(endDate, 3));

  const formattedStartDate = format(startDate, "yyyy-MM-dd");
  const formattedEndDate = format(endDate, "yyyy-MM-dd");

  try {
    // Fetch services done and earnings data
    const [servicesResponse, recentAppointmentsResponse, allServicesResponse] = await Promise.all([
      fetch("http://localhost:8000/api/services/done", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
        body: JSON.stringify({
          start_date: formattedStartDate,
          end_date: formattedEndDate,
        }),
      }),
      fetch("http://localhost:8000/api/appointments/search?limit=4", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
      }),
      fetch("http://localhost:8000/api/services", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
      }),
    ]);

    if (!servicesResponse.ok) {
      throw new Error("Failed to fetch services done data");
    }

    if (!recentAppointmentsResponse.ok) {
      throw new Error("Failed to fetch recent services");
    }

    if (!allServicesResponse.ok) {
      throw new Error("Failed to fetch all services");
    }

    const servicesData = await servicesResponse.json();
    const recentAppointments = await recentAppointmentsResponse.json();
    const services = await allServicesResponse.json();

    return {
      labels: servicesData.labels,
      servicesData: servicesData.data,
      earningsData: servicesData.earnings || [0, 0, 0, 0],
      recentAppointments: recentAppointments.data,
      services: services.data,
    };
  } catch (error) {
    console.error("Error fetching services and earnings data:", error);
    return {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      servicesData: [0, 0, 0, 0],
      earningsData: [0, 0, 0, 0],
      recentAppointments: [],
      allServices: [],
    };
  }
}
