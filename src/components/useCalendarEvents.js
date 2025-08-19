import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentIndex,
  setCurrentCalendarEvent,
} from "../redux/actions";
import { selectCurrentIndex } from "../redux/selectors";

export function useCalendarEvents({ setShow }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const datePicker = useRef({ isOpen: false });
  const currentIndex = useSelector(selectCurrentIndex);

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

  return {
    setActiveCalendarEvent,
    handleDateSelect,
    handleEventClick,
  }
}