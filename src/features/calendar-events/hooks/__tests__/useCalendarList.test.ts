// src/features/calendar-events/hooks/__tests__/useCalendarList.test.ts

import { renderHook, act } from "@testing-library/react";
import { useCalendarList } from "../useCalendarList";
import { useAppDispatch } from "../../../../redux/store";

jest.mock("../../../../redux/store");

describe("useCalendarList", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });

  it("dispatches retrieveCalendarEvents", () => {
    const { result } = renderHook(() => useCalendarList());

    act(() => {
      result.current.retrieveCalendarEvents();
    });

    expect(mockDispatch).toHaveBeenCalled();
  });
});
