import { memo } from "react";
import { useSelector } from "react-redux";
import { selectCalendarEventToAdd } from "../redux/selectors";
import { useAddCalendarEvent } from "./useAddCalendarEvent";
import CalendarEventForm from "./CalendarEventForm";

const AddCalendarEvent2 = memo(() => {
  const CalendarEventToAdd = useSelector(selectCalendarEventToAdd);
  const { saveCalendarEvent, newCalendarEvent, message, submitted } =
    useAddCalendarEvent();
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
          />
          {/* <form noValidate onSubmit={handleSubmit(saveCalendarEvent)}> */}
        </div>
      )}
    </div>
  );
});

export default AddCalendarEvent2;
