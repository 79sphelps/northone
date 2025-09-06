import React, { useState, memo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-date-picker";
import { useForm } from "react-hook-form";
import { useUpdateCalendarEvent } from "./useUpdateCalendarEvent.ts";
import EventFormInput from "./EventFormInput.tsx";
import FormInputValidationError from "./FormInputValidationError.tsx";
import {
  selectCurrentCalendarEvent,
  selectMessage,
} from "../redux/selectors/index.ts";

interface UseFormHandleSubmit {
  title: string;
  description: string;
  startTime: string;
  dueDate: string;
}

const CalendarUpdateEventForm = memo(() => {
  const navigate = useNavigate();
  const currentCalendarEvent = useSelector(selectCurrentCalendarEvent);
  const message = useSelector(selectMessage);

  const [dateValue, onChange] = useState<any>(
    new Date(
      currentCalendarEvent && currentCalendarEvent.dueDate
        ? currentCalendarEvent.dueDate
        : new Date()
    )
  );
  const [timeValue, onChangeTimeValue] = useState(
    currentCalendarEvent && currentCalendarEvent.start
      ? currentCalendarEvent.start
      : // : new Date().toISOString().replace(/T.*$/, "") + "T12:00:00"
        ""
  );

  const defaultValues = {
    title: currentCalendarEvent?.title,
    description: currentCalendarEvent?.description,
    startTime: currentCalendarEvent?.startTime,
    dueDate: currentCalendarEvent?.dueDate,
  };

  const {
    updateCalendarEventStatusUnderEdit,
    updateCalendarEventUnderEdit,
    deleteCalendarEventUnderEdit,
  } = useUpdateCalendarEvent({ dateValue: dateValue.toISOString(), timeValue });

  const {
    register,
    handleSubmit,
    // formState: { errors, isValid },
    formState: { errors },
  } = useForm<UseFormHandleSubmit>({
    defaultValues: defaultValues,
    mode: "all",
    reValidateMode: "onBlur",
  });

  const getEditorStyle = (fieldError: any) => {
    return fieldError ? "border: solid 1px red" : "display: block";
  };

  return (
    <>
      <form
        // noValidate
        onSubmit={handleSubmit((data) => {
          updateCalendarEventUnderEdit({
            ...data,
            dueDate: dateValue.toISOString(),
            startTime: timeValue,
          });
        })}
      >
        <div className="form-group">
          <EventFormInput
            htmlFor="title"
            name="Title"
            className={getEditorStyle(errors.title)}
            id="title"
            placeholder={currentCalendarEvent.title}
            requiredMsg="You must enter a valid title"
            minLength={5}
            minLengthMsg="The title must be at least 5 characters"
            register={register}
          />
          <FormInputValidationError
            fieldError={
              errors.title ? { message: errors.title.message ?? "" } : undefined
            }
          />
        </div>
        <div className="form-group">
          <EventFormInput
            htmlFor="description"
            name="Description"
            className={getEditorStyle(errors.description)}
            id="description"
            placeholder={currentCalendarEvent.description}
            requiredMsg="You must enter a valid description"
            minLength={10}
            minLengthMsg="The description must be at least 10 characters"
            register={register}
          />
          <FormInputValidationError
            fieldError={
              errors.description
                ? { message: errors.description.message ?? "" }
                : undefined
            }
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

        {currentCalendarEvent.status ? (
          <button
            className="btn btn-primary mr-2"
            onClick={() => updateCalendarEventStatusUnderEdit(null)}
          >
            Mark Pending
          </button>
        ) : (
          <button
            className="btn btn-primary mr-2"
            onClick={() => updateCalendarEventStatusUnderEdit(undefined)}
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
          // disabled={!isValid}
          // style={{
          //   color: !isValid && "lightgrey",
          //   cursor: !isValid && "not-allowed",
          //   marginRight: "20px",
          // }}
          // onClick={() => updateCalendarEventUnderEdit()}
        >
          Update
        </button>
        <button
          className="btn btn-danger mr-2"
          onClick={() => navigate("/calendar-events")} // onClick={() => props.history.push("/calendar-events")}
        >
          Cancel
        </button>
      </form>
      <p>{message}</p>
    </>
  );
});

export default CalendarUpdateEventForm;
