// src/features/calendar-events/hooks/__tests__/useUpdateCalendarEvent.test.ts

import { renderHook, act } from "@testing-library/react";
import { useUpdateCalendarEvent } from "../useUpdateCalendarEvent";
import { useAppDispatch } from "../../../../redux/store";
import { useAppSelector } from "../../../../redux/selectors";
import { useNavigate } from "react-router-dom";

jest.mock("../../../../redux/store");
jest.mock("../../../../redux/selectors");
jest.mock("react-router-dom");

describe("useUpdateCalendarEvent", () => {
  const mockDispatch = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it("updates status", () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      _id: "1",
      title: "Test",
    });

    const { result } = renderHook(() =>
      useUpdateCalendarEvent({
        dateValue: "2026",
        timeValue: "10:00",
      })
    );

    act(() => {
      result.current.updateStatus(true);
    });

    expect(mockDispatch).toHaveBeenCalled();
  });

  it("deletes event and navigates", () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      _id: "1",
    });

    const { result } = renderHook(() =>
      useUpdateCalendarEvent({
        dateValue: "2026",
        timeValue: "10:00",
      })
    );

    act(() => {
      result.current.deleteEvent();
    });

    expect(mockNavigate).toHaveBeenCalledWith(
      "/calendar-events"
    );
  });
});
