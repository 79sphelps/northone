import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-date-picker";
import { useForm } from "react-hook-form";
import {
  setCurrentCalendarEvent,
  setMessage,
  updateCalendarEvent,
  deleteCalendarEvent,
} from "../redux/actions";
import { selectCurrentCalendarEvent, selectMessage } from "../redux/selectors";

const ValidationError = ({ fieldError }) => {
    if (!fieldError) return null;
    return (
      <div role="alert" style={{ color: "red", marginBottom: 2 }}>
        {fieldError.message}
      </div>
    );
  };

const CalendarEvent = () => {
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

//   const defaultValues = {
//     title: currentCalendarEvent.title,
//     description: currentCalendarEvent.description,
//     startTime: currentCalendarEvent.startTime,
//     dueDate: currentCalendarEvent.dueDate,
//   };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
    // } = useForm({defaultValues: defaultValues}, { mode: "onBlur", reValidateMode: "onBlur" });
  } = useForm({ mode: "onBlur", reValidateMode: "onBlur" });

  const getEditorStyle = (fieldError) => {
    return fieldError ? "border: solid 1px red" : "display: block";
  }

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

  const updateCalendarEventStatusUnderEdit = (status = null) => {
    if (status !== null) {
      currentCalendarEvent.status = status;
    }
    dispatch(updateCalendarEvent({ id: currentCalendarEvent._id, calendarEvent: currentCalendarEvent }));
  };

  const updateCalendarEventUnderEdit = (event) => {
    event.dueDate = dateValue;
    event.start = timeValue;
    dispatch(updateCalendarEvent({ id: currentCalendarEvent._id, calendarEvent: event }));
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
          <form noValidate onSubmit={handleSubmit(updateCalendarEventUnderEdit)}>
            <div className="form-group">
              <label htmlFor="title">
                <strong>Title: </strong>
              </label>
              <input
                className={getEditorStyle(errors.firstName)}
                style={{ display: 'block', width: '100%', height: 40, borderRadius: 5, border: 'solid 1px lightblue' }}
                type="text"
                id="title"
                placeholder={currentCalendarEvent.title}
                {...register("title", {
                    // onChange: (e) => { setValue('title', e.target.value) },
                    required: "You must enter a valid title",
                    minLength: {
                        value: 5,
                        message:
                            "The title must be at least 5 characters",
                    },
                })}
                />
                <ValidationError fieldError={errors.title} />
            </div>
            <div className="form-group">
              <label htmlFor="description">
                <strong>Description: </strong>
              </label>
              <input
                className={getEditorStyle(errors.firstName)}
                style={{ display: 'block', width: '100%', height: 40, borderRadius: 5, border: 'solid 1px lightblue' }}
                type="text"
                id="description"
                placeholder={currentCalendarEvent.description}
                {...register("description", {
                    // onChange: (e) => {setValue('description', e.target.value)},
                    required: "You must enter a valid description",
                    minLength: {
                    value: 5,
                    message:
                        "The description must be at least 5 characters",
                    },
                })}
                />
                <ValidationError fieldError={errors.description} />
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
            {currentCalendarEvent.status ? (
            <button
              className="btn btn-primary mr-2"
              onClick={() => updateCalendarEventStatusUnderEdit(false)}
            >
              Mark Pending
            </button>
          ) : (
            <button
              className="btn btn-primary mr-2"
              onClick={() => updateCalendarEventStatusUnderEdit(true)}
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
            disabled={!isValid}
            style={{
                color: !isValid && "lightgrey",
                cursor: !isValid && "not-allowed",
                marginRight: "20px",
            }}
            // onClick={() => updateCalendarEventUnderEdit()}
          >
            Update
          </button>
          <button
            className="btn btn-danger mr-2"
            onClick={() => navigate("/calendar-events")}  // onClick={() => props.history.push("/calendar-events")}
          >
            Cancel
          </button>
          </form>
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
