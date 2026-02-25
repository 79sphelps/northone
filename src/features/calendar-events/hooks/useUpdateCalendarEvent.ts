import { useEffect } from "react";
import { useAppDispatch } from "../../../redux/store/index.ts";
import { useAppSelector } from "../../../redux/selectors/index.ts";
import { useNavigate } from "react-router-dom";
import {
  setCurrentCalendarEvent,
  setMessage,
  updateCalendarEvent,
  deleteCalendarEvent,
} from "../../../redux/actions/index.ts";
import { selectCurrentCalendarEvent } from "../../../redux/selectors/index.ts";

interface UseUpdateCalendarEventParams {
  dateValue: string; // or Date, depending on your usage
  timeValue: string; // or Date, depending on your usage
}

export function useUpdateCalendarEvent({
  dateValue,
  timeValue,
}: UseUpdateCalendarEventParams) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentCalendarEvent = useAppSelector(selectCurrentCalendarEvent);

  useEffect(() => {
    clearMessage();
    checkLocalStorage();
    // eslint-disable-next-line
  }, []);

  const clearMessage = () => dispatch(setMessage(""));

  const checkLocalStorage: () => void = () => {
    if (!currentCalendarEvent) {
      const calendarEvent = localStorage.getItem("currentCalendarEvent");
      if (calendarEvent) {
        dispatch(setCurrentCalendarEvent(JSON.parse(calendarEvent)));
      }
    }
  };

  const updateCalendarEventStatusUnderEdit: (status: boolean) => void = (status: boolean) => {
    if (!currentCalendarEvent || !currentCalendarEvent._id) return;
    if (status !== null) {
      currentCalendarEvent.status = status;
    }
    dispatch(
      updateCalendarEvent({
        _id: currentCalendarEvent._id,
        ...currentCalendarEvent,
      })
    );
  };

  const updateCalendarEventUnderEdit: (event: any) => void = (event: any) => {
    // event.preventDefault();
    if (!currentCalendarEvent || !currentCalendarEvent._id) return;
    const updatedEvent = {
      ...event,
      dueDate: dateValue,
      start: timeValue,
    };
    dispatch(
      updateCalendarEvent({
        // id: currentCalendarEvent._id,
        _id: currentCalendarEvent._id,
        ...updatedEvent,
      })
    );
  };

  const deleteCalendarEventUnderEdit: () => void = () => {
    if (!currentCalendarEvent || !currentCalendarEvent._id) return;
    dispatch(deleteCalendarEvent(currentCalendarEvent._id));
    navigate("/calendar-events"); // props.history.push("/calendar-events");
  };

  return {
    updateCalendarEventStatusUnderEdit,
    updateCalendarEventUnderEdit,
    deleteCalendarEventUnderEdit,
  };
}
