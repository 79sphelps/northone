import { render, act } from "@testing-library/react";
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

test("renders all CalendarSearchBox elements correctly on initial load", async () => {
  const { getByTestId } = render(<App />);

  await act(async () => {
    const searchBoxElement = getByTestId("search-box-id");
    expect(searchBoxElement).toBeInTheDocument();

    const searchInputElement = getByTestId("search-input-id");
    expect(searchInputElement).toBeInTheDocument();
    expect(searchInputElement).toHaveAttribute(
      "placeholder",
      "Search by title"
    );

    const searchButton = getByTestId("search-btn-id");
    expect(searchButton).toBeInTheDocument();

    const searchCancelButton = getByTestId("search-cancel-btn-id");
    expect(searchCancelButton).toBeInTheDocument();
  });
});
