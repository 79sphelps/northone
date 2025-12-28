import React, { memo } from "react";
// import { useCalendarList } from "./useCalendarList.ts";
import { useAppSelector } from "../redux/selectors";
import { ICalendarEvent } from "../redux/actions/index.ts";
import { selectIsLoading } from "../redux/selectors/index.ts";
import Spinner from "react-bootstrap/Spinner";

interface ICalendarListProps {
  calendarEvents: ICalendarEvent[];
  setActiveCalendarEvent: (
    calendarEvent: ICalendarEvent,
    index: number
  ) => void;
  currentIndex: number;
}

const CalendarList: React.FC<ICalendarListProps> = memo(
  ({ calendarEvents, setActiveCalendarEvent, currentIndex }) => {
    // const { removeAllCalendarEvents }: { removeAllCalendarEvents: () => void } =
    //   useCalendarList();
    const isLoading: boolean = useAppSelector(selectIsLoading);

    if (isLoading) {
      return (
        <div className="is-loading" data-testid='calendar-list-events-loading-id'>
          <Spinner animation="border" style={{ height: "200px" }}/>
          <p className="loading-text">
            Loading Calendar Data...
          </p>
        </div>
      );
    }

    return (
      <div data-testid="calendar-list-id">
        <h4 data-testid="calendar-list-header-id">Calendar Events</h4>
        <div
          className="col-md-6"
          style={{ height: "200px", overflow: "scroll", marginBottom: "20px" }}
        >
          <ul className="list-group" aria-labelledby="calendar-events-heading" aria-label="calendar events">
            {calendarEvents &&
              calendarEvents.map((calendarEvent, index) => (
                <li
                  className={
                    "list-group-item-action list-group-item " +
                    (index === currentIndex ? "active" : "")
                    //  + `${ calendarEvent.status === 'Done' ? 'text-decoration-line-through' : 'none'}`
                  }
                  onClick={() => setActiveCalendarEvent(calendarEvent, index)}
                  key={index}
                >
                  {calendarEvent.title}
                </li>
              ))}
          </ul>
        </div>
        {/* <button
          className="col-md-6 m-3 btn btn-sm btn-danger"
          onClick={() => removeAllCalendarEvents()}
          disabled={true}
        >
          Remove All
        </button> */}
      </div>
    );
  }
);

export default CalendarList;
