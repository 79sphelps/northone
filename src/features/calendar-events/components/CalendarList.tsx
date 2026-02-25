import React, { memo, useState } from "react";
// import { useCalendarList } from "./useCalendarList.ts";
import { useAppSelector } from "../../../redux/selectors";
import { useAppDispatch } from "../../../redux/store/index.ts";
import {
  getCalendarEvents,
  updateCalendarEvent,
} from "../../../redux/actions/index.ts";
import { ICalendarEvent } from "../../../redux/types.ts";
import { selectIsLoading } from "../../../redux/selectors/index.ts";
import Spinner from "react-bootstrap/Spinner";

interface ICalendarListProps {
  calendarEvents: ICalendarEvent[];
  setActiveCalendarEvent: (
    calendarEvent: ICalendarEvent,
    index: number,
  ) => void;
  currentIndex: number;
}

const CalendarList: React.FC<ICalendarListProps> = memo(
  ({ calendarEvents, setActiveCalendarEvent, currentIndex }) => {
    // const { removeAllCalendarEvents }: { removeAllCalendarEvents: () => void } =
    //   useCalendarList();
    const isLoading: boolean = useAppSelector(selectIsLoading);
    const [filter, setFilter] = useState("all");
    const dispatch = useAppDispatch();

    if (isLoading) {
      return (
        <div
          className="is-loading"
          data-testid="calendar-list-events-loading-id"
        >
          <Spinner animation="border" style={{ height: "200px" }} />
          <p className="loading-text">Loading Calendar Data...</p>
        </div>
      );
    }

    const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFilter(e.target.value);
    };

    const updateEventStatus = (item: ICalendarEvent) => {
      const i = calendarEvents.find((v) => v._id === item._id);
      if (i) {
        const n = { ...i, status: !item.status };
        dispatch(updateCalendarEvent({ _id: n._id, ...n }));
        // dispatch(getCalendarEvent({ _id: n._id }))
        setTimeout(() => dispatch(getCalendarEvents()), 500);
      }
    };

    return (
      <div className="calendar-events" data-testid="calendar-list-id">
        <div className="calendar-list-header-and-filter">
          <h4 data-testid="calendar-list-header-id">Calendar Events</h4>
          <select onChange={handleFilter}>
            <option value="all">All</option>
            <option value="pending">Not Started</option>
            <option value="completed">Done</option>
          </select>
        </div>

        <ul
          className="calendar-list list-group"
          aria-labelledby="calendar-events-heading"
          aria-label="calendar events"
        >
          {calendarEvents &&
            calendarEvents
              .filter((v) =>
                filter === "pending"
                  ? !v.status
                  : filter === "completed"
                    ? v.status
                    : v,
              )
              .map((calendarEvent, index) => (
                <div className="event-item" key={calendarEvent._id}>
                  <li
                    className={
                      "list-item " +
                      `${calendarEvent.status ? "text-decoration-line-through" : "none"}`
                    }
                    onClick={() => setActiveCalendarEvent(calendarEvent, index)}
                    key={calendarEvent._id}
                  >
                    {calendarEvent.title}
                  </li>
                  <input
                    className="event-item-checkbox"
                    type="checkbox"
                    onChange={() => updateEventStatus(calendarEvent)}
                    checked={calendarEvent.status ? true : false}
                  />
                </div>
              ))}
        </ul>
      </div>

      // <div className='calendar-events' data-testid="calendar-list-id">
      //   <h4 data-testid="calendar-list-header-id">Calendar Events</h4>
      //   <div
      //     className="col-md-6"
      //     style={{ height: "200px", overflow: "scroll", marginBottom: "20px" }}
      //   >
      //     <ul className="list-group" aria-labelledby="calendar-events-heading" aria-label="calendar events">
      //       {calendarEvents &&
      //         calendarEvents.map((calendarEvent, index) => (
      //           <li
      //             className={
      //               "list-group-item-action list-group-item " +
      //               (index === currentIndex ? "active" : "")
      //               //  + `${ calendarEvent.status === 'Done' ? 'text-decoration-line-through' : 'none'}`
      //             }
      //             onClick={() => setActiveCalendarEvent(calendarEvent, index)}
      //             key={calendarEvent._id}
      //           >
      //             {calendarEvent.title}
      //           </li>
      //         ))}
      //     </ul>
      //   </div>

      //   <button
      //     className="col-md-6 m-3 btn btn-sm btn-danger"
      //     onClick={() => removeAllCalendarEvents()}
      //     disabled={true}
      //   >
      //     Remove All
      //   </button>
      // </div>
    );
  },
);

export default CalendarList;
