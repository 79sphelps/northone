// src/features/calendar-events/hooks/__tests__/useCalendarEventData.test.ts

import { renderHook } from "@testing-library/react";
import { useCalendarEventData } from "../useCalendarEventData";
import { useAppDispatch } from "../../../../redux/store";

jest.mock("../../../../redux/store");

describe("useCalendarEventData", () => {
  it("dispatches getCalendarEvents on mount", () => {
    const mockDispatch = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

    renderHook(() => useCalendarEventData());

    expect(mockDispatch).toHaveBeenCalled();
  });
});
