import { useEffect } from "react";
import { useAppDispatch } from "../../../redux/store";
import { getCalendarEvents } from "../../../redux/actions";

export function useCalendarEventData() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCalendarEvents());
  }, [dispatch]);
}
