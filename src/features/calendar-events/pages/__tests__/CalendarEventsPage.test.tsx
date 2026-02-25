import React from "react";
import { render, screen } from "@testing-library/react";
import CalendarEventsPage from "../CalendarEventsPage";
import { useAppSelector } from "../../../../redux/selectors";
import { useCalendarEvents } from "../../hooks/useCalendarEvents";
import { useCalendarEventData } from "../../hooks/useCalendarEventData";

jest.mock("../../../../redux/selectors");
jest.mock("../../hooks/useCalendarEvents");
jest.mock("../../hooks/useCalendarEventData");

jest.mock("../../components/CalendarList", () => () => (
  <div>CalendarList</div>
));
jest.mock("../../components/CalendarListDetail", () => () => (
  <div>CalendarListDetail</div>
));
jest.mock("../../components/CalendarEventModal", () => () => (
  <div>CalendarEventModal</div>
));
jest.mock("../../components/Calendar", () => () => (
  <div>Calendar</div>
));
jest.mock("../../../../components/layout/CalendarSearchBox", () => () => (
  <div>CalendarSearchBox</div>
));

describe("CalendarEventsPage", () => {
  beforeEach(() => {
    (useAppSelector as jest.Mock)
      .mockReturnValueOnce([])  // events
      .mockReturnValueOnce(0)   // currentIndex
      .mockReturnValueOnce(false); // isLoading

    (useCalendarEvents as jest.Mock).mockReturnValue({
      setActiveCalendarEvent: jest.fn(),
      handleDateSelect: jest.fn(),
      handleEventClick: jest.fn(),
    });

    (useCalendarEventData as jest.Mock).mockImplementation(() => {});
  });

  it("renders all major components when not loading", () => {
    render(<CalendarEventsPage />);

    expect(screen.getByText("CalendarList")).toBeInTheDocument();
    expect(screen.getByText("CalendarListDetail")).toBeInTheDocument();
    expect(screen.getByText("Calendar")).toBeInTheDocument();
    expect(screen.getByText("CalendarEventModal")).toBeInTheDocument();
  });
});
