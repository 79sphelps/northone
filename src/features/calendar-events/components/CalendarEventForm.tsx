import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";
import EventFormInput from "../../../shared/EventFormInput";
import FormInputValidationError from "../../../shared/FormInputValidationError";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import "react-date-picker/dist/DatePicker.css";


export interface CalendarEventFormValues {
  title: string;
  description: string;
}

interface Props {
  onSubmit: SubmitHandler<CalendarEventFormValues>;
  message?: string;
  defaultValues: CalendarEventFormValues;
  onChangeDateValue: (date: Date | null) => void;
  onChangeTimeValue: (value: string | null) => void;
  dateValue: Date | null;
  timeValue: string | null;
}

const CalendarEventForm: React.FC<Props> = memo(
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
      formState: { errors },
    } = useForm<CalendarEventFormValues>({
      defaultValues,
      mode: "onBlur",
    });

    return (
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-group form-group-margin-top">
          <EventFormInput
            htmlFor="title"
            name="Title"
            id="title"
            register={register}
            requiredMsg="Title is required"
            minLength={5}
            minLengthMsg="Minimum 5 characters"
          />
          <FormInputValidationError fieldError={errors.title} />
        </div>

        <div className="form-group form-group-margin-top">
          <EventFormInput
            htmlFor="description"
            name="Description"
            id="description"
            register={register}
            requiredMsg="Description is required"
            minLength={10}
            minLengthMsg="Minimum 10 characters"
          />
          <FormInputValidationError fieldError={errors.description} />
        </div>

        <div className="form-group form-group-due-date-margin-top">
          <label htmlFor="dueDate">Due Date:</label>{" "}
          <DatePicker onChange={onChangeDateValue} value={dateValue} />
        </div>

        <div className="form-group form-group-start-time-margin-top">
          <label htmlFor="dueDate">Time Start:</label>{" "}
          <TimePicker onChange={onChangeTimeValue} value={timeValue} />
        </div>

        <div className="mt-3">
          <button
            aria-label="Submit add calendar event"
            type="submit"
            className="btn btn-success me-2 add-btn"
          >
            Submit
          </button>
          <button
            aria-label="Cancel add calendar event"
            type="button"
            className="btn btn-danger mr-2 cancel-btn"
            onClick={() => navigate("/calendar-events")}
          >
            Cancel
          </button>
        </div>

        {message && <div className="mt-2">{message}</div>}
      </form>
    );
  },
);

export default CalendarEventForm;
