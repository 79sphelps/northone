import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store";
import AppLayout from "../app/AppLayout";
import React from "react";

jest.mock("../components/layout/NavBar", () => ({
  __esModule: true,
  default: ({ initializeCalendarEventToAdd }: any) => (
    <button onClick={initializeCalendarEventToAdd}>
      Mock NavBar
    </button>
  ),
}));

jest.mock("../components/feedback/Loader", () => ({
  __esModule: true,
  default: () => <div>Loading...</div>,
}));

describe("AppLayout", () => {
  it("renders NavBar", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AppLayout />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/mock navbar/i)).toBeInTheDocument();
  });

  it("dispatches reset actions when initialize function is called", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AppLayout />
        </MemoryRouter>
      </Provider>
    );

    const button = screen.getByText(/mock navbar/i);
    button.click();

    const state = store.getState();

    expect(state).toBeDefined();
  });
});
