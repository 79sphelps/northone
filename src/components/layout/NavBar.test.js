import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import * as reactRedux from "react-redux";
import App from "../../App";
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

test("renders all NavBar elements correctly on initial load", async () => {
  const { getByTestId } = render(<App />);

  await act(async () => {
    const navbarHomeLink = getByTestId("navbar-home-link-id");
    // expect(addTodoBtn).toBeDefined();
    expect(navbarHomeLink).toBeInTheDocument();

    // expect(navbarHomeLink).toHaveTextContent("Add Todo"); // expect(getByText('Add Todo')).toBeInTheDocument();

    const navbarCalendarEventsLink = getByTestId("navbar-calendar-events-link-id");
    expect(navbarCalendarEventsLink).toBeInTheDocument();
    expect(navbarCalendarEventsLink).toHaveTextContent("Calendar Events");

    const navbarAddCalendarEventLink= getByTestId("navbar-add-calendar-event-link-id");
    expect(navbarAddCalendarEventLink).toBeInTheDocument();
    expect(navbarAddCalendarEventLink).toHaveTextContent("Add");
  });
});
