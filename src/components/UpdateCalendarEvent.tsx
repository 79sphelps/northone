import React, { memo } from "react";
import { useAppSelector } from "../redux/selectors";
import CalendarUpdateEventForm from "./CalendarUpdateEventForm";
import { selectCurrentCalendarEvent } from "../redux/selectors/index.ts";

const UpdateCalendarEvent = memo(() => {
  const currentCalendarEvent = useAppSelector(selectCurrentCalendarEvent);
  return (
    <div>
      {currentCalendarEvent ? (
        <div className="edit-form">
          <h4>Calendar Event</h4>
          <CalendarUpdateEventForm />
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a calendar event.</p>
        </div>
      )}
    </div>
  );
});

export default UpdateCalendarEvent;
