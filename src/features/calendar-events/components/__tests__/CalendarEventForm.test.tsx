// src/features/calendar-events/components/__tests__/CalendarEventForm.test.tsx

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CalendarEventForm from "../CalendarEventForm";
import { MemoryRouter } from "react-router-dom";

const mockSubmit = jest.fn();

describe("CalendarEventForm", () => {
  it("submits form", async () => {
    render(
      <MemoryRouter>
        <CalendarEventForm
          onSubmit={mockSubmit}
          defaultValues={{ title: "", description: "" }}
          onChangeDateValue={jest.fn()}
          onChangeTimeValue={jest.fn()}
          dateValue={new Date()}
          timeValue=""
        />
      </MemoryRouter>
    );

    // fireEvent.click(screen.getByText("Submit"));
    fireEvent.submit(screen.getByTestId("event-form"));

    expect(mockSubmit).toHaveBeenCalled();
  });

  it("navigates on cancel", () => {
    render(
      <MemoryRouter>
        <CalendarEventForm
          onSubmit={mockSubmit}
          defaultValues={{ title: "", description: "" }}
          onChangeDateValue={jest.fn()}
          onChangeTimeValue={jest.fn()}
          dateValue={new Date()}
          timeValue=""
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Cancel"));
  });
});
