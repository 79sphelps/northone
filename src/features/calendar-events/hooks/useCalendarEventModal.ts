import { useState, useCallback } from "react";
import { useAppDispatch } from "../../../redux/store";
import { addCalendarEvent } from "../../../redux/actions";
import { formatDate } from "../../../redux/utils";

export interface INewEvent {
  title: string;
  description: string;
  status: boolean;
  dueDate: string;
  start: string;
}

export function useCalendarEventModal({
  setShow,
}: {
  setShow: (show: boolean) => void;
}) {
  const dispatch = useAppDispatch();

  const [dateValue, setDateValue] = useState<string>(
    formatDate(new Date())
  );
  const [timeValue, setTimeValue] = useState<string>("");

  const initialEvent: INewEvent = {
    title: "",
    description: "",
    status: false,
    dueDate: dateValue,
    start: "",
  };

  const [newEvent, setNewEvent] =
    useState<INewEvent>(initialEvent);

  const handleClose = useCallback(() => {
    setShow(false);
  }, [setShow]);

  const saveNewEvent = useCallback(() => {
    dispatch(
      addCalendarEvent({
        ...newEvent,
        dueDate: dateValue,
        start: timeValue,
      })
    );

    setShow(false);
    setNewEvent(initialEvent);
  }, [dispatch, newEvent, dateValue, timeValue, setShow]);

  const handleEventChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setNewEvent((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  return {
    handleClose,
    saveNewEvent,
    handleEventChange,
    newEvent,
    dateValue,
    setDateValue,
    timeValue,
    setTimeValue,
  };
}
