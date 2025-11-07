import { useEffect } from "react";
import { useAppDispatch } from "../redux/store/index.ts";
import { getCalendarEvents } from "../redux/actions";

export function useCalendarEventData() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    retrieveCalendarEvents();
    // checkCurrentIndex();
    // eslint-disable-next-line
  }, []);

  const retrieveCalendarEvents = () => {
    dispatch(getCalendarEvents());
  };
}
