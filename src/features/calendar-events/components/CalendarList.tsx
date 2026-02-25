import React, { memo, useState, useMemo, useCallback } from "react";
import { useAppDispatch } from "../../../redux/store";
import { useAppSelector } from "../../../redux/selectors";
import { updateCalendarEvent } from "../../../redux/actions";
import { ICalendarEvent } from "../../../redux/types";
import { selectIsLoading } from "../../../redux/selectors";
import Spinner from "react-bootstrap/Spinner";

interface Props {
  calendarEvents: ICalendarEvent[];
  setActiveCalendarEvent: (
    calendarEvent: ICalendarEvent,
    index: number
  ) => void;
  currentIndex: number;
}

const CalendarList: React.FC<Props> = memo(
  ({ calendarEvents, setActiveCalendarEvent, currentIndex }) => {
    const isLoading = useAppSelector(selectIsLoading);
    const dispatch = useAppDispatch();
    const [filter, setFilter] = useState<"all" | "pending" | "completed">(
      "all"
    );

    const filteredEvents = useMemo(() => {
      return calendarEvents.filter((event) => {
        if (filter === "pending") return !event.status;
        if (filter === "completed") return !!event.status;
        return true;
      });
    }, [calendarEvents, filter]);

    const updateEventStatus = useCallback(
      (event: ICalendarEvent) => {
        dispatch(
          updateCalendarEvent({
            ...event,
            status: !event.status,
          })
        );
      },
      [dispatch]
    );

    if (isLoading) {
      return (
        <div className="is-loading" data-testid="calendar-list-events-loading-id">
          <Spinner animation="border" style={{ height: "200px" }} />
          <p className="loading-text">Loading Calendar Data...</p>
        </div>
      );
    }

    return (
      <div className="calendar-events" data-testid="calendar-list-id">
        <div className="calendar-list-header-and-filter">
          <h4 data-testid="calendar-list-header-id">Calendar Events</h4>
          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value as typeof filter)
            }
          >
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
          {filteredEvents.map((event, index) => (
            <div key={event._id} className="event-item">
              <li
                className={`list-item ${
                  event.status ? "text-decoration-line-through" : ""
                }`}
                onClick={() => setActiveCalendarEvent(event, index)}
              >
                {event.title}
              </li>
              <input
                type="checkbox"
                checked={!!event.status}
                onChange={() => updateEventStatus(event)}

                className="event-item-checkbox"
              />
            </div>
          ))}
        </ul>
      </div>
    );
  }
);

export default CalendarList;
