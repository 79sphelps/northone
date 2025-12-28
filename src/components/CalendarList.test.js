import { render, act, screen, within } from "@testing-library/react";
import * as reactRedux from "react-redux";
import App from "../App";
// import NavBar from "./NavBar";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

const useDispatchMock = reactRedux.useDispatch;

beforeEach(() => {
  useDispatchMock.mockImplementation(() => () => {});
  // useSelectorMock.mockImplementation(selector => selector(mockStore));
});

afterEach(() => {
  useDispatchMock.mockClear();
  // useSelectorMock.mockClear();
});

test("renders all CalendarList component elements correctly on initial load", async () => {
  const { getByTestId } = render(<App />);

  await act(async () => {
    // const calendarEventsLoadingElement = getByTestId("calendar-list-events-loading-id");
    const calendarEventsLoadingElement = getByTestId("calendar-list-id");
    expect(calendarEventsLoadingElement).toBeInTheDocument();

    const calendarEventsListHeaderElement = getByTestId("calendar-list-header-id");
    expect(calendarEventsListHeaderElement).toBeInTheDocument();
    expect(calendarEventsListHeaderElement).toHaveTextContent("Calendar Events");

    const calendarEventsListElement = screen.getByRole("list", {
        name: /calendar events/i,
    })
    expect(calendarEventsListElement).toBeInTheDocument();

    // const { getAllByRole } = within(list)
    // const items = getAllByRole("listitem")
    // expect(items.length).toBe(5)
  });
});
