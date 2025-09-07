import React from "react";
import { useSelector } from "react-redux";
import DatePicker from "react-date-picker";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { selectCurrentCalendarEvent } from "../redux/selectors/index.ts";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { ICalendarEvent } from "../redux/actions/index.ts";


const CalendarListDetail: React.FC = () => {
  const currentCalendarEvent: ICalendarEvent | null = useSelector(selectCurrentCalendarEvent);
  return (
    <div className="col-md-6">
      {currentCalendarEvent ? (
        <div>
          <h4>Calendar Item</h4>
          <div>
            <label>
              <strong>Title:</strong>
            </label>{" "}
            {currentCalendarEvent.title}
          </div>
          <div>
            <label>
              <strong>Description:</strong>
            </label>{" "}
            {currentCalendarEvent.description}
          </div>
          <div>
            <label>
              <strong>Status:</strong>
            </label>{" "}
            {currentCalendarEvent.status ? "Done" : "Pending"}
          </div>
          {/* <div>
              <label>
                <strong>Due Date:</strong>
              </label>{" "}
              {currentCalendarEvent.dueDate}
            </div> */}
          <div className="form-group">
            <label htmlFor="dueDate">
              <strong>Due Date:</strong>
            </label>{" "}
            <DatePicker
              isOpen={false}
              // ref={datePicker}
              // value={new Date(currentCalendarEvent.dueDate)}
              value={currentCalendarEvent.dueDate ? new Date(currentCalendarEvent.dueDate) : null }
            />
          </div>
          <Link
            to={"/calendar-events/" + currentCalendarEvent._id}
            className="btn btn-sm btn-warning"
          >
            Edit <FontAwesomeIcon icon={faEdit} />
          </Link>
        </div>
      ) : (
        <div>
          <br />
          <p>Click on a calendar item to show detailed info</p>
        </div>
      )}
    </div>
  );
};

export default CalendarListDetail;
