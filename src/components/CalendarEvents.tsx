import React, { useState, memo } from "react";
import { useSelector } from "react-redux";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import CalendarList from "./CalendarList.tsx";
import CalendarListDetail from "./CalendarListDetail.tsx";
import CalendarEventModal from "./CalendarEventModal.tsx";
import Calendar from "./Calendar.tsx";
import CalendarSearchBox from "./CalendarSearchBox.tsx";
import { useCalendarEvents } from "./useCalendarEvents.ts";
import { useCalendarEventData } from "./useCalendarEventData.ts";
import { selectCalendarEvents, selectCurrentIndex } from "../redux/selectors/index.ts";

const CalendarEvents = memo(() => {
  const [show, setShow] = useState(false);
  // const datePicker = useRef({ isOpen: false });
  const calendarEvents = useSelector(selectCalendarEvents);
  const currentIndex = useSelector(selectCurrentIndex);

  useCalendarEventData();
  const { setActiveCalendarEvent, handleDateSelect, handleEventClick } =
    useCalendarEvents({ setShow });

  return (
    <div className="list row">
      <CalendarSearchBox />
      <CalendarList
        calendarEvents={calendarEvents}
        setActiveCalendarEvent={setActiveCalendarEvent}
        currentIndex={currentIndex}
      />
      {/* <CalendarListDetail datePicker={datePicker} /> */}
      <CalendarListDetail />
      <Calendar
        calendarEvents={calendarEvents}
        handleDateSelect={handleDateSelect}
        handleEventClick={handleEventClick}
      />
      <CalendarEventModal show={show} setShow={setShow} />
    </div>
  );
});

export default CalendarEvents;
