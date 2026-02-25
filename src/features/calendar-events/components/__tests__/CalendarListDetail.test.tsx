// src/features/calendar-events/components/__tests__/CalendarListDetail.test.tsx

import React from "react";
import { render, screen } from "@testing-library/react";
import CalendarListDetail from "../CalendarListDetail";
import { useAppSelector } from "../../../../redux/selectors";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../../../redux/selectors");
jest.mock("react-date-picker", () => () => <div>DatePicker</div>);

describe("CalendarListDetail", () => {
  it("shows fallback if no event", () => {
    (useAppSelector as jest.Mock).mockReturnValue(null);

    render(<CalendarListDetail />);
    expect(
      screen.getByText("Click on a calendar item to show detailed info")
    ).toBeInTheDocument();
  });

  it("renders event details", () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      _id: "1",
      title: "Test",
      description: "Desc",
      status: true,
      dueDate: "2026-02-24",
    });

    render(
      <MemoryRouter>
        <CalendarListDetail />
      </MemoryRouter>
    );

    expect(screen.getByText("Test")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();
  });
});
