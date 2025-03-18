const CalendarList = ({
  calendarEvents,
  setActiveCalendarEvent,
  removeAllCalendarEvents,
  currentIndex,
}) => {
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
