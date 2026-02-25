// src/shared/__tests__/EventFormInput.test.tsx

import React from "react";
import { render, screen } from "@testing-library/react";
import EventFormInput from "../EventFormInput";

describe("EventFormInput", () => {
  it("renders label and input", () => {
    render(
      <EventFormInput
        htmlFor="title"
        name="Title"
        id="title"
        register={jest.fn()}
      />
    );

    expect(screen.getByLabelText("Title")).toBeInTheDocument();
  });
});
