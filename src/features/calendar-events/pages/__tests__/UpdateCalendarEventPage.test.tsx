import React from "react";
import { render, screen } from "@testing-library/react";
import UpdateCalendarEventPage from "../UpdateCalendarEventPage";
import { useAppSelector } from "../../../../redux/selectors";

jest.mock("../../../../redux/selectors");

jest.mock("../../components/CalendarUpdateEventForm", () => () => (
  <div>MockUpdateForm</div>
));

describe("UpdateCalendarEventPage", () => {
  it("renders update form when event exists", () => {
    (useAppSelector as jest.Mock).mockReturnValue({ id: 1 });

    render(<UpdateCalendarEventPage />);

    expect(screen.getByText("MockUpdateForm")).toBeInTheDocument();
  });

  it("renders fallback when no event selected", () => {
    (useAppSelector as jest.Mock).mockReturnValue(null);

    render(<UpdateCalendarEventPage />);

    expect(
      screen.getByText("Please click on a calendar event.")
    ).toBeInTheDocument();
  });
});
