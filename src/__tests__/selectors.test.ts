// src/__tests__/selectors.test.ts

import { RootState } from "../redux/store";
import * as selectors from "../redux/selectors";

describe("Selectors", () => {
  const mockState = {
    events: [
      { id: 1, title: "Alpha" },
      { id: 2, title: "Beta" }
    ],
    searchTerm: ""
  } as unknown as RootState;

  it("selects events", () => {
    const result = selectors.selectEvents(mockState);
    expect(result.length).toBe(2);
  });

  it("filters events by search term", () => {
    const stateWithSearch = {
      ...mockState,
      searchTerm: "Alpha"
    } as RootState;

    const result = selectors.selectFilteredEvents(stateWithSearch);
    expect(result.length).toBe(1);
  });
});
