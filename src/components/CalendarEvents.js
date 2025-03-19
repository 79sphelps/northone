import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import {
  getCalendarEvents,
  setCurrentIndex,
  setCurrentCalendarEvent,
} from "../redux/actions";
import { selectCalendarEvents, selectCurrentIndex } from "../redux/selectors";
import CalendarList from "./CalendarList";
import CalendarListDetail from "./CalendarListDetail";
import CalendarEventModal from "./CalendarEventModal";
import Calendar from "./Calendar";
import CalendarSearchBox from "./CalendarSearchBox";

const CalendarEvents = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const datePicker = useRef({ isOpen: false });
  const calendarEvents = useSelector(selectCalendarEvents);
  const currentIndex = useSelector(selectCurrentIndex);

  useEffect(() => {
    retrieveCalendarEvents();
    // checkCurrentIndex();
    // eslint-disable-next-line
  }, []);

  const retrieveCalendarEvents = () => {
    dispatch(getCalendarEvents());
  };

  // const checkCurrentIndex = () => {
  //   if (!currentIndex) {
  //     dispatch(setCurrentCalendarEvent(JSON.parse(localStorage.getItem('currentCalendarEvent'))));
  //     dispatch(setCurrentIndex(JSON.parse(localStorage.getItem('currentIndex'))));
  //   }
  // };

  const setActiveCalendarEvent = (calendarEvent, index) => {
    dispatch(setCurrentCalendarEvent(calendarEvent));
    dispatch(setCurrentIndex(index));
    if (datePicker && datePicker.current && datePicker.current.openCalendar) {
      datePicker.current.openCalendar();
    }
    localStorage.setItem("currentCalendarEvent", JSON.stringify(calendarEvent));
    localStorage.setItem("currentIndex", JSON.stringify(currentIndex));
  };

  const handleDateSelect = (selectInfo) => {
    setShow(true);
  };

  const handleEventClick = (clickInfo) => {
    let calendarEvent = {
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      description: clickInfo.event.extendedProps.description,
      status: clickInfo.event.status,
      dueDate: clickInfo.event.extendedProps.dueDate, // dueDate: formatDate(new Date()),
      start: clickInfo.event.extendedProps.start2,
    };
    setActiveCalendarEvent(calendarEvent, 0);
    navigate("/calendar-events/" + clickInfo.event.id);
  };

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
};

export default CalendarEvents;
