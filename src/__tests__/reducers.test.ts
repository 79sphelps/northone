// src/__tests__/reducers.test.ts

import reducers from "../redux/reducers";
import { AnyAction } from "redux";

describe("Root Reducer", () => {
  it("returns initial state", () => {
    const state = reducers(undefined, {} as AnyAction);
    expect(state).toBeDefined();
  });

  it("handles ADD_EVENT action", () => {
    const initialState = reducers(undefined, {} as AnyAction);

    const action: AnyAction = {
      type: "ADD_EVENT",
      payload: { id: 1, title: "Test Event" }
    };

    const newState = reducers(initialState, action);

    expect(newState).not.toEqual(initialState);
  });

  it("handles DELETE_EVENT action", () => {
    const initialState = reducers(undefined, {} as AnyAction);

    const action: AnyAction = {
      type: "DELETE_EVENT",
      payload: 1
    };

    const newState = reducers(initialState, action);

    expect(newState).not.toBeUndefined();
  });
});
