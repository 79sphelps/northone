import { useState, memo } from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import DatePicker from "react-date-picker";
import { useForm } from "react-hook-form";
import EventFormInput from "./EventFormInput";
import FormInputValidationError from "./FormInputValidationError";

const CalendarEventForm = memo(({ onSubmit, message, defaultValues }) => {
  const [dateValue, onChange] = useState(new Date());
  const [timeValue, onChangeTimeValue] = useState(""); // useState('10:00');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm(
    { defaultValues: defaultValues },
    // { mode: "onBlur", reValidateMode: "onBlur" }
    { mode: "all", reValidateMode: "all" }
  );

  const getEditorStyle = (fieldError) => {
    return fieldError ? "border: solid 1px red" : "display: block";
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <EventFormInput
          htmlFor="title"
          name="Title"
          className={getEditorStyle(errors.title)}
          id="title"
          placeholder=""
          requiredMsg="You must enter a valid title"
          minLength={5}
          minLengthMsg="The title must be at least 5 characters"
          register={register}
        />
        <FormInputValidationError fieldError={errors.title} />
      </div>
      <div className="form-group">
        <EventFormInput
          htmlFor="description"
          name="Description"
          className={getEditorStyle(errors.description)}
          id="description"
          requiredMsg="You must enter a valid description"
          minLength={10}
          minLengthMsg="The description must be at least 10 characters"
          register={register}
        />
        <FormInputValidationError fieldError={errors.description} />
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
  );
});

export default CalendarEventForm;
