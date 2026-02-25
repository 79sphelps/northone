import React, { memo, useMemo, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import DateSelectArg from "@fullcalendar/react";
import EventClickArg from "@fullcalendar/react";
import EventContentArg from "@fullcalendar/react";
import EventInput from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { formatDate } from "../../../redux/utils";
import { ICalendarEvent } from "../../../redux/types";

interface CalendarProps {
  calendarEvents: ICalendarEvent[];
  handleDateSelect: (selectInfo: DateSelectArg) => void;
  handleEventClick: (clickInfo: EventClickArg) => void;
}

const Calendar: React.FC<CalendarProps> = memo(
  ({ calendarEvents, handleDateSelect, handleEventClick }) => {
    const events: EventInput[] = useMemo(() => {
      return calendarEvents.map((event) => {
        const date = formatDate(event.dueDate as string);
        const startTime = event.start
          ? `${date}T${event.start}:00`
          : `${date}T12:00:00`;

        return {
          id: event._id,
          title: event.title,
          start: startTime,
          extendedProps: {
            description: event.description,
            dueDate: event.dueDate,
            status: event.status,
            start: event.start,
          },
        };
      });
    }, [calendarEvents]);

    const renderEventContent = useCallback(
      (eventInfo: EventContentArg) => (
        <>
          <b>{eventInfo.timeText}</b> <i>{eventInfo.event.title}</i>
        </>
      ),
      []
    );

    if (!calendarEvents.length) {
      return <div className="col-md-12 mb-5">No Calendar Events to Show</div>;
    }

    return (
      <div className="col-md-12 mb-5" id="calendar">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          weekends
          editable
          selectable
          selectMirror
          dayMaxEvents
          events={events}
          select={handleDateSelect}
          eventClick={handleEventClick}
          eventContent={renderEventContent}
        />
      </div>
    );
  }
);

export default Calendar;
