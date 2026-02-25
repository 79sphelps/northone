// src/__tests__/sagas.test.ts

import { runSaga } from "redux-saga";
import * as api from "../redux/api";
import { fetchEventsSaga } from "../redux/saga/api-sagas";

describe("fetchEventsSaga", () => {
  it("dispatches success action on success", async () => {
    const dispatched: any[] = [];

    jest.spyOn(api, "fetchEvents").mockResolvedValue([
      { id: 1, title: "Test" }
    ]);

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action)
      },
      fetchEventsSaga
    ).toPromise();

    expect(dispatched.length).toBeGreaterThan(0);
  });
});
