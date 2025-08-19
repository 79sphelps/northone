import { useState, useRef, memo } from "react";
import { useSelector } from "react-redux";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { selectCalendarEvents, selectCurrentIndex } from "../redux/selectors";
import CalendarList from "./CalendarList";
import CalendarListDetail from "./CalendarListDetail";
import CalendarEventModal from "./CalendarEventModal";
import Calendar from "./Calendar";
import CalendarSearchBox from "./CalendarSearchBox";
import { useCalendarEvents } from "./useCalendarEvents";
import { useCalendarEventData } from "./useCalendarEventData";

const CalendarEvents = memo(() => {
  const [show, setShow] = useState(false);
  const datePicker = useRef({ isOpen: false });
  const calendarEvents = useSelector(selectCalendarEvents);
  const currentIndex = useSelector(selectCurrentIndex);

  useCalendarEventData();
  const { 
    setActiveCalendarEvent,
    handleDateSelect,
    handleEventClick,
  } = useCalendarEvents(setShow);

  return (
    <div className="list row">
      <CalendarSearchBox />
      <CalendarList
        calendarEvents={calendarEvents}
        setActiveCalendarEvent={setActiveCalendarEvent}
        currentIndex={currentIndex}
      />
      <CalendarListDetail datePicker={datePicker} />
      <Calendar
        calendarEvents={calendarEvents}
        handleDateSelect={handleDateSelect}
        handleEventClick={handleEventClick}
      />
      <CalendarEventModal
        show={show}
        setShow={setShow}
      />
    </div>
  );
});

export default CalendarEvents;
