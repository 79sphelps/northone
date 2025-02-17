import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { addCalendarEvent, setCalendarEventToAdd } from "../redux/actions";
import { selectCalendarEventToAdd } from "../redux/selectors";
import { formatDate } from "../redux/utils";


const AddCalendarEvent = () => {
  const dispatch = useDispatch();
  const CalendarEventToAdd = useSelector(selectCalendarEventToAdd);
  const [submitted, setSubmitted] = useState(false);
  const [dateValue, onChange] = useState(new Date());
  const [timeValue, onChangeTimeValue] = useState(""); // useState('10:00');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const storedCalendarEventToAdd = JSON.parse(localStorage.getItem("calendarEventToAdd"));
    if (storedCalendarEventToAdd) {
      dispatch(setCalendarEventToAdd(storedCalendarEventToAdd));
    }
  }, []);

  useEffect(() => {
    if (!CalendarEventToAdd) {
      let calendarEventToAdd = {
        id: null,
        title: "",
        description: "",
        status: false,
        dueDate: formatDate(new Date()),
        start: "",
      };
      localStorage.setItem("calendarEventToAdd", JSON.stringify(calendarEventToAdd));
    }
  }, [CalendarEventToAdd]);

  let initialCalendarEventState = {
    id: null,
    title: "",
    description: "",
    status: false,
    dueDate: formatDate(new Date()),
    start: "",
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    dispatch(setCalendarEventToAdd({ ...CalendarEventToAdd, [name]: value }));
  };

  const saveCalendarEvent = () => {
    if (!dateValue) return;
    var data = {
      title: CalendarEventToAdd.title,
      description: CalendarEventToAdd.description,
      status: false,
      dueDate: dateValue,
      start: timeValue,
    };
    dispatch(addCalendarEvent(data));
    localStorage.removeItem("calendarEventToAdd");
    setMessage('CalendarEvent item created successfully!');
  };

  const newCalendarEvent = () => {
    dispatch(setCalendarEventToAdd(initialCalendarEventState));
    setSubmitted(false);
    setMessage('');
  };

  return (
    <div className="submit-form">
      {submitted && CalendarEventToAdd ? (
        <div>
          <h4>The new calendar item was created successfully!</h4>
          <button className="btn btn-success" onClick={() => newCalendarEvent()}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <h1>Add a New Calendar Event</h1>
          <div className="form-group">
            <label htmlFor="title">Title: </label>{" "}
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={CalendarEventToAdd && CalendarEventToAdd.title ? CalendarEventToAdd.title : ""}
              onChange={(event) => handleInputChange(event)}
              name="title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description: </label>{" "}
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={
                CalendarEventToAdd && CalendarEventToAdd.description ? CalendarEventToAdd.description : ""
              }
              onChange={(event) => handleInputChange(event)}
              name="description"
            />
          </div>
          <div className="form-group">
            <label htmlFor="dueDate">Due Date:</label>{" "}
            <DatePicker onChange={onChange} value={dateValue} />
          </div>
          <div>
            <label htmlFor="dueDate">Time Start:</label>{" "}
            <TimePicker onChange={onChangeTimeValue} value={timeValue} />
          </div>
          <div>
            <button
              onClick={() => saveCalendarEvent(CalendarEventToAdd)}
              className="btn btn-success"
              style={{ marginTop: "20px" }}
            >
              Submit
            </button>
            { message !== '' ? <div>{message}</div> : null }
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCalendarEvent;
