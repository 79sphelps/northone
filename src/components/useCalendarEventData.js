import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCalendarEvents } from "../redux/actions";

export function useCalendarEventData() {
  const dispatch = useDispatch();

  useEffect(() => {
    retrieveCalendarEvents();
    // checkCurrentIndex();
    // eslint-disable-next-line
  }, []);

  const retrieveCalendarEvents = () => {
    dispatch(getCalendarEvents());
  };
}