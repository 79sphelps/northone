import React, { memo, useState } from "react";
import { useAppSelector } from "../../../redux/selectors";
import CalendarList from "./CalendarList";
import CalendarListDetail from "./CalendarListDetail";
import CalendarEventModal from "./CalendarEventModal";
import Calendar from "./Calendar";
import CalendarSearchBox from "../../../components/layout/CalendarSearchBox";
import { useCalendarEvents } from "../hooks/useCalendarEvents";
import { useCalendarEventData } from "../hooks/useCalendarEventData";
import {
  selectCalendarEvents,
  selectCurrentIndex,
  selectIsLoading,
} from "../../../redux/selectors";

const CalendarEvents: React.FC = memo(() => {
  const [show, setShow] = useState(false);

  const calendarEvents = useAppSelector(selectCalendarEvents);
  const currentIndex = useAppSelector(selectCurrentIndex);
  const isLoading = useAppSelector(selectIsLoading);

  useCalendarEventData();

  const { setActiveCalendarEvent, handleDateSelect, handleEventClick } =
    useCalendarEvents({ setShow });

  return (
    <div className="list row">
      <CalendarSearchBox />

      <div className="calendar-events-container">
        <CalendarList
          calendarEvents={calendarEvents}
          setActiveCalendarEvent={setActiveCalendarEvent}
          currentIndex={currentIndex}
        />
        {!isLoading && <CalendarListDetail />}
      </div>

      {!isLoading && (
        <>
          <Calendar
            calendarEvents={calendarEvents}
            handleDateSelect={handleDateSelect}
            handleEventClick={handleEventClick}
          />
          <CalendarEventModal show={show} setShow={setShow} />
        </>
      )}
    </div>
  );
});

export default CalendarEvents;
