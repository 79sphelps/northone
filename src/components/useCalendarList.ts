import { useAppDispatch } from "../redux/store/index.ts";
import {
  getCalendarEvents,
  deleteCalendarEvents,
  setCurrentIndex,
  setCurrentCalendarEvent,
} from "../redux/actions";

type VoidReturn = () => void;

export function useCalendarList() {
  const dispatch = useAppDispatch();

  const retrieveCalendarEvents: VoidReturn = () => {
    dispatch(getCalendarEvents());
  };

  const refreshList: VoidReturn = () => {
    retrieveCalendarEvents();
    dispatch(setCurrentCalendarEvent(null));
    dispatch(setCurrentIndex(-1));
  };

  const removeAllCalendarEvents: VoidReturn= () => {
    dispatch(deleteCalendarEvents());
    refreshList();
  };

  return {
    retrieveCalendarEvents,
    refreshList,
    removeAllCalendarEvents,
  };
}
