// src/app/__tests__/ErrorBoundary.test.tsx

import React from "react";
import { render, screen } from "@testing-library/react";
import ErrorBoundary from "../ErrorBoundary";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  useRouteError: jest.fn(),
  isRouteErrorResponse: jest.fn(),
}));

describe("ErrorBoundary", () => {
  it("renders route error response", () => {
    (useRouteError as jest.Mock).mockReturnValue({
      status: 404,
      statusText: "Not Found",
      data: "Missing route",
    });

    (isRouteErrorResponse as jest.Mock).mockReturnValue(true);

    render(<ErrorBoundary />);

    expect(screen.getByText("404 Not Found")).toBeInTheDocument();
    expect(screen.getByText("Missing route")).toBeInTheDocument();
  });

  it("renders generic fallback", () => {
    (useRouteError as jest.Mock).mockReturnValue({});
    (isRouteErrorResponse as jest.Mock).mockReturnValue(false);

    render(<ErrorBoundary />);

    expect(
      screen.getByText("Something went wrong")
    ).toBeInTheDocument();
  });
});
