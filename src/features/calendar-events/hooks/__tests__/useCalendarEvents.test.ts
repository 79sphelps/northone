// src/features/calendar-events/hooks/__tests__/useCalendarEvents.test.ts

import { renderHook, act } from "@testing-library/react";
import { useCalendarEvents } from "../useCalendarEvents";
import { useAppDispatch } from "../../../../redux/store";
import { useAppSelector } from "../../../../redux/selectors";
import { useNavigate } from "react-router-dom";

jest.mock("../../../../redux/store");
jest.mock("../../../../redux/selectors");
jest.mock("react-router-dom");

describe("useCalendarEvents", () => {
  const mockDispatch = jest.fn();
  const mockNavigate = jest.fn();
  const mockSetShow = jest.fn();

  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as jest.Mock).mockReturnValue(0);
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it("opens modal on date select", () => {
    const { result } = renderHook(() =>
      useCalendarEvents({ setShow: mockSetShow })
    );

    act(() => {
      result.current.handleDateSelect();
    });

    expect(mockSetShow).toHaveBeenCalledWith(true);
  });

  it("navigates on event click", () => {
    const { result } = renderHook(() =>
      useCalendarEvents({ setShow: mockSetShow })
    );

    act(() => {
      result.current.handleEventClick({
        event: {
          id: "1",
          title: "Test",
          extendedProps: {
            description: "Desc",
            dueDate: "2026",
            start2: "10:00",
          },
        },
      } as any);
    });

    expect(mockNavigate).toHaveBeenCalledWith(
      "/calendar-events/1"
    );
  });
});
