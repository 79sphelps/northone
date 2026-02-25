// src/features/calendar-events/components/__tests__/CalendarList.test.tsx

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CalendarList from "../CalendarList";
import { useAppSelector } from "../../../../redux/selectors";
import { useAppDispatch } from "../../../../redux/store";

jest.mock("../../../../redux/selectors");
jest.mock("../../../../redux/store");

jest.mock("react-bootstrap/Spinner", () => () => <div>Spinner</div>);

describe("CalendarList", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });

  it("renders loading state", () => {
    (useAppSelector as jest.Mock).mockReturnValue(true);

    render(
      <CalendarList
        calendarEvents={[]}
        setActiveCalendarEvent={jest.fn()}
        currentIndex={0}
      />
    );

    expect(screen.getByText("Spinner")).toBeInTheDocument();
  });

  it("filters completed events", () => {
    (useAppSelector as jest.Mock).mockReturnValue(false);

    const events = [
      { _id: "1", title: "A", status: false },
      { _id: "2", title: "B", status: true },
    ];

    render(
      <CalendarList
        calendarEvents={events as any}
        setActiveCalendarEvent={jest.fn()}
        currentIndex={0}
      />
    );

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "completed" },
    });

    expect(screen.getByText("B")).toBeInTheDocument();
  });
});
