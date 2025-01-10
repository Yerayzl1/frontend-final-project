export async function CalendarData() {
  const errors = [];
  let authStatus = false;
  let events = [];

  try {
    // Verificar autenticación con Google
    const authResponse = await fetch("http://localhost:8000/api/google/check-auth", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!authResponse.ok) {
      errors.push("Authentication check failed.");
    } else {
      const authData = await authResponse.json();
      authStatus = authData.authenticated;

      if (authStatus) {
        // Obtener eventos del calendario si está autenticado
        const eventsResponse = await fetch("http://localhost:8000/api/google/events", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!eventsResponse.ok) {
          errors.push("Failed to fetch calendar events.");
        } else {
          const eventsData = await eventsResponse.json();
          events = eventsData.map((event) => ({
            title: event.summary,
            start: event.start.dateTime || event.start.date,
            end: event.end.dateTime || event.end.date,
          }));
        }
      }
    }

    if (errors.length > 0) {
      throw new Error(errors.join(", "));
    }

    return {
      authenticated: authStatus,
      events,
    };
  } catch (err) {
    console.error("Error fetching calendar data:", err);
    return {
      authenticated: false,
      events: [],
    };
  }
}
