import { useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/store";
import { useAppSelector } from "../../../redux/selectors";
import {
  addCalendarEvent,
  setCalendarEventToAdd,
} from "../../../redux/actions";
import { selectCalendarEventToAdd } from "../../../redux/selectors";
import { formatDate } from "../../../redux/utils";
import { ICalendarEvent } from "../../../redux/types";

interface Props {
  dateValue: Date;
  timeValue: string;
}

export interface IUseFormHandleSubmit {
  title: string;
  description: string;
}

export function useAddCalendarEvent({
  dateValue,
  timeValue,
}: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const calendarEventToAdd = useAppSelector(selectCalendarEventToAdd);

  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // hydrate from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("calendarEventToAdd");
    if (stored) {
      try {
        dispatch(setCalendarEventToAdd(JSON.parse(stored)));
      } catch {
        localStorage.removeItem("calendarEventToAdd");
      }
    }
  }, [dispatch]);

  const saveCalendarEvent = useCallback(
    ({ title, description }: IUseFormHandleSubmit) => {
      if (!(dateValue instanceof Date) || isNaN(dateValue.getTime())) {
        setMessage("Please provide a valid date.");
        return;
      }

      const newEvent: ICalendarEvent = {
        title,
        description,
        status: false,
        dueDate: dateValue.toISOString(),
        start: timeValue,
      };

      dispatch(addCalendarEvent(newEvent));

      localStorage.removeItem("calendarEventToAdd");
      setSubmitted(true);

      navigate("/");
    },
    [dispatch, navigate, dateValue, timeValue]
  );

  const newCalendarEvent = useCallback(() => {
    dispatch(
      setCalendarEventToAdd({
        title: "",
        description: "",
        status: false,
        dueDate: formatDate(new Date()),
        start: "",
      })
    );
    setSubmitted(false);
    setMessage("");
  }, [dispatch]);

  return {
    saveCalendarEvent,
    newCalendarEvent,
    message,
    submitted,
    calendarEventToAdd,
  };
}
