import { useDispatch } from "react-redux";
// import "react-time-picker/dist/TimePicker.css";
// import "react-clock/dist/Clock.css";
import {
  getCalendarEvents,
  deleteCalendarEvents,
  setCurrentIndex,
  setCurrentCalendarEvent,
} from "../redux/actions";


const CalendarList = ({
  calendarEvents,
  setActiveCalendarEvent,
  currentIndex,
}) => {
  const dispatch = useDispatch();

  const retrieveCalendarEvents = () => {
    dispatch(getCalendarEvents());
  };

  const refreshList = () => {
    retrieveCalendarEvents();
    dispatch(setCurrentCalendarEvent(null));
    dispatch(setCurrentIndex(-1));
  };

  const removeAllCalendarEvents = () => {
    dispatch(deleteCalendarEvents());
    refreshList();
  };

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
};

export default CalendarList;
