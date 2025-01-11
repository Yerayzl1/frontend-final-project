export async function AppointmentsData({ page = 1, limit = 10, query = "" }: { page?: number; limit?: number; query?: string }) {
  try {
    let queryParams = `?page=${page}&limit=${limit}`;
    if (query) {
      queryParams += `&service.name=${query}&professional.name=${query}&client.name=${query}&start_date=${query}&total_price=${query}&payment_method=${query}`;
    }

    const response = await fetch(
      `http://localhost:8000/api/appointments/search${queryParams}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch appointments.");
    }

    const data = await response.json();
    return {
      appointments: data.data,
      total_elements: data.total_elements,
      total_pages: data.total_pages,
    };
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return {
      appointments: [],
      total_elements: 0,
      total_pages: 0,
    };
  }
}
