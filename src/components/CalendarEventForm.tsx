import React, { memo } from "react";
import TimePicker from "react-time-picker";
import { useNavigate } from "react-router-dom";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import DatePicker from "react-date-picker";
import { useForm, FieldError, SubmitHandler } from "react-hook-form";
// import { Value } from "react-time-picker/dist/cjs/shared/types";
import EventFormInput from "./EventFormInput.tsx";
import FormInputValidationError from "./FormInputValidationError.tsx";
import { IDefaultCalendarEventValues } from './AddCalendarEvent.tsx';

interface UseFormHandleSubmit {
  title: string;
  description: string;
  startTime: string;
  dueDate: string;
}

// type ValuePiece = Date | null;
// type Value = ValuePiece | [ValuePiece, ValuePiece];

interface FormProps {
  onSubmit: (event: UseFormHandleSubmit) => void;  // (event: React.FormEvent<HTMLFormElement>) => void;
  message: string;
  // defaultValues: {
  //   title: string;
  //   description: string;
  //   startTime: string;
  //   dueDate: string;
  // };
  defaultValues: IDefaultCalendarEventValues;
  onChangeDateValue: (date: any) => void;       // onChangeDateValue: (date: Date) => void;
  onChangeTimeValue: (value: any) => void;      // onChangeTimeValue: (value: Value) => void;
  dateValue: Date;
  timeValue: string;      // timeValue: Value;
}

const CalendarEventForm: React.FC<FormProps> = memo(
  ({
    onSubmit,
    message,
    defaultValues,
    onChangeDateValue,
    onChangeTimeValue,
    dateValue,
    timeValue,
  }) => {
    const navigate = useNavigate();
    const {
      register,
      handleSubmit,
      formState: { errors },          // formState: { errors, isValid },
    } = useForm({
      defaultValues: defaultValues,
      mode: "all",
      reValidateMode: "onBlur",
    });

    const getEditorStyle = (fieldError: FieldError | undefined) => {
      return fieldError ? "border: solid 1px red" : "display: block";
    };

    return (
      <form onSubmit={handleSubmit(onSubmit as SubmitHandler<IDefaultCalendarEventValues>)}>
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
          <FormInputValidationError
            fieldError={
              errors.title && errors.title.message
                ? { message: errors.title.message }
                : undefined
            }
          />
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
          <FormInputValidationError
            fieldError={
              errors.description && errors.description.message
                ? { message: errors.description.message }
                : undefined
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="dueDate">Due Date:</label>{" "}
          <DatePicker onChange={onChangeDateValue} value={dateValue} />
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
          <button
            className="btn btn-danger mr-2"
            onClick={() => navigate("/calendar-events")} // onClick={() => props.history.push("/calendar-events")}
          >
            Cancel
          </button>
          {message !== "" ? <div>{message}</div> : null}
        </div>
      </form>
    );
  }
);

export default CalendarEventForm;
