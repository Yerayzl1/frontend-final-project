import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/fullcalendar-custom.css";

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("/api/events");
        const data = await response.json();

        const formattedEvents = data.map((event) => ({
          title: event.summary,
          start: event.start.dateTime || event.start.date, 
          end: event.end.dateTime || event.end.date,       
        }));

        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }

    fetchEvents();
  }, []);

  const handleSyncClick = () => {
    navigate("/calendar/view");
  };

  return (
    <div className="min-h-screen bg-[#F5E5D3] p-6 font-sans">
      {/* Sync Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={handleSyncClick}
          className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700"
        >
          Sync with Google Calendar
        </button>
      </div>

    {/* FullCalendar */}
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
    </div>
  );
}