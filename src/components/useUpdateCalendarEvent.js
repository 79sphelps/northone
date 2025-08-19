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

export function useUpdateCalendarEvent({ dateValue, timeValue }) {
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
      let calendarEvent = localStorage.getItem("currentCalendarEvent");
      dispatch(setCurrentCalendarEvent(JSON.parse(calendarEvent)));
    }
  };

  const updateCalendarEventStatusUnderEdit = (status = null) => {
    if (status !== null) {
      currentCalendarEvent.status = status;
    }
    dispatch(
      updateCalendarEvent({
        id: currentCalendarEvent._id,
        calendarEvent: currentCalendarEvent,
      })
    );
  };

  const updateCalendarEventUnderEdit = (event) => {
    event.dueDate = dateValue;
    event.start = timeValue;
    dispatch(
      updateCalendarEvent({
        id: currentCalendarEvent._id,
        calendarEvent: event,
      })
    );
    dispatch(setMessage("CalendarEvent item updated successfully!"));
  };

  const deleteCalendarEventUnderEdit = () => {
    dispatch(deleteCalendarEvent({ id: currentCalendarEvent._id }));
    navigate("/calendar-events"); // props.history.push("/calendar-events");
  };

  return {
    updateCalendarEventStatusUnderEdit,
    updateCalendarEventUnderEdit,
    deleteCalendarEventUnderEdit,
  };
}
