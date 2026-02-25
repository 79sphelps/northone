// src/features/calendar-events/components/__tests__/CalendarEvents.test.tsx

import React from "react";
import { render, screen } from "@testing-library/react";
import CalendarEvents from "../CalendarEvents";
import { useAppSelector } from "../../../../redux/selectors";
import { useCalendarEvents } from "../../hooks/useCalendarEvents";
import { useCalendarEventData } from "../../hooks/useCalendarEventData";

jest.mock("../../../../redux/selectors");
jest.mock("../../hooks/useCalendarEvents");
jest.mock("../../hooks/useCalendarEventData");

jest.mock("../Calendar", () => () => <div>CalendarComponent</div>);
jest.mock("../CalendarList", () => () => <div>CalendarList</div>);
jest.mock("../CalendarListDetail", () => () => <div>CalendarListDetail</div>);
jest.mock("../CalendarEventModal", () => () => <div>CalendarModal</div>);
jest.mock("../../../../components/layout/CalendarSearchBox", () => () => (
  <div>SearchBox</div>
));

describe("CalendarEvents", () => {
  beforeEach(() => {
    (useAppSelector as jest.Mock)
      .mockReturnValueOnce([]) // events
      .mockReturnValueOnce(0) // index
      .mockReturnValueOnce(false); // isLoading

    (useCalendarEvents as jest.Mock).mockReturnValue({
      setActiveCalendarEvent: jest.fn(),
      handleDateSelect: jest.fn(),
      handleEventClick: jest.fn(),
    });
  });

  it("renders child components when not loading", () => {
    render(<CalendarEvents />);

    expect(screen.getByText("CalendarComponent")).toBeInTheDocument();
    expect(screen.getByText("CalendarList")).toBeInTheDocument();
    expect(screen.getByText("CalendarListDetail")).toBeInTheDocument();
  });
});
