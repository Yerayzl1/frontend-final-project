import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState, useEffect } from "react";

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authUrl, setAuthUrl] = useState("");
  const [error, setError] = useState("");
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const errorParam = queryParams.get("error");
    if (errorParam) {
      setError(decodeURIComponent(errorParam));
      return;
    }

    async function checkAuth() {
      try {
        const response = await fetch("http://localhost:8000/api/google/check-auth");
        const data = await response.json();
        setIsAuthenticated(data.authenticated);

        if (!data.authenticated) {
          const authResponse = await fetch("http://localhost:8000/api/google/auth-url");
          const authData = await authResponse.json();
          setAuthUrl(authData.authUrl);
        } else {
          fetchEvents();
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setIsAuthLoading(false);
      }
    }

    async function fetchEvents() {
      try {
        const response = await fetch("http://localhost:8000/api/google/events");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();
        const formattedEvents = data.map((event) => ({
          title: event.summary,
          start: event.start.dateTime || event.start,
          end: event.end.dateTime || event.end,
        }));

        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }

    checkAuth();
  }, []);

  return (
    <div className="min-h-screen bg-[#F5E5D3] p-6 font-sans">
      {error && (
        <div className="text-center mb-4">
          <p className="text-red-600 text-lg font-semibold">{error}</p>
        </div>
      )}
      {!isAuthenticated ? (
        <div className="flex justify-center items-center h-full">
          <a
            href={authUrl}
            className={`bg-blue-600 text-white py-2 px-4 rounded-md shadow-md ${
              isAuthLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
            style={{ pointerEvents: isAuthLoading ? "none" : "auto" }}
          >
            {isAuthLoading ? "Loading..." : "Authenticate with Google"}
          </a>
        </div>
      ) : (
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={events}
          editable={false}
          selectable={true}
        />
      )}
    </div>
  );
}
