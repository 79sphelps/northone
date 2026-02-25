// src/features/calendar-events/components/__tests__/Calendar.test.tsx

import React from "react";
import { render, screen } from "@testing-library/react";
import Calendar from "../Calendar";
import { formatDate } from "../../../../redux/utils";

jest.mock("@fullcalendar/react", () => (props: any) => {
  return (
    <div data-testid="full-calendar">
      FullCalendarMock
      <div data-testid="events-prop">
        {JSON.stringify(props.events)}
      </div>
    </div>
  );
});

jest.mock("../../../../redux/utils", () => ({
  formatDate: jest.fn(),
}));

describe("Calendar", () => {
  const mockSelect = jest.fn();
  const mockClick = jest.fn();

  it("renders fallback when no events", () => {
    render(
      <Calendar
        calendarEvents={[]}
        handleDateSelect={mockSelect}
        handleEventClick={mockClick}
      />
    );

    expect(
      screen.getByText("No Calendar Events to Show")
    ).toBeInTheDocument();
  });

  it("maps events correctly", () => {
    (formatDate as jest.Mock).mockReturnValue("2026-02-24");

    const events = [
      {
        _id: "1",
        title: "Test Event",
        description: "Desc",
        dueDate: "2026-02-24",
        start: "10:00",
        status: false,
      },
    ];

    render(
      <Calendar
        calendarEvents={events}
        handleDateSelect={mockSelect}
        handleEventClick={mockClick}
      />
    );

    expect(screen.getByTestId("full-calendar")).toBeInTheDocument();

    const mapped = screen.getByTestId("events-prop");
    expect(mapped.textContent).toContain("Test Event");
    expect(mapped.textContent).toContain("2026-02-24T10:00:00");
  });
});
