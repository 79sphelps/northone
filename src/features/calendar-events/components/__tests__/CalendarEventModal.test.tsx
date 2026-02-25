// src/features/calendar-events/components/__tests__/CalendarEventModal.test.tsx

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CalendarEventModal from "../CalendarEventModal";
import { useCalendarEventModal } from "../../hooks/useCalendarEventModal";

jest.mock("../../hooks/useCalendarEventModal");

jest.mock("react-bootstrap/Modal", () => (props: any) =>
  props.show ? <div>{props.children}</div> : null
);

jest.mock("react-bootstrap/Button", () => (props: any) => (
  <button onClick={props.onClick}>{props.children}</button>
));

jest.mock("react-date-picker", () => () => <div>DatePicker</div>);
jest.mock("react-time-picker", () => () => <div>TimePicker</div>);

describe("CalendarEventModal", () => {
  const mockClose = jest.fn();
  const mockSave = jest.fn();
  const mockChange = jest.fn();

  beforeEach(() => {
    (useCalendarEventModal as jest.Mock).mockReturnValue({
      handleClose: mockClose,
      saveNewEvent: mockSave,
      handleEventChange: mockChange,
      newEvent: { title: "", description: "" },
      dateValue: new Date(),
      setDateValue: jest.fn(),
      timeValue: "10:00",
      setTimeValue: jest.fn(),
    });
  });

  it("renders when show=true", () => {
    render(<CalendarEventModal show={true} setShow={jest.fn()} />);

    expect(screen.getByText("Create New Event")).toBeInTheDocument();
  });

  it("calls saveNewEvent on submit", () => {
    render(<CalendarEventModal show={true} setShow={jest.fn()} />);

    fireEvent.click(screen.getByText("Submit"));
    expect(mockSave).toHaveBeenCalled();
  });

  it("calls handleClose on Close", () => {
    render(<CalendarEventModal show={true} setShow={jest.fn()} />);

    fireEvent.click(screen.getByText("Close"));
    expect(mockClose).toHaveBeenCalled();
  });
});
