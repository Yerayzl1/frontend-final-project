export async function DashboardData() {
  const errors = [];

  try {
    const [clientsResponse, countAppointmentsResponse, servicesResponse, productsResponse, appointmentsResponse] = await Promise.all([
      fetch(`http://localhost:8000/api/dashboard/clients-count`, {
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
      }),
      fetch(`http://localhost:8000/api/dashboard/appointments-count`, {
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
      }),
      fetch(`http://localhost:8000/api/dashboard/services-count`, {
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
      }),
      fetch(`http://localhost:8000/api/dashboard/products-count`, {
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
      }),
      fetch(`http://localhost:8000/api/appointments/search?limit=4`, {
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
      }),
    ]);

    if (!clientsResponse.ok) {
      errors.push(await clientsResponse.json());
    }

    if (!countAppointmentsResponse.ok) {
      errors.push(await countAppointmentsResponse.json());
    }

    if (!servicesResponse.ok) {
      errors.push(await servicesResponse.json());
    }

    if (!productsResponse.ok) {
      errors.push(await productsResponse.json());
    }

    if (!appointmentsResponse.ok) {
      errors.push(await appointmentsResponse.json());
    }

    if (errors.length > 0) {
      throw new Error(errors.map(error => JSON.stringify(error)).join(', '));
    }

    const clientsData = await clientsResponse.json();
    const countAppointmentsData = await countAppointmentsResponse.json();
    const servicesData = await servicesResponse.json();
    const productsData = await productsResponse.json();
    const appointmentsData = await appointmentsResponse.json();

    return {
      clientsCount: clientsData.clientsCount,
      appointmentsCount: countAppointmentsData.appointmentsCount,
      servicesCount: servicesData.servicesCount,
      productsCount: productsData.productsCount,
      appointments: appointmentsData.data,
    };
  } catch (err) {
    console.error("Unable to fetch data from the server.", err);
    return {
      clientsCount: 0,
      appointmentsCount: 0,
      servicesCount: 0,
      productsCount: 0,
      appointments: [],
    };
  }
}