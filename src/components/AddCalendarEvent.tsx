import React, { memo, useState } from "react";
import { useAppSelector } from "../redux/selectors";
// import { Value } from "react-time-picker/dist/cjs/shared/types";
import CalendarEventForm from "./CalendarEventForm.tsx";
import { useAddCalendarEvent } from "./useAddCalendarEvent.ts";
import { selectCalendarEventToAdd } from "../redux/selectors/index.ts";
import { ICalendarEventToAdd } from "../redux/reducers/index.ts";
import { IUseFormHandleSubmit } from "./useAddCalendarEvent.ts";

// type ValuePiece = Date | null;
// type Value = ValuePiece | [ValuePiece, ValuePiece];

export interface IDefaultCalendarEventValues {
  title: string | null | undefined;
  description: string | null | undefined;
  startTime: string | null | undefined;
  dueDate: string | null | undefined;
}

const AddCalendarEvent: React.FC = memo(() => {
  const calendarEventToAdd: ICalendarEventToAdd | null = useAppSelector(
    selectCalendarEventToAdd
  );
  const [dateValue, setDateValue] = useState<Date>(new Date());
  const [timeValue, setTimeValue] = useState<string>(""); // useState('10:00');
  const {
    saveCalendarEvent,
    newCalendarEvent,
    message,
    submitted,
  }: {
    saveCalendarEvent: (event: IUseFormHandleSubmit) => void;
    newCalendarEvent: () => void;
    message: string;
    submitted: boolean;
  } = useAddCalendarEvent({ dateValue, timeValue });

  const defaultValues: IDefaultCalendarEventValues = {
    title: "",
    description: "",
    startTime: "",
    dueDate: "",
  };
  return (
    <div className="submit-form">
      {submitted && calendarEventToAdd ? (
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
        <div className='add-calendar-event-form'>
          <h1>Add a New Calendar Event</h1>
          <CalendarEventForm
            onSubmit={saveCalendarEvent}
            message={message}
            defaultValues={defaultValues}
            onChangeDateValue={setDateValue}
            onChangeTimeValue={setTimeValue}
            dateValue={dateValue}
            timeValue={timeValue}
          />
          {/* <form noValidate onSubmit={handleSubmit(saveCalendarEvent)}> */}
        </div>
      )}
    </div>
  );
});

export default AddCalendarEvent;
