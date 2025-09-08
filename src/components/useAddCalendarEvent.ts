import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { addCalendarEvent, setCalendarEventToAdd } from "../redux/actions";
import { selectCalendarEventToAdd } from "../redux/selectors";
import { formatDate } from "../redux/utils";
import { ICalendarEvent } from "../redux/actions";

interface UseFormHandleSubmit {
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
  const dispatch = useDispatch();
  const calendarEventToAdd = useSelector(selectCalendarEventToAdd);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");

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
        id: null,
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

  let initialCalendarEventState = {
    id: null,
    title: "",
    description: "",
    status: false,
    dueDate: formatDate(new Date()),
    start: "",
  };

  const saveCalendarEvent = (event: UseFormHandleSubmit) => {
    if (!(dateValue instanceof Date) || isNaN(dateValue.getTime())) {
      setMessage("Please provide a valid date.");
      return;
    }
    const data = {
      id: null,
      title: event.title,
      description: event.description,
      status: false,
      dueDate: dateValue.toISOString(), // function as required by CalendarEvent
      start: timeValue,
    };
    dispatch(addCalendarEvent(data as ICalendarEvent));
    localStorage.removeItem("calendarEventToAdd");
  };

  const newCalendarEvent = () => {
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
