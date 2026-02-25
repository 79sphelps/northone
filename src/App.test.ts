// App.test.tsx

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import store from "./redux/store";
import App from "./App";

HTMLCanvasElement.prototype.getContext = jest.fn();

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        {ui}
      </MemoryRouter>
    </Provider>
  );
};

describe("App Routing & Navigation", () => {
  it('renders link to "Calendar Events"', () => {
    renderWithProviders(<App />);

    expect(
      screen.getByRole("link", { name: /calendar events/i })
    ).toHaveAttribute("href", "/");
  });

  it('renders link to "Add"', () => {
    renderWithProviders(<App />);

    expect(
      screen.getByRole("link", { name: /add/i })
    ).toHaveAttribute("href", "/add");
  });

  it('renders search input with correct placeholder', () => {
    renderWithProviders(<App />);

    expect(
      screen.getByPlaceholderText(/search by title/i)
    ).toBeInTheDocument();
  });

  it("navigates to Add page when clicking Add", async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);

    expect(
      screen.getByText(/click on a calendar item to show detailed info/i)
    ).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: /add/i }));

    expect(
      screen.getByText(/add a new calendar event/i)
    ).toBeInTheDocument();
  });
});
