import React, { memo } from "react";
import { useAppSelector } from "../../../redux/selectors/index.ts";
import CalendarUpdateEventForm from "../components/CalendarUpdateEventForm.tsx";
import { selectCurrentCalendarEvent } from "../../../redux/selectors/index.ts";

const UpdateCalendarEventPage: React.FC = memo(() => {
  const currentCalendarEvent = useAppSelector(selectCurrentCalendarEvent);
  return (
    <div>
      {currentCalendarEvent ? (
        <div className="edit-calendar-event-form">
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

export default UpdateCalendarEventPage;
