import { useState, useEffect } from "react";
import { useAppDispatch } from "../redux/store/index.ts";
import { useAppSelector } from "../redux/selectors";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { addCalendarEvent, setCalendarEventToAdd } from "../redux/actions";
import { selectCalendarEventToAdd } from "../redux/selectors";
import { formatDate } from "../redux/utils";
import { ICalendarEvent } from "../redux/actions";
import { ICalendarEventToAdd } from "../redux/reducers/index.ts";
import { INewEvent } from "./useCalendarEventModal.ts";

export interface IUseFormHandleSubmit {
  title: string;
  description: string;
  startTime: string;
  dueDate: string;
}

export function useAddCalendarEvent({
  dateValue,
  timeValue,
}: {
  dateValue: Date;
  timeValue: any;
}) {
  const dispatch = useAppDispatch();
  const calendarEventToAdd: ICalendarEventToAdd | null = useAppSelector(
    selectCalendarEventToAdd
  );
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const storedCalendarEventToAdd = JSON.parse(
      localStorage.getItem("calendarEventToAdd") as string
    );
    if (storedCalendarEventToAdd) {
      dispatch(setCalendarEventToAdd(storedCalendarEventToAdd));
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!calendarEventToAdd) {
      let calendarEventToAddObj = {
        // id: null,
        title: "",
        description: "",
        status: false,
        dueDate: formatDate(new Date()),
        start: "",
      };
      localStorage.setItem(
        "calendarEventToAdd",
        JSON.stringify(calendarEventToAddObj)
      );
    }
  }, [calendarEventToAdd]);

  let initialCalendarEventState: INewEvent = {
    // id: null,
    title: "",
    description: "",
    status: false,
    dueDate: formatDate(new Date()),
    start: "",
  };

  const saveCalendarEvent: (event: IUseFormHandleSubmit) => void = (
    event: IUseFormHandleSubmit
  ) => {
    if (!(dateValue instanceof Date) || isNaN(dateValue.getTime())) {
      setMessage("Please provide a valid date.");
      return;
    }
    const data: INewEvent = {
      // id: null,
      title: event.title,
      description: event.description,
      status: false,
      dueDate: dateValue.toISOString(), // function as required by CalendarEvent
      start: timeValue,
    };
    dispatch(addCalendarEvent(data as ICalendarEvent));
    localStorage.removeItem("calendarEventToAdd");
  };

  const newCalendarEvent: () => void = () => {
    dispatch(setCalendarEventToAdd(initialCalendarEventState));
    setSubmitted(false);
    setMessage("");
  };

  return {
    saveCalendarEvent,
    newCalendarEvent,
    message,
    submitted,
  };
}
