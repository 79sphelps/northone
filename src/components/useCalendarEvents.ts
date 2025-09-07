import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentIndex, setCurrentCalendarEvent } from "../redux/actions";
import { selectCurrentIndex } from "../redux/selectors";
import { ICalendarEvent } from "../redux/actions";

export interface ClickInfoEvent {
  id: string;
  title: string;
  status?: boolean | null;
  extendedProps: {
    description: string;
    dueDate: string;
    start2: string;
  };
}

export interface ClickInfo {
  event: ClickInfoEvent;
}

interface DatePickerRef {
  isOpen: boolean;
  openCalendar?: () => void;
}

export function useCalendarEvents({
  setShow,
}: {
  setShow: (show: boolean) => void;
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const datePicker = useRef<DatePickerRef>({ isOpen: false });
  const currentIndex = useSelector(selectCurrentIndex);

  const setActiveCalendarEvent = (
    calendarEvent: ICalendarEvent,
    index: number
  ): void => {
    dispatch(setCurrentCalendarEvent(calendarEvent));
    dispatch(setCurrentIndex(index));
    if (datePicker && datePicker.current && datePicker.current.openCalendar) {
      datePicker.current.openCalendar();
    }
    localStorage.setItem("currentCalendarEvent", JSON.stringify(calendarEvent));
    localStorage.setItem("currentIndex", JSON.stringify(currentIndex));
  };

  const handleDateSelect = () => {
    setShow(true);
  };

  const handleEventClick = (clickInfo: ClickInfo): void => {
    let calendarEvent: ICalendarEvent = {
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      description: clickInfo.event.extendedProps.description,
      status:
        typeof clickInfo.event.status === "boolean" ||
        clickInfo.event.status === null
          ? clickInfo.event.status
          : null,
      dueDate: clickInfo.event.extendedProps.dueDate,
      start: clickInfo.event.extendedProps.start2,
    };
    setActiveCalendarEvent(calendarEvent, 0);
    navigate("/calendar-events/" + clickInfo.event.id);
  };

  return {
    setActiveCalendarEvent,
    handleDateSelect,
    handleEventClick,
  };
}
