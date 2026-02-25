import React, { useState, memo, useCallback } from "react";
import { useAppSelector } from "../../../redux/selectors";
import { useNavigate } from "react-router-dom";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-date-picker";
import { useForm, FieldError } from "react-hook-form";
import { useUpdateCalendarEvent } from "../hooks/useUpdateCalendarEvent.ts";
import EventFormInput from "../../../shared/EventFormInput.tsx";
import FormInputValidationError from "../../../shared/FormInputValidationError.tsx";
import {
  selectCurrentCalendarEvent,
  selectMessage,
} from "../../../redux/selectors/index.ts";
import { ICalendarEvent } from "../../../redux/types.ts";
import { IDefaultCalendarEventValues } from "../pages/AddCalendarEventPage.tsx";

interface IUseFormHandleSubmit {
  title: string | null | undefined;
  description: string | null | undefined;
  startTime: string | null | undefined;
  dueDate: string | null | undefined;
}

const CalendarUpdateEventForm: React.FC = () => {
  const navigate = useNavigate();

  const currentCalendarEvent: ICalendarEvent | null = useAppSelector(
    selectCurrentCalendarEvent,
  );

  const message: string = useAppSelector(selectMessage);

  /**
   * Local Date + Time State
   */
  const [dateValue, setDateValue] = useState<string | Date>(() =>
    currentCalendarEvent?.dueDate
      ? new Date(currentCalendarEvent.dueDate).toISOString()
      : new Date(),
  );

  const [timeValue, setTimeValue] = useState<string | null>(
    currentCalendarEvent?.start ?? "",
  );

  /**
   * Default Form Values
   */
  const defaultValues: IDefaultCalendarEventValues = {
    title: currentCalendarEvent?.title,
    description: currentCalendarEvent?.description,
    startTime: currentCalendarEvent?.startTime,
    dueDate: currentCalendarEvent?.dueDate,
  };

  /**
   * Update Hook
   */
  const {
    updateStatus,
    updateEvent,
    deleteEvent,
  } = useUpdateCalendarEvent({
    dateValue: dateValue as string,
    timeValue: timeValue || "",
  });

  /**
   * React Hook Form
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUseFormHandleSubmit>({
    defaultValues,
    mode: "all",
    reValidateMode: "onBlur",
  });

  /**
   * Utility — Error Styling
   */
  const getEditorStyle = useCallback(
    (fieldError: FieldError | undefined): string =>
      fieldError ? "border: solid 1px red" : "display: block",
    [],
  );

  /**
   * Handlers
   */
  const handleFormSubmit = useCallback(
    (data: IUseFormHandleSubmit) => {
      updateEvent({
        ...data,
        dueDate: dateValue,
        startTime: timeValue,
      });

      navigate("/");
    },
    [updateEvent, dateValue, timeValue, navigate],
  );

  const handleDelete = useCallback(() => {
    deleteEvent();
  }, [deleteEvent]);

  const handleCancel = useCallback(() => {
    navigate("/calendar-events");
  }, [navigate]);

  const handleToggleStatus = useCallback(() => {
    updateStatus(!currentCalendarEvent?.status);
  }, [updateStatus, currentCalendarEvent]);

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {/* Title */}
        <div className="form-group form-group-margin-top">
          <EventFormInput
            htmlFor="title"
            name="Title"
            className={getEditorStyle(errors.title)}
            id="title"
            placeholder={currentCalendarEvent?.title || ""}
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

        {/* Description */}
        <div className="form-group form-group-margin-top">
          <EventFormInput
            htmlFor="description"
            name="Description"
            className={getEditorStyle(errors.description)}
            id="description"
            placeholder={currentCalendarEvent?.description || ""}
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

        {/* Status */}
        <div className="form-group form-group-margin-top">
          <label>
            <strong>Status: </strong>
          </label>
          {currentCalendarEvent?.status ? "Done" : "Pending"}
        </div>

        {/* Due Date */}
        <div className="form-group form-group-due-date-margin-top">
          <label htmlFor="dueDate">
            <strong>Due Date: </strong>
          </label>
          <DatePicker onChange={setDateValue as () => void} value={dateValue} />
        </div>

        {/* Start Time */}
        <div className="form-group form-group-start-time-margin-top">
          <label htmlFor="startTime">
            <strong>Start: </strong>
          </label>
          <TimePicker onChange={setTimeValue} value={timeValue} />
        </div>

        {/* Status Toggle */}
        <button
          type="button"
          aria-label={
            currentCalendarEvent?.status
              ? "Mark calendar event as pending"
              : "Mark calendar event as done"
          }
          className="btn btn-primary mr-2 form-group-margin-top mark-status-btn"
          onClick={handleToggleStatus}
        >
          {currentCalendarEvent?.status ? "Mark Pending" : "Mark Done"}
        </button>

        {/* Delete */}
        <button
          type="button"
          aria-label="Delete calendar event"
          className="btn btn-danger mr-2 form-group-margin-top delete-btn"
          onClick={handleDelete}
        >
          Delete <FontAwesomeIcon icon={faTrash} />
        </button>

        {/* Update */}
        <button
          type="submit"
          aria-label="Update calendar event"
          className="btn btn-success mr-2 form-group-margin-top update-btn"
        >
          Update
        </button>

        {/* Cancel */}
        <button
          type="button"
          aria-label="Cancel update calendar event action"
          className="btn btn-danger mr-2 form-group-margin-top cancel-btn"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </form>

      <p>{message}</p>
    </>
  );
};

export default memo(CalendarUpdateEventForm);
