import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

const DoctorFullCalendar = () => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        start: "today prev,next",
        center: "title",
        end: "dayGridMonth,timeGridWeek,timeGridDay",
      }}
      droppable={true}
      allDaySlot={false}
      events={[
        {
          title: "event 1",
          start: "2024-01-08T04:30:00",
          end: "2024-01-08T06:00:00",
          textColor: "#ffffff",
          backgroundColor: "purple",
          borderColor: "transparent",
        },
        {
          title: "event 1",
          start: "2024-01-09T01:30:00",
          end: "2024-01-09T02:00:00",
        },
      ]}
    />
  );
};

export default DoctorFullCalendar;
