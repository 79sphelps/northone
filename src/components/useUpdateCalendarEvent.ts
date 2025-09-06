import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setCurrentCalendarEvent,
  setMessage,
  updateCalendarEvent,
  deleteCalendarEvent,
} from "../redux/actions";
import { selectCurrentCalendarEvent } from "../redux/selectors";

interface UseUpdateCalendarEventParams {
  dateValue: string; // or Date, depending on your usage
  timeValue: string; // or Date, depending on your usage
}

export function useUpdateCalendarEvent({
  dateValue,
  timeValue,
}: UseUpdateCalendarEventParams) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentCalendarEvent = useSelector(selectCurrentCalendarEvent);

  useEffect(() => {
    clearMessage();
    checkLocalStorage();
    // eslint-disable-next-line
  }, []);

  const clearMessage = () => dispatch(setMessage(""));

  const checkLocalStorage = () => {
    if (!currentCalendarEvent) {
      const calendarEvent = localStorage.getItem("currentCalendarEvent");
      if (calendarEvent) {
        dispatch(setCurrentCalendarEvent(JSON.parse(calendarEvent)));
      }
    }
  };

  const updateCalendarEventStatusUnderEdit = (status = null) => {
    if (status !== null) {
      currentCalendarEvent.status = status;
    }
    dispatch(
      updateCalendarEvent({
        id: currentCalendarEvent._id,
        ...currentCalendarEvent,
      })
    );
  };

  const updateCalendarEventUnderEdit = (event: any) => {
    // event.preventDefault();
    const updatedEvent = {
      ...currentCalendarEvent,
      dueDate: dateValue,
      start: timeValue,
      // Add other fields from the form if needed
    };
    dispatch(
      updateCalendarEvent({
        id: currentCalendarEvent._id,
        ...updatedEvent,
      })
    );
  };

  const deleteCalendarEventUnderEdit = () => {
    dispatch(deleteCalendarEvent(currentCalendarEvent._id));
    navigate("/calendar-events"); // props.history.push("/calendar-events");
  };

  return {
    updateCalendarEventStatusUnderEdit,
    updateCalendarEventUnderEdit,
    deleteCalendarEventUnderEdit,
  };
}
