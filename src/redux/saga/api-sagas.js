import { takeEvery, call, put } from "redux-saga/effects";
import CalendarEventDataService from "../services/calendarEvent.service.ts";
import {
  SET_CURRENT_CALENDAR_EVENT,
  FIND_BY_TITLE,
  SET_CURRENT_INDEX,
  SET_MESSAGE,
  SET_SUBMITTED,
  GET_CALENDAR_EVENTS_SUCCESSFUL,
  SET_CALENDAR_EVENT_TO_ADD,
  GET_CALENDAR_EVENTS,
  ADD_CALENDAR_EVENT,
  UPDATE_CALENDAR_EVENT,
  DELETE_CALENDAR_EVENT,
  DELETE_CALENDAR_EVENTS,
  DELETE_CALENDAR_EVENTS_SUCCESSFUL,
  API_ERRORED,
  UPDATE_CALENDAR_EVENT_SUCCESSFUL,
  DELETE_CALENDAR_EVENT_SUCCESSFUL,
  ADD_CALENDAR_EVENT_SUCCESSFUL,
  FIND_BY_TITLE_SUCCESSFUL,
  IS_FETCHING,
  IS_DELETING_ALL,
  IS_FINDING,
  IS_UPDATING,
  IS_DELETING,
  IS_ADDING,
} from "../constants/action.types";

/*
redux-saga is a library that aims to make application side effects (i.e. asynchronous things like data
fetching and impure things like accessing the browser cache) easier to manage, more efficient to
execute, simple to test, and better at handling failures.

Generators can pause and restart — be exited and re-entered — and actually remember the context/state
of the function over time.

Each yield in a generator basically represents an asynchronous step in a more synchronous/sequential
process — somewhat like await in an async function.

Basic Flow:
- a watcherSaga is a saga that watches for an action to be dispatched to the Store, triggering a
  workerSaga.
- takeLatest is a helper function provided by redux-saga that will trigger a new workerSaga when
  it sees an GET_CALENDAR_EVENTS, while cancelling any previously triggered workerSaga still in process.
- getCalendarEvents simply uses axios to request the calendar event list from the calendar events API and returns a Promise
  for the response.
- workerSaga attempts to getCalendarEvents, using another redux-saga helper function call, and stores the
  result (a resolved or failed Promise) in a response variable.
- If getCalendarEvents was a success, we extract the calendar event list from the response and dispatch an
  GET_CALENDAR_EVENTS_SUCCESS action with calendar event list in the payload to the Store, using ANOTHER redux-saga
  helper function put.
- If there was an error with getCalendarEvents, we let the Store know about it by dispatching an
  API_ERRORED action with the error.
*/

export default function* watcherSaga() {
  yield takeEvery(GET_CALENDAR_EVENTS, getCalendarEventsWorkerSaga);
  yield takeEvery(DELETE_CALENDAR_EVENTS, deleteCalendarEventsWorkerSaga);
  yield takeEvery(FIND_BY_TITLE, findByTitleWorkerSaga);
  yield takeEvery(UPDATE_CALENDAR_EVENT, updateCalendarEventWorkerSaga);
  yield takeEvery(DELETE_CALENDAR_EVENT, deleteCalendarEventWorkerSaga);
  yield takeEvery(ADD_CALENDAR_EVENT, addCalendarEventWorkerSaga);
}

export function* getCalendarEventsWorkerSaga() {
  try {
    yield put({ type: IS_FETCHING });
    const payload = yield call(getCalendarEvents);
    yield put({ type: GET_CALENDAR_EVENTS_SUCCESSFUL, payload });
  } catch (e) {
    yield put({ type: API_ERRORED, payload: e });
  }
}

// export function* getCalendarEventWorkerSaga(action) {
//   try {
//     yield put({ type: IS_FETCHING });
//     const payload = yield call(getCalendarEvent, action.payload.id);
//     yield put({ type: GET_CALENDAR_EVENT_SUCCESSFUL, payload });
//   } catch (e) {
//     yield put({ type: API_ERRORED, payload: e });
//   }
// }

