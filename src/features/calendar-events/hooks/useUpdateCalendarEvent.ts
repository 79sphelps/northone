import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/store";
import { useAppSelector } from "../../../redux/selectors";
import {
  setCurrentCalendarEvent,
  setMessage,
  updateCalendarEvent,
  deleteCalendarEvent,
} from "../../../redux/actions";
import { selectCurrentCalendarEvent } from "../../../redux/selectors";
import { ICalendarEvent } from "../../../redux/types";

interface Props {
  dateValue: string;
  timeValue: string;
}

export function useUpdateCalendarEvent({
  dateValue,
  timeValue,
}: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentCalendarEvent = useAppSelector(
    selectCurrentCalendarEvent
  );

  useEffect(() => {
    dispatch(setMessage(""));

    if (!currentCalendarEvent) {
      const stored = localStorage.getItem("currentCalendarEvent");
      if (stored) {
        dispatch(setCurrentCalendarEvent(JSON.parse(stored)));
      }
    }
  }, [dispatch, currentCalendarEvent]);

  const updateStatus = useCallback(
    (status: boolean) => {
      if (!currentCalendarEvent?._id) return;

      dispatch(
        updateCalendarEvent({
          ...currentCalendarEvent,
          status,
        })
      );
    },
    [dispatch, currentCalendarEvent]
  );

  const updateEvent = useCallback(
    (updatedFields: Partial<ICalendarEvent>) => {
      if (!currentCalendarEvent?._id) return;

      dispatch(
        updateCalendarEvent({
          ...currentCalendarEvent,
          ...updatedFields,
          dueDate: dateValue,
          start: timeValue,
        })
      );
    },
    [dispatch, currentCalendarEvent, dateValue, timeValue]
  );

  const deleteEvent = useCallback(() => {
    if (!currentCalendarEvent?._id) return;

    dispatch(deleteCalendarEvent(currentCalendarEvent._id));
    navigate("/calendar-events");
  }, [dispatch, currentCalendarEvent, navigate]);

  return {
    updateStatus,
    updateEvent,
    deleteEvent,
  };
}
