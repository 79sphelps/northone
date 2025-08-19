import { useState, memo } from "react";
import { useSelector } from "react-redux";
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";
import { useForm } from "react-hook-form";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { selectCalendarEventToAdd } from "../redux/selectors";
import { useAddCalendarEvent } from "./useAddCalendarEvent";
// import { CalendarEventForm } from "CalendarEventForm";

const ValidationError = ({ fieldError }) => {
  if (!fieldError) return null;
  return (
    <div role="alert" style={{ color: "red", marginBottom: 2 }}>
      {fieldError.message}
    </div>
  );
};

const AddCalendarEvent2 = memo(() => {
  const CalendarEventToAdd = useSelector(selectCalendarEventToAdd);
  const [dateValue, onChange] = useState(new Date());
  const [timeValue, onChangeTimeValue] = useState(""); // useState('10:00');

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
    // { mode: "onBlur", reValidateMode: "onBlur" }
    { mode: "all", reValidateMode: "all" }
  );
  // } = useForm({ mode: "onBlur", reValidateMode: "onBlur" });

  const getEditorStyle = (fieldError) => {
    return fieldError ? "border: solid 1px red" : "display: block";
  };

  const {
    saveCalendarEvent,
    newCalendarEvent,
    message,
    submitted,
  } = useAddCalendarEvent();

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
          {/* <form noValidate onSubmit={handleSubmit(saveCalendarEvent)}> */}
          <form onSubmit={handleSubmit(saveCalendarEvent)}>
            <div className="form-group">
              <label htmlFor="title">Title: </label>{" "}
              <input
                name="Title"
                className={getEditorStyle(errors.title)}
                style={{
                  display: "block",
                  width: "100%",
                  height: 40,
                  borderRadius: 5,
                  border: "solid 1px lightblue",
                }}
                type="text"
                id="title"
                placeholder="Title"
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
                name="Description"
                className={getEditorStyle(errors.description)}
                style={{
                  display: "block",
                  width: "100%",
                  height: 40,
                  borderRadius: 5,
                  border: "solid 1px lightblue",
                }}
                type="text"
                id="description"
                placeholder="Description"
                {...register("description", {
                  // onChange: (e) => {setValue('description', e.target.value)},
                  required: "You must enter a valid description",
                  minLength: {
                    value: 10,
                    message: "The description must be at least 10 characters",
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
                // disabled={!isValid}
                // style={{
                //   color: !isValid && "lightgrey",
                //   cursor: !isValid && "not-allowed",
                //   marginRight: "20px",
                // }}
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
});

export default AddCalendarEvent2;
