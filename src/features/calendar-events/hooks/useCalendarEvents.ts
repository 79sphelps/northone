import { useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/store";
import { useAppSelector } from "../../../redux/selectors";
import {
  setCurrentIndex,
  setCurrentCalendarEvent,
} from "../../../redux/actions";
import { selectCurrentIndex } from "../../../redux/selectors";
import { ICalendarEvent } from "../../../redux/types";

export interface IClickInfoEvent {
  id: string;
  title: string;
  status?: boolean | null;
  extendedProps: {
    description: string;
    dueDate: string;
    start2: string;
  };
}

export interface IClickInfo {
  event: IClickInfoEvent;
}

interface DatePickerRef {
  openCalendar?: () => void;
}

export function useCalendarEvents({
  setShow,
}: {
  setShow: (show: boolean) => void;
}) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentIndex = useAppSelector(selectCurrentIndex);

  const datePicker = useRef<DatePickerRef | null>(null);

  const setActiveCalendarEvent = useCallback(
    (calendarEvent: ICalendarEvent, index: number) => {
      dispatch(setCurrentCalendarEvent(calendarEvent));
      dispatch(setCurrentIndex(index));

      datePicker.current?.openCalendar?.();

      localStorage.setItem(
        "currentCalendarEvent",
        JSON.stringify(calendarEvent)
      );
      localStorage.setItem("currentIndex", JSON.stringify(index));
    },
    [dispatch]
  );

  const handleDateSelect = useCallback(() => {
    setShow(true);
  }, [setShow]);

  const handleEventClick = useCallback(
    (clickInfo: IClickInfo) => {
      const calendarEvent: ICalendarEvent = {
        _id: clickInfo.event.id,
        title: clickInfo.event.title,
        description: clickInfo.event.extendedProps.description,
        status:
          typeof clickInfo.event.status === "boolean"
            ? clickInfo.event.status
            : null,
        dueDate: clickInfo.event.extendedProps.dueDate,
        start: clickInfo.event.extendedProps.start2,
      };

      setActiveCalendarEvent(calendarEvent, currentIndex ?? 0);

      navigate(`/calendar-events/${clickInfo.event.id}`);
    },
    [setActiveCalendarEvent, navigate, currentIndex]
  );

  return {
    setActiveCalendarEvent,
    handleDateSelect,
    handleEventClick,
  };
}
