import { useAppDispatch } from "../redux/store/index.ts";
import {
  getCalendarEvents,
  deleteCalendarEvents,
  setCurrentIndex,
  setCurrentCalendarEvent,
} from "../redux/actions";

export function useCalendarList() {
  const dispatch = useAppDispatch();

  const retrieveCalendarEvents = () => {
    dispatch(getCalendarEvents());
  };

  const refreshList = () => {
    retrieveCalendarEvents();
    dispatch(setCurrentCalendarEvent(null));
    dispatch(setCurrentIndex(-1));
  };

  const removeAllCalendarEvents = () => {
    dispatch(deleteCalendarEvents());
    refreshList();
  };

  return {
    retrieveCalendarEvents,
    refreshList,
    removeAllCalendarEvents,
  };
}
