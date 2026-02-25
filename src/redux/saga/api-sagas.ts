import { takeEvery, call, put } from "redux-saga/effects";
import { actionTypes } from "../constants/action.types";
import { CalendarEventService } from "../services/calendarEvent.service";
import { ICalendarEvent } from "../types";
import { ApiError } from "../services/api";

interface IAction<T = any> {
  type: string;
  payload: T;
}

export default function* watcherSaga() {
  yield takeEvery(actionTypes.GET_CALENDAR_EVENTS, getCalendarEventsWorker);
  yield takeEvery(actionTypes.DELETE_CALENDAR_EVENTS, deleteCalendarEventsWorker);
  yield takeEvery(actionTypes.FIND_BY_TITLE, findByTitleWorker);
  yield takeEvery(actionTypes.UPDATE_CALENDAR_EVENT, updateCalendarEventWorker);
  yield takeEvery(actionTypes.DELETE_CALENDAR_EVENT, deleteCalendarEventWorker);
  yield takeEvery(actionTypes.ADD_CALENDAR_EVENT, addCalendarEventWorker);
}

function* getCalendarEventsWorker() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });

    const events: ICalendarEvent[] = yield call(
      CalendarEventService.getCalendarEvents
    );

    yield put({
      type: actionTypes.GET_CALENDAR_EVENTS_SUCCESSFUL,
      payload: events,
    });
  } catch (error) {
    const err = error as ApiError;
    yield put({ type: actionTypes.API_ERRORED, payload: err.message });
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

function* deleteCalendarEventsWorker() {
  try {
    yield put({ type: actionTypes.IS_DELETING_ALL });

    yield call(CalendarEventService.deleteCalendarEvents);

    yield put({
      type: actionTypes.DELETE_CALENDAR_EVENTS_SUCCESSFUL,
      payload: [],
    });
  } catch (error) {
    const err = error as ApiError;
    yield put({ type: actionTypes.API_ERRORED, payload: err.message });
  }
}

function* findByTitleWorker(action: IAction<string>) {
  try {
    yield put({ type: actionTypes.IS_FINDING });

    const events: ICalendarEvent[] = yield call(
      CalendarEventService.findByTitle,
      action.payload
    );

    yield put({
      type: actionTypes.FIND_BY_TITLE_SUCCESSFUL,
      payload: events,
    });

    yield put({ type: actionTypes.SET_CURRENT_CALENDAR_EVENT, payload: null });
    yield put({ type: actionTypes.SET_CURRENT_INDEX, payload: -1 });
  } catch (error) {
    const err = error as ApiError;
    yield put({ type: actionTypes.API_ERRORED, payload: err.message });
  }
}

function* updateCalendarEventWorker(action: IAction<ICalendarEvent>) {
  try {
    yield put({ type: actionTypes.IS_UPDATING });

    const updated: ICalendarEvent = yield call(
      CalendarEventService.updateCalendarEvent,
      action.payload
    );

    yield put({
      type: actionTypes.UPDATE_CALENDAR_EVENT_SUCCESSFUL,
      payload: updated,
    });

    yield put({
      type: actionTypes.SET_CURRENT_CALENDAR_EVENT,
      payload: updated,
    });

    yield put({
      type: actionTypes.SET_MESSAGE,
      payload: "The calendar event was updated successfully!",
    });
  } catch (error) {
    const err = error as ApiError;
    yield put({ type: actionTypes.API_ERRORED, payload: err.message });
  }
}

function* deleteCalendarEventWorker(action: IAction<string>) {
  try {
    yield put({ type: actionTypes.IS_DELETING });

    yield call(CalendarEventService.deleteCalendarEvent, action.payload);

    yield put({
      type: actionTypes.DELETE_CALENDAR_EVENT_SUCCESSFUL,
      payload: action.payload,
    });

    yield put({
      type: actionTypes.SET_MESSAGE,
      payload: "The calendar event was deleted successfully!",
    });

    yield put({ type: actionTypes.SET_CURRENT_CALENDAR_EVENT, payload: null });
    yield put({ type: actionTypes.SET_CURRENT_INDEX, payload: -1 });
  } catch (error) {
    const err = error as ApiError;
    yield put({ type: actionTypes.API_ERRORED, payload: err.message });
  }
}

function* addCalendarEventWorker(action: IAction<ICalendarEvent>) {
  try {
    yield put({ type: actionTypes.IS_ADDING });

    const created: ICalendarEvent = yield call(
      CalendarEventService.addCalendarEvent,
      action.payload
    );

    yield put({
      type: actionTypes.ADD_CALENDAR_EVENT_SUCCESSFUL,
      payload: created,
    });

    yield put({
      type: actionTypes.SET_MESSAGE,
      payload: "The calendar event was added successfully!",
    });

    yield put({ type: actionTypes.SET_SUBMITTED, payload: true });
    yield put({ type: actionTypes.SET_CALENDAR_EVENT_TO_ADD, payload: null });
  } catch (error) {
    const err = error as ApiError;
    yield put({ type: actionTypes.API_ERRORED, payload: err.message });
  }
}
