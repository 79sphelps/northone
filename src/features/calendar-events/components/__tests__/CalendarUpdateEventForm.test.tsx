// src/features/calendar-events/components/__tests__/CalendarUpdateEventForm.test.tsx

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CalendarUpdateEventForm from "../CalendarUpdateEventForm";
import { useAppSelector } from "../../../../redux/selectors";
import { useUpdateCalendarEvent } from "../../hooks/useUpdateCalendarEvent";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../../../redux/selectors");
jest.mock("../../hooks/useUpdateCalendarEvent");

describe("CalendarUpdateEventForm", () => {
  const mockUpdateStatus = jest.fn();
  const mockUpdateEvent = jest.fn();
  const mockDelete = jest.fn();

  beforeEach(() => {
    (useAppSelector as jest.Mock)
      .mockReturnValueOnce({
        title: "Test",
        description: "Test desc",
        status: false,
      })
      .mockReturnValueOnce("");

    (useUpdateCalendarEvent as jest.Mock).mockReturnValue({
      updateStatus: mockUpdateStatus,
      updateEvent: mockUpdateEvent,
      deleteEvent: mockDelete,
    });
  });

  it("renders status correctly", () => {
    render(
      <MemoryRouter>
        <CalendarUpdateEventForm />
      </MemoryRouter>
    );

    expect(screen.getByText("Pending")).toBeInTheDocument();
  });

  it("toggles status", () => {
    render(
      <MemoryRouter>
        <CalendarUpdateEventForm />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Mark Done"));
    expect(mockUpdateStatus).toHaveBeenCalledWith(true);
  });

  it("calls delete", () => {
    render(
      <MemoryRouter>
        <CalendarUpdateEventForm />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Delete/));
    expect(mockDelete).toHaveBeenCalled();
  });
});
