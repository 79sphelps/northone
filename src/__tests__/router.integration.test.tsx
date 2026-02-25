import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store";
import { router as appRouter } from "../app/router";
import React from "react";

HTMLCanvasElement.prototype.getContext = jest.fn();

const renderWithRouter = (initialEntries: string[]) => {
  const memoryRouter = createMemoryRouter(appRouter.routes, {
    initialEntries,
  });

  return render(
    <Provider store={store}>
      <RouterProvider router={memoryRouter} />
    </Provider>
  );
};

describe("Router Integration", () => {
  it("redirects '/' to '/calendar-events'", async () => {
    renderWithRouter(["/"]);

    expect(
      await screen.findByText(/calendar events/i)
    ).toBeInTheDocument();
  });

  it("renders Add page at '/add'", async () => {
    renderWithRouter(["/add"]);

    expect(
      await screen.findByText(/add/i)
    ).toBeInTheDocument();
  });

  it("renders NotFound page for unknown route", async () => {
    renderWithRouter(["/does-not-exist"]);

    expect(
      await screen.findByText(/not found/i)
    ).toBeInTheDocument();
  });
});
