import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddCalendarEventPage from "../AddCalendarEventPage";
import { useAppSelector } from "../../../../redux/selectors";
import { useAddCalendarEvent } from "../../hooks/useAddCalendarEvent";

jest.mock("../../../../redux/selectors");
jest.mock("../../hooks/useAddCalendarEvent");

jest.mock("../../components/CalendarEventForm", () => (props: any) => (
  <button onClick={() => props.onSubmit({ title: "Test", description: "Test desc" })}>
    MockFormSubmit
  </button>
));

describe("AddCalendarEventPage", () => {
  it("renders form when not submitted", () => {
    (useAppSelector as jest.Mock).mockReturnValue(null);

    (useAddCalendarEvent as jest.Mock).mockReturnValue({
      saveCalendarEvent: jest.fn(),
      newCalendarEvent: jest.fn(),
      message: "",
      submitted: false,
    });

    render(<AddCalendarEventPage />);

    expect(
      screen.getByText("Add a New Calendar Event")
    ).toBeInTheDocument();
  });

  it("shows success message when submitted", () => {
    (useAppSelector as jest.Mock).mockReturnValue({});

    const mockNew = jest.fn();

    (useAddCalendarEvent as jest.Mock).mockReturnValue({
      saveCalendarEvent: jest.fn(),
      newCalendarEvent: mockNew,
      message: "",
      submitted: true,
    });

    render(<AddCalendarEventPage />);

    expect(
      screen.getByText("The new calendar item was created successfully!")
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText("Add"));
    expect(mockNew).toHaveBeenCalled();
  });
});
