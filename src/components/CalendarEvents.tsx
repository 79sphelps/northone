import React, { useState, memo } from "react";
import { useAppSelector } from "../redux/selectors";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import CalendarList from "./CalendarList.tsx";
import CalendarListDetail from "./CalendarListDetail.tsx";
import CalendarEventModal from "./CalendarEventModal.tsx";
import Calendar from "./Calendar.tsx";
import CalendarSearchBox from "./CalendarSearchBox.tsx";
import { useCalendarEvents } from "./useCalendarEvents.ts";
import { useCalendarEventData } from "./useCalendarEventData.ts";
import {
  selectCalendarEvents,
  selectCurrentIndex,
} from "../redux/selectors/index.ts";
import { ICalendarEvent } from "../redux/actions/index.ts";
import { IClickInfo } from "./useCalendarEvents.ts";

const CalendarEvents: React.FC = memo(() => {
  const [show, setShow] = useState<boolean>(false);
  // const datePicker = useRef({ isOpen: false });
  const calendarEvents: ICalendarEvent[] = useAppSelector(selectCalendarEvents);
  const currentIndex: number = useAppSelector(selectCurrentIndex);

  useCalendarEventData();
  const {
    setActiveCalendarEvent,
    handleDateSelect,
    handleEventClick,
  }: {
    setActiveCalendarEvent: (
      calendarEvent: ICalendarEvent,
      index: number
    ) => void;
    handleDateSelect: () => void;
    handleEventClick: (clickInfo: IClickInfo) => void;
  } = useCalendarEvents({ setShow });

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
