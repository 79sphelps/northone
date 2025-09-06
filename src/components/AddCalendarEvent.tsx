import React, { memo, useState } from "react";
import { useSelector } from "react-redux";
// import { Value } from "react-time-picker/dist/cjs/shared/types";

import CalendarEventForm from "./CalendarEventForm.tsx";
import { useAddCalendarEvent } from "./useAddCalendarEvent.ts";
import { selectCalendarEventToAdd } from "../redux/selectors/index.ts";

const AddCalendarEvent = memo(() => {
  const CalendarEventToAdd = useSelector(selectCalendarEventToAdd);
  const [dateValue, setDateValue] = useState(new Date());
  // const [timeValue, setTimeValue] = useState<Value>(""); // useState('10:00');
  const [timeValue, setTimeValue] = useState(""); // useState('10:00');
  const { saveCalendarEvent, newCalendarEvent, message, submitted } =
    useAddCalendarEvent({ dateValue, timeValue });

  const defaultValues = {
    title: "",
    description: "",
    startTime: "",
    dueDate: "",
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
