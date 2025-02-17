import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-date-picker";
import {
  setCurrentCalendarEvent,
  setMessage,
  updateCalendarEvent,
  deleteCalendarEvent,
} from "../redux/actions";
import { selectCurrentCalendarEvent, selectMessage } from "../redux/selectors";


const CalendarEvent = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentCalendarEvent = useSelector(selectCurrentCalendarEvent);
  const message = useSelector(selectMessage);
  const [dateValue, onChange] = useState(
    new Date(
      currentCalendarEvent && currentCalendarEvent.dueDate ? currentCalendarEvent.dueDate : new Date()
    )
  );

  const [timeValue, onChangeTimeValue] = useState(
    currentCalendarEvent && currentCalendarEvent.start
      ? currentCalendarEvent.start
      : new Date().toISOString().replace(/T.*$/, "") + "T12:00:00"
  );

  useEffect(() => {
    clearMessage();
    checkLocalStorage();
  }, []);

  const clearMessage = () => dispatch(setMessage(""));

  const checkLocalStorage = () => {
    if (!currentCalendarEvent) {
      let calendarEvent = localStorage.getItem("currentCalendarEvent");
      dispatch(setCurrentCalendarEvent(JSON.parse(calendarEvent)));
    }
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    dispatch(setCurrentCalendarEvent({ ...currentCalendarEvent, [name]: value }));
  };

  const updateCalendarEventUnderEdit = (status = null) => {
    currentCalendarEvent.dueDate = dateValue;
    currentCalendarEvent.start = timeValue;
    if (status !== null) {
      currentCalendarEvent.status = status;
    }
    dispatch(updateCalendarEvent({ id: currentCalendarEvent._id, calendarEvent: currentCalendarEvent }));
  };

  const deleteCalendarEventUnderEdit = () => {
    dispatch(deleteCalendarEvent({ id: currentCalendarEvent._id }));
    navigate("/calendar-events"); // props.history.push("/calendar-events");
  };

  return (
    <div>
      {currentCalendarEvent ? (
        <div className="edit-form">
          <h4>Calendar Event</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">
                <strong>Title: </strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentCalendarEvent.title}
                onChange={(currentCalendarEvent) => handleInputChange(currentCalendarEvent)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">
                <strong>Description: </strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentCalendarEvent.description}
                onChange={(currentCalendarEvent) => handleInputChange(currentCalendarEvent)}
              />
            </div>
            <div className="form-group">
              <label>
                <strong>Status: </strong>{" "}
              </label>
              {currentCalendarEvent.status ? "Done" : "Pending"}
            </div>
            <div className="form-group">
              <label htmlFor="dueDate">
                <strong>Due Date: </strong>
              </label>{" "}
              <DatePicker onChange={onChange} value={dateValue} />
            </div>
            <div className="form-group">
              <label htmlFor="startTime">
                <strong>Start: </strong>
              </label>
              <TimePicker onChange={onChangeTimeValue} value={timeValue} />
            </div>
          </form>
          {currentCalendarEvent.status ? (
            <button
              className="btn btn-primary mr-2"
              onClick={() => updateCalendarEventUnderEdit(false)}
            >
              Mark Pending
            </button>
          ) : (
            <button
              className="btn btn-primary mr-2"
              onClick={() => updateCalendarEventUnderEdit(true)}
            >
              Mark Done
            </button>
          )}
          <button
            className="btn btn-danger mr-2"
            onClick={() => deleteCalendarEventUnderEdit()}
          >
            Delete <FontAwesomeIcon icon={faTrash} />
          </button>
          <button
            type="submit"
            className="btn btn-success mr-2"
            onClick={() => updateCalendarEventUnderEdit()}
          >
            Update
          </button>
          <button
            className="btn btn-danger mr-2"
            onClick={() => navigate("/calendar-events")}  // onClick={() => props.history.push("/calendar-events")}
          >
            Cancel
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a calendar event.</p>
        </div>
      )}
    </div>
  );
};

export default CalendarEvent;
