import { memo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { formatDate } from "../redux/utils";

const Calendar = memo(({
  calendarEvents,
  handleDateSelect,
  handleEventClick,
}) => {
  const mapCalendarEventEventsToCalendar = (arr = []) => {
    const result = arr.map((obj) => {
      const res = {};
      res["title"] = obj["title"];
      res["date"] = formatDate(obj["dueDate"]);
      res["start"] = obj["start"]
        ? res["date"] + "T" + obj["start"] + ":00"
        : res["date"] + "T12:00:00";
      res["id"] = obj["_id"];
      res["createdAt"] = obj["createdAt"];
      res["description"] = obj["description"];
      res["dueDate"] = obj["dueDate"];
      res["status"] = obj["status"];
      res["updatedAt"] = obj["updatedAt"];
      res["start2"] = obj["start"];
      return res;
    });
    return result;
  };

  const renderEventContent = (eventInfo) => {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  };

  return (
    <div className="col-md-12" id="calendar">
      {calendarEvents ? (
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          // plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          weekends={true}
          events={mapCalendarEventEventsToCalendar(calendarEvents)}
          // events={INITIAL_EVENTS}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          // eventsSet={handleEvents} // called after events are initialized/added/changed/removed
        />
      ) : (
        <div>No Calendar Events to Show</div>
      )}
    </div>
  );
});

export default Calendar;