export function* deleteCalendarEventsWorkerSaga(action) {
  try {
    yield put({ type: IS_DELETING_ALL });
    yield call(deleteCalendarEvents);
    let ary = [];
    yield put({ type: DELETE_CALENDAR_EVENTS_SUCCESSFUL, ary });
  } catch (e) {
    yield put({ type: API_ERRORED, payload: e });
  }
}

export function* findByTitleWorkerSaga(action) {
  try {
    yield put({ type: IS_FINDING });
    const payload = yield call(findByTitle, action.payload);
    yield put({ type: FIND_BY_TITLE_SUCCESSFUL, payload });

    yield put({ type: SET_CURRENT_CALENDAR_EVENT, payload: null });
    yield put({ type: SET_CURRENT_INDEX, payload: -1 });
  } catch (e) {
    yield put({ type: API_ERRORED, payload: e });
  }
}

export function* updateCalendarEventWorkerSaga(action) {
  try {
    yield put({ type: IS_UPDATING });
    yield call(updateCalendarEvent, action.payload);
    const payload = action.payload;
    yield put({ type: UPDATE_CALENDAR_EVENT_SUCCESSFUL, payload });

    let calendarEvent = action.payload.calendarEvent;
    yield put({ type: SET_CURRENT_CALENDAR_EVENT, payload: calendarEvent });

    const message = "The calendarEvent was updated successfully!";
    yield put({ type: SET_MESSAGE, payload: message });
  } catch (e) {
    yield put({ type: API_ERRORED, payload: e });
  }
}

export function* deleteCalendarEventWorkerSaga(action) {
  try {
    yield put({ type: IS_DELETING });
    yield call(deleteCalendarEvent, action.payload.id);
    const payload = action.payload;
    yield put({ type: DELETE_CALENDAR_EVENT_SUCCESSFUL, payload });

    const message = "The calendar event was deleted successfully!";
    yield put({ type: SET_MESSAGE, payload: message });
    yield put({ type: SET_CURRENT_CALENDAR_EVENT, payload: null });
    yield put({ type: SET_CURRENT_INDEX, payload: -1 });
    // yield put(push('/todos'));
  } catch (e) {
    yield put({ type: API_ERRORED, payload: e });
  }
}

export function* addCalendarEventWorkerSaga(action) {
  try {
    yield put({ type: IS_ADDING });
    const payload = yield call(addCalendarEvent, action.payload);
    yield put({ type: ADD_CALENDAR_EVENT_SUCCESSFUL, payload });

    yield put({ type: SET_SUBMITTED, payload: true });
    yield put({ type: SET_CALENDAR_EVENT_TO_ADD, payload: null });
  } catch (e) {
    yield put({ type: API_ERRORED, payload: e });
  }
}

const getCalendarEvents = () => {
  return CalendarEventDataService.getCalendarEvents()
    .then((response) => response.data)
    .catch((e) => console.log(e));
};

// const getCalendarEvent = (id) => {
//   return CalendarEventDataService.getCalendarEvent(id)
//     .then((response) => response.data)
//     .catch((e) => console.log(e));
// };

const addCalendarEvent = (data) => {
  return CalendarEventDataService.addCalendarEvent(data)
    .then((response) => response.data)
    .catch((e) => console.log(e));
};

const updateCalendarEvent = (payload) => {
  return CalendarEventDataService.updateCalendarEvent(payload.id, payload.calendarEvent)
    .then((response) => response.data)
    .catch((e) => console.log(e));
};

const deleteCalendarEvent = (id) => {
  return CalendarEventDataService.deleteCalendarEvent(id)
    .then((response) => response.data)
    .catch((e) => console.log(e));
};

const deleteCalendarEvents = () => {
  return CalendarEventDataService.deleteCalendarEvents()
    .then((response) => response.data)
    .catch((e) => console.log(e));
};

const findByTitle = (title) => {
  return CalendarEventDataService.findByTitle(title)
    .then((response) => response.data)
    .catch((e) => console.log(e));
};
