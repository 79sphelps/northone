import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const Calendar = ({
    calendarEvents,
    mapCalendarEventEventsToCalendar,
    handleDateSelect,
    renderEventContent,
    handleEventClick
}) => {

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
    )
}

export default Calendar;
