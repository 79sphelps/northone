import React, { memo } from "react";
import { useAppSelector } from "../../../redux/selectors";
import DatePicker from "react-date-picker";
import { Link } from "react-router-dom";
import { selectCurrentCalendarEvent } from "../../../redux/selectors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

const CalendarListDetail: React.FC = memo(() => {
  const event = useAppSelector(selectCurrentCalendarEvent);

  if (!event) {
    return <p>Click on a calendar item to show detailed info</p>;
  }

  return (
    <div className="calendar-list-detail">
      <div>
        <h4>Calendar Item</h4>

        <p>
          <strong>Title:</strong> {event.title}
        </p>

        <p>
          <strong>Description:</strong> {event.description}
        </p>

        <p>
          <strong>Status:</strong> {event.status ? "Done" : "Pending"}
        </p>

        <div className="form-group">
          <strong>Due Date:</strong>
          <DatePicker value={new Date(event.dueDate)} disabled />
        </div>

        <Link
          to={`/calendar-events/${event._id}`}
          className="btn btn-sm btn-warning"
        >
          Edit <FontAwesomeIcon icon={faEdit} />
        </Link>
      </div>
    </div>
  );
});

export default CalendarListDetail;
