// src/features/calendar-events/hooks/__tests__/useCalendarEventModal.test.ts

import { renderHook, act } from "@testing-library/react";
import { useCalendarEventModal } from "../useCalendarEventModal";
import { useAppDispatch } from "../../../../redux/store";

jest.mock("../../../../redux/store");

describe("useCalendarEventModal", () => {
  const mockDispatch = jest.fn();
  const mockSetShow = jest.fn();

  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });

  it("closes modal", () => {
    const { result } = renderHook(() =>
      useCalendarEventModal({ setShow: mockSetShow })
    );

    act(() => {
      result.current.handleClose();
    });

    expect(mockSetShow).toHaveBeenCalledWith(false);
  });

  it("dispatches addCalendarEvent", () => {
    const { result } = renderHook(() =>
      useCalendarEventModal({ setShow: mockSetShow })
    );

    act(() => {
      result.current.saveNewEvent();
    });

    expect(mockDispatch).toHaveBeenCalled();
  });
});
