import { memo } from "react";
// import "react-time-picker/dist/TimePicker.css";
// import "react-clock/dist/Clock.css";
import { useCalendarList } from "./useCalendarList";

const CalendarList = memo(({
  calendarEvents,
  setActiveCalendarEvent,
  currentIndex,
}) => {
  const { removeAllCalendarEvents } = useCalendarList();

  return (
    <div className="col-md-6">
      <h4>Calendar Events</h4>
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
      <button
        className="m-3 btn btn-sm btn-danger"
        onClick={() => removeAllCalendarEvents()}
      >
        Remove All
      </button>
    </div>
  );
});

export default CalendarList;
