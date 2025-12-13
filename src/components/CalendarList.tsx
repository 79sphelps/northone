import React, { memo } from "react";
import { useCalendarList } from "./useCalendarList.ts";
import { ICalendarEvent } from "../redux/actions/index.ts";

interface ICalendarListProps {
  calendarEvents: ICalendarEvent[];
  setActiveCalendarEvent: (
    calendarEvent: ICalendarEvent,
    index: number
  ) => void;
  currentIndex: number;
}

const CalendarList: React.FC<ICalendarListProps> = memo(
  ({ calendarEvents, setActiveCalendarEvent, currentIndex }) => {
    const { removeAllCalendarEvents }: { removeAllCalendarEvents: () => void } =
      useCalendarList();

    return (
      <>
        <h4>Calendar Events</h4>
        <div
          className="col-md-6"
          style={{ height: "200px", overflow: "scroll", marginBottom: "20px" }}
        >
          <ul className="list-group">
            {calendarEvents &&
              calendarEvents.map((calendarEvent, index) => (
                <li
                  className={
                    "list-group-item-action list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => setActiveCalendarEvent(calendarEvent, index)}
                  key={index}
                >
                  {calendarEvent.title}
                </li>
              ))}
          </ul>
        </div>
        <button
          className="col-md-6 m-3 btn btn-sm btn-danger"
          onClick={() => removeAllCalendarEvents()}
          disabled={true}
        >
          Remove All
        </button>
      </>
    );
  }
);

export default CalendarList;
