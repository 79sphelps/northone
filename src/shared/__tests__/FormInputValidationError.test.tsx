// src/shared/__tests__/FormInputValidationError.test.tsx

import React from "react";
import { render, screen } from "@testing-library/react";
import FormInputValidationError from "../FormInputValidationError";

describe("FormInputValidationError", () => {
  it("renders nothing if no error", () => {
    const { container } = render(
      <FormInputValidationError fieldError={undefined} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders error message", () => {
    render(
      <FormInputValidationError fieldError={{ message: "Required" }} />
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Required");
  });
});
