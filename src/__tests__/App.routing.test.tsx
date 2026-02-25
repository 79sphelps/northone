// src/__tests__/App.routing.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import store from "../redux/store";
import App from "../App";

HTMLCanvasElement.prototype.getContext = jest.fn();

const renderWithProviders = (ui: React.ReactElement) =>
  render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  );

describe("App Routing & Navigation", () => {
  it("renders navigation links", () => {
    renderWithProviders(<App />);

    expect(
      screen.getByRole("link", { name: /calendar events/i })
    ).toHaveAttribute("href", "/");

    expect(
      screen.getByRole("link", { name: /add/i })
    ).toHaveAttribute("href", "/add");
  });

  it("renders search input", () => {
    renderWithProviders(<App />);
    expect(
      screen.getByPlaceholderText(/search by title/i)
    ).toBeInTheDocument();
  });

  it("navigates to Add page", async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);

    await user.click(screen.getByRole("link", { name: /add/i }));

    expect(
      screen.getByText(/add a new calendar event/i)
    ).toBeInTheDocument();
  });
});
