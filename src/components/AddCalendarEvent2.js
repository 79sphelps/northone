import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";
import { useForm } from "react-hook-form";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { addCalendarEvent, setCalendarEventToAdd } from "../redux/actions";
import { selectCalendarEventToAdd } from "../redux/selectors";
import { formatDate } from "../redux/utils";

const ValidationError = ({ fieldError }) => {
  if (!fieldError) return null;
  return (
    <div role="alert" style={{ color: "red", marginBottom: 2 }}>
      {fieldError.message}
    </div>
  );
};

const AddCalendarEvent2 = () => {
  const dispatch = useDispatch();
  const CalendarEventToAdd = useSelector(selectCalendarEventToAdd);
  const [submitted, setSubmitted] = useState(false);
  const [dateValue, onChange] = useState(new Date());
  const [timeValue, onChangeTimeValue] = useState(""); // useState('10:00');
  const [message, setMessage] = useState("");

  const defaultValues = {
    title: "",
    description: "",
    startTime: "",
    dueDate: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm(
    { defaultValues: defaultValues },
    { mode: "onBlur", reValidateMode: "onBlur" }
  );
  // } = useForm({ mode: "onBlur", reValidateMode: "onBlur" });

  const getEditorStyle = (fieldError) => {
    return fieldError ? "border: solid 1px red" : "display: block";
  };

  useEffect(() => {
    const storedCalendarEventToAdd = JSON.parse(
      localStorage.getItem("calendarEventToAdd")
    );
    if (storedCalendarEventToAdd) {
      dispatch(setCalendarEventToAdd(storedCalendarEventToAdd));
    }
    // eslint-disable-next-line
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
      localStorage.setItem(
        "calendarEventToAdd",
        JSON.stringify(calendarEventToAdd)
      );
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

  const saveCalendarEvent = (event) => {
    if (!dateValue) return;
    const data = {
      title: event.title,
      description: event.description,
      status: false,
      dueDate: dateValue,
      start: timeValue,
    };
    dispatch(addCalendarEvent(data));
    localStorage.removeItem("calendarEventToAdd");
    setMessage("CalendarEvent item created successfully!");
  };

  const newCalendarEvent = () => {
    dispatch(setCalendarEventToAdd(initialCalendarEventState));
    setSubmitted(false);
    setMessage("");
  };

  return (
    <div className="submit-form">
      {submitted && CalendarEventToAdd ? (
        <div>
          <h4>The new calendar item was created successfully!</h4>
          <button
            className="btn btn-success"
            onClick={() => newCalendarEvent()}
          >
            Add
          </button>
        </div>
      ) : (
        <div>
          <h1>Add a New Calendar Event</h1>
          <form noValidate onSubmit={handleSubmit(saveCalendarEvent)}>
            <div className="form-group">
              <label htmlFor="title">Title: </label>{" "}
              <input
                className={getEditorStyle(errors.firstName)}
                style={{
                  display: "block",
                  width: "100%",
                  height: 40,
                  borderRadius: 5,
                  border: "solid 1px lightblue",
                }}
                type="text"
                id="title"
                placeholder={"Title"}
                {...register("title", {
                  // onChange: (e) => { setValue('title', e.target.value) },
                  required: "You must enter a valid title",
                  minLength: {
                    value: 5,
                    message: "The title must be at least 5 characters",
                  },
                })}
              />
              <ValidationError fieldError={errors.title} />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description: </label>{" "}
              <input
                className={getEditorStyle(errors.firstName)}
                style={{
                  display: "block",
                  width: "100%",
                  height: 40,
                  borderRadius: 5,
                  border: "solid 1px lightblue",
                }}
                type="text"
                id="description"
                placeholder={"Description"}
                {...register("description", {
                  // onChange: (e) => {setValue('description', e.target.value)},
                  required: "You must enter a valid description",
                  minLength: {
                    value: 5,
                    message: "The description must be at least 5 characters",
                  },
                })}
              />
              <ValidationError fieldError={errors.description} />
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
                Submit
              </button>
              {message !== "" ? <div>{message}</div> : null}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddCalendarEvent2;
