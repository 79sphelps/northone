import React, { memo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { formatDate } from "../redux/utils/index.ts";
import { ICalendarEvent } from "../redux/actions/index.ts";

interface ICalendarProps {
  calendarEvents: Array<ICalendarEvent>;       // calendarEvents: Array<EventObj>;
  handleDateSelect: (selectInfo: any) => void;
  handleEventClick: (clickInfo: any) => void;
}

type EventObj = {
  title: string | undefined;
  date: string | undefined;
  start: string | undefined;
  // id: string | undefined;
  _id: string | undefined;
  createdAt: string | undefined;
  description: string | undefined;
  dueDate: string;
  status: boolean | undefined;
  updatedAt: string | undefined;
  start2: string | undefined;
};

const Calendar: React.FC<ICalendarProps> = memo(
  ({ calendarEvents, handleDateSelect, handleEventClick }) => {
    const mapCalendarEventEventsToCalendar: (arr?: EventObj[]) => EventObj[] = (arr: Array<EventObj> = []) => {
    // const mapCalendarEventEventsToCalendar = (arr: Array<ICalendarEvent> = []) => {
      const result = arr.map((obj) => {
        const res: EventObj = {
          title: undefined,
          date: undefined,
          start: undefined,
          // id: undefined,
          _id: undefined,
          createdAt: undefined,
          description: undefined,
          dueDate: "",
          status: undefined,
          updatedAt: undefined,
          start2: undefined,
        };
        res["title"] = obj["title"];
        res["date"] = formatDate(obj["dueDate"]);
        res["start"] = obj["start"]
          ? res["date"] + "T" + obj["start"] + ":00"
          : res["date"] + "T12:00:00";
        // res["id"] = obj["_id"];
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

    const renderEventContent: (eventInfo: any) => React.JSX.Element = (eventInfo: any) => {
      return (
        <>
          <b>{eventInfo.timeText}</b>
          <i>{eventInfo.event.title}</i>
        </>
      );
    };

    return (
      <div className="col-md-12 mb-5" id="calendar">
        {calendarEvents ? (
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            // plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            weekends={true}
            // events={mapCalendarEventEventsToCalendar(calendarEvents)}
            events={mapCalendarEventEventsToCalendar(calendarEvents as Array<EventObj>)}
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
  }
);

export default Calendar;
