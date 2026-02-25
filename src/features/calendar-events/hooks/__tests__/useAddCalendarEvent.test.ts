// src/features/calendar-events/hooks/__tests__/useAddCalendarEvent.test.ts

import { renderHook, act } from "@testing-library/react";
import { useAddCalendarEvent } from "../useAddCalendarEvent";
import { useAppDispatch } from "../../../../redux/store";
import { useAppSelector } from "../../../../redux/selectors";
import { useNavigate } from "react-router-dom";

jest.mock("../../../../redux/store");
jest.mock("../../../../redux/selectors");
jest.mock("react-router-dom");

describe("useAddCalendarEvent", () => {
  const mockDispatch = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as jest.Mock).mockReturnValue(null);
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    localStorage.clear();
    jest.clearAllMocks();
  });

  it("dispatches addCalendarEvent and navigates", () => {
    const { result } = renderHook(() =>
      useAddCalendarEvent({
        dateValue: new Date("2026-02-24"),
        timeValue: "10:00",
      })
    );

    act(() => {
      result.current.saveCalendarEvent({
        title: "Test",
        description: "Desc",
      });
    });

    expect(mockDispatch).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/");
    expect(result.current.submitted).toBe(true);
  });

  it("sets error if invalid date", () => {
    const { result } = renderHook(() =>
      useAddCalendarEvent({
        dateValue: new Date("invalid"),
        timeValue: "",
      })
    );

    act(() => {
      result.current.saveCalendarEvent({
        title: "Test",
        description: "Desc",
      });
    });

    expect(result.current.message).toBe(
      "Please provide a valid date."
    );
  });
});
