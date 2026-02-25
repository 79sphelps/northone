// import { render, screen } from "@testing-library/react";
// import { MemoryRouter } from "react-router-dom";
// import { Provider } from "react-redux";
// import store from "../redux/store";
// import AppLayout from "../app/AppLayout";
// import React from "react";

// jest.mock("../components/layout/NavBar", () => ({
//   __esModule: true,
//   default: ({ initializeCalendarEventToAdd }: any) => (
//     <button onClick={initializeCalendarEventToAdd}>
//       Mock NavBar
//     </button>
//   ),
// }));

// jest.mock("../components/feedback/Loader", () => ({
//   __esModule: true,
//   default: () => <div>Loading...</div>,
// }));

// describe("AppLayout", () => {
//   it("renders NavBar", () => {
//     render(
//       <Provider store={store}>
//         <MemoryRouter>
//           <AppLayout />
//         </MemoryRouter>
//       </Provider>
//     );

//     expect(screen.getByText(/mock navbar/i)).toBeInTheDocument();
//   });

//   it("dispatches reset actions when initialize function is called", () => {
//     render(
//       <Provider store={store}>
//         <MemoryRouter>
//           <AppLayout />
//         </MemoryRouter>
//       </Provider>
//     );

//     const button = screen.getByText(/mock navbar/i);
//     button.click();

//     const state = store.getState();

//     expect(state).toBeDefined();
//   });
// });


// src/app/__tests__/AppLayout.test.tsx

import React from "react";
import { render, screen } from "@testing-library/react";
import AppLayout from "../AppLayout";
import { MemoryRouter } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import * as actions from "../../redux/actions";

jest.mock("../../components/layout/NavBar", () => ({
  __esModule: true,
  default: ({ initializeCalendarEventToAdd }: any) => (
    <button onClick={initializeCalendarEventToAdd}>
      MockNavBar
    </button>
  ),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Outlet: () => <div>MockOutlet</div>,
}));

jest.mock("../../redux/store", () => ({
  useAppDispatch: jest.fn(),
}));

describe("AppLayout", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });

  it("renders NavBar and Outlet", () => {
    render(
      <MemoryRouter>
        <AppLayout />
      </MemoryRouter>
    );

    expect(screen.getByText("MockNavBar")).toBeInTheDocument();
    expect(screen.getByText("MockOutlet")).toBeInTheDocument();
  });

  it("dispatches reset actions when initializeCalendarEventToAdd is triggered", () => {
    render(
      <MemoryRouter>
        <AppLayout />
      </MemoryRouter>
    );

    screen.getByText("MockNavBar").click();

    expect(mockDispatch).toHaveBeenCalledWith(actions.setSubmitted(false));
    expect(mockDispatch).toHaveBeenCalledWith(actions.setMessage(""));
  });
});


