import { takeEvery, call, put } from "redux-saga/effects";
import CalendarEventDataService from "../services/calendarEvent.service.ts";
import { actionTypes } from "../constants/action.types.ts";
import { ICalendarEvent } from "../actions";
import { AxiosError, AxiosResponse } from "axios";

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

interface IAction {
  type: string;
  payload: {
    id: string;
    [key: string]: any;
  }
}

export default function* watcherSaga() {
  yield takeEvery(actionTypes.GET_CALENDAR_EVENTS, getCalendarEventsWorkerSaga);
  yield takeEvery(actionTypes.DELETE_CALENDAR_EVENTS, deleteCalendarEventsWorkerSaga);
  yield takeEvery(actionTypes.FIND_BY_TITLE, findByTitleWorkerSaga);
  yield takeEvery(actionTypes.UPDATE_CALENDAR_EVENT, updateCalendarEventWorkerSaga);
  yield takeEvery(actionTypes.DELETE_CALENDAR_EVENT, deleteCalendarEventWorkerSaga);
  yield takeEvery(actionTypes.ADD_CALENDAR_EVENT, addCalendarEventWorkerSaga);
}

export function* getCalendarEventsWorkerSaga() {
  try {
    yield put({ type: actionTypes.IS_FETCHING });
    const payload: Array<ICalendarEvent> = yield call(getCalendarEvents);
    yield put({ type: actionTypes.GET_CALENDAR_EVENTS_SUCCESSFUL, payload });
  } catch (e) {
    yield put({ type: actionTypes.API_ERRORED, payload: e });
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

export function* deleteCalendarEventsWorkerSaga() {
  try {
    yield put({ type: actionTypes.IS_DELETING_ALL });
    yield call(deleteCalendarEvents);
    let ary: Array<ICalendarEvent> = [];
    yield put({ type: actionTypes.DELETE_CALENDAR_EVENTS_SUCCESSFUL, ary });
  } catch (e) {
    yield put({ type: actionTypes.API_ERRORED, payload: e });
  }
}

interface IFindByTitle {
  type: string;
  payload: string;
}

export function* findByTitleWorkerSaga(action: IFindByTitle) {
  try {
    yield put({ type: actionTypes.IS_FINDING });
    const payload: ICalendarEvent = yield call(findByTitle, action.payload);
    // const payload: CalendarEvent = yield call(findByTitle, action.payload.title);
    yield put({ type: actionTypes.FIND_BY_TITLE_SUCCESSFUL, payload });
    yield put({ type: actionTypes.SET_CURRENT_CALENDAR_EVENT, payload: null });
    yield put({ type: actionTypes.SET_CURRENT_INDEX, payload: -1 });
  } catch (e) {
    yield put({ type: actionTypes.API_ERRORED, payload: e });
  }
}

export function* updateCalendarEventWorkerSaga(action: IAction) {
  try {
    yield put({ type: actionTypes.IS_UPDATING });
    yield call(updateCalendarEvent, action.payload as ICalendarEvent);
    const payload = action.payload;
    yield put({ type: actionTypes.UPDATE_CALENDAR_EVENT_SUCCESSFUL, payload });
    // let calendarEvent = action.payload.calendarEvent;
    let calendarEvent = action.payload;
    yield put({ type: actionTypes.SET_CURRENT_CALENDAR_EVENT, payload: calendarEvent });
    const message = "The calendar event was updated successfully!";
    yield put({ type: actionTypes.SET_MESSAGE, payload: message });
  } catch (e) {
    yield put({ type: actionTypes.API_ERRORED, payload: e });
  }
}

interface IDeleteCalendarEvent {
  type: string;
  payload: string;
}

export function* deleteCalendarEventWorkerSaga(action: IDeleteCalendarEvent) {
  try {
    yield put({ type: actionTypes.IS_DELETING });
    yield call(deleteCalendarEvent, action.payload);
    const payload = action.payload;
    yield put({ type: actionTypes.DELETE_CALENDAR_EVENT_SUCCESSFUL, payload });
    const message = "The calendar event was deleted successfully!";
    yield put({ type: actionTypes.SET_MESSAGE, payload: message });
    yield put({ type: actionTypes.SET_CURRENT_CALENDAR_EVENT, payload: null });
    yield put({ type: actionTypes.SET_CURRENT_INDEX, payload: -1 });
    // yield put(push('/todos'));
  } catch (e) {
    yield put({ type: actionTypes.API_ERRORED, payload: e });
  }
}

export function* addCalendarEventWorkerSaga(action: IAction) {
  try {
    yield put({ type: actionTypes.IS_ADDING });
    const payload: ICalendarEvent = yield call(addCalendarEvent, action.payload as ICalendarEvent);
    yield put({ type: actionTypes.ADD_CALENDAR_EVENT_SUCCESSFUL, payload });
    const message = "The calendar event was added successfully!";
    yield put({ type: actionTypes.SET_MESSAGE, payload: message });
    yield put({ type: actionTypes.SET_SUBMITTED, payload: true });
    yield put({ type: actionTypes.SET_CALENDAR_EVENT_TO_ADD, payload: null });
  } catch (e) {
    yield put({ type: actionTypes.API_ERRORED, payload: e });
  }
}

const getCalendarEvents = () => {
  const res = CalendarEventDataService.getCalendarEvents();
  if (!res) {
    return [];
  }
  return res
    .then((response: AxiosResponse<any, any>) => response.data as ICalendarEvent[])
    .catch((e: AxiosError<unknown | any>) => console.log(e));
};

// const getCalendarEvent = (id) => {
//   return CalendarEventDataService.getCalendarEvent(id)
//     .then((response) => response.data)
//     .catch((e) => console.log(e));
// };

const addCalendarEvent = (data: ICalendarEvent) => {
  const res = CalendarEventDataService.addCalendarEvent(data);
  if (!res) {
    return [];
  }
  return res
    .then((response: AxiosResponse<any, any>) => response.data as ICalendarEvent)
    .catch((e: AxiosError<unknown | any>) => console.log(e));
};

const updateCalendarEvent = (payload: ICalendarEvent) => {
  // const res = CalendarEventDataService.updateCalendarEvent(payload.id, payload.calendarEvent)
  const res = CalendarEventDataService.updateCalendarEvent(payload);
  if (!res) {
    return [];
  }
  return res
    .then((response: AxiosResponse<any, any>) => response.data)
    .catch((e: AxiosError<unknown | any>) => console.log(e));
};

const deleteCalendarEvent = (id: string) => {
  const res = CalendarEventDataService.deleteCalendarEvent(id);
  if (!res) {
    return [];
  }
  return res
    .then((response: AxiosResponse<any, any>) => response.data)
    .catch((e: AxiosError<unknown | any>) => console.log(e));
};

const deleteCalendarEvents = () => {
  const res = CalendarEventDataService.deleteCalendarEvents();
  if (!res) {
    return [];
  }
  return res
    .then((response: AxiosResponse<any, any>) => response.data)
    .catch((e: AxiosError<unknown | any>) => console.log(e));
};

const findByTitle = (title: string) => {
  const res = CalendarEventDataService.findByTitle(title);
  if (!res) {
    return [];
  }
  return res  
    .then((response: AxiosResponse<any, any>) => response.data)
    .catch((e: AxiosError<unknown | any>) => console.log(e));
};
