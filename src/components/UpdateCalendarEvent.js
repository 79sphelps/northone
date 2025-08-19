import { memo } from "react";
import { useSelector } from "react-redux";
import { selectCurrentCalendarEvent } from "../redux/selectors";
import CalendarUpdateEventForm from "./CalendarUpdateEventForm";

const UpdateCalendarEvent = memo(() => {
  const currentCalendarEvent = useSelector(selectCurrentCalendarEvent);
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
