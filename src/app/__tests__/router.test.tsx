// src/app/__tests__/router.test.tsx

import React from "react";
import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
// import { configureStore } from "@reduxjs/toolkit";
import { createStore } from "redux";
import { router } from "../router";

/**
 * Mock lazy pages so Suspense doesn't break
 */
jest.mock(
  "../../features/calendar-events/pages/CalendarEventsPage",
  () => () => <div>Calendar Events Page</div>
);

jest.mock(
  "../../features/calendar-events/pages/AddCalendarEventPage",
  () => () => <div>Add Page</div>
);

jest.mock(
  "../../features/calendar-events/pages/UpdateCalendarEventPage",
  () => () => <div>Update Page</div>
);

jest.mock(
  "../../components/feedback/NotFoundPage",
  () => () => <div>Not Found</div>
);

const mockStore = createStore(() => ({}));

describe("App Router", () => {
//   const mockStore = configureStore({
//     reducer: () => ({}),
//   });

  it("redirects / to /calendar-events", async () => {
    const memoryRouter = createMemoryRouter(router.routes, {
      initialEntries: ["/"],
    });

    render(
      <Provider store={mockStore}>
        <RouterProvider router={memoryRouter} />
      </Provider>
    );

    expect(
      await screen.findByText("Calendar Events Page")
    ).toBeInTheDocument();
  });
});
