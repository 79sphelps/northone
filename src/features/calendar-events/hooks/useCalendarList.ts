import { useCallback } from "react";
import { useAppDispatch } from "../../../redux/store";
import {
  getCalendarEvents,
  deleteCalendarEvents,
  setCurrentIndex,
  setCurrentCalendarEvent,
} from "../../../redux/actions";

export function useCalendarList() {
  const dispatch = useAppDispatch();

  const retrieveCalendarEvents = useCallback(() => {
    dispatch(getCalendarEvents());
  }, [dispatch]);

  const refreshList = useCallback(() => {
    dispatch(getCalendarEvents());
    dispatch(setCurrentCalendarEvent(null));
    dispatch(setCurrentIndex(-1));
  }, [dispatch]);

  const removeAllCalendarEvents = useCallback(() => {
    dispatch(deleteCalendarEvents());
    refreshList();
  }, [dispatch, refreshList]);

  return {
    retrieveCalendarEvents,
    refreshList,
    removeAllCalendarEvents,
  };
}
