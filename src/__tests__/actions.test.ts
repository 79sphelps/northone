// src/__tests__/actions.test.ts

import * as actions from "../redux/actions";

describe("Action Creators", () => {
  it("creates ADD_EVENT action", () => {
    const payload = { id: 1, title: "Test Event" };
    const action = actions.addCalendarEvent(payload);

    expect(action).toEqual({
      type: "ADD_EVENT",
      payload
    });
  });

  it("creates DELETE_EVENT action", () => {
    const action = actions.deleteCalendarEvent(1);

    expect(action).toEqual({
      type: "DELETE_EVENT",
      payload: 1
    });
  });
});
