import { actionTypes } from "../constants/action.types";
import { ICalendarEvent } from "../types";

/*
  Generic Action Helper
*/
export type Action<T extends string, P = undefined> = P extends undefined
  ? { type: T }
  : { type: T; payload: P };

/*
  Calendar Event Actions
*/

export const setCurrentCalendarEvent = (
  payload: ICalendarEvent | null
): Action<typeof actionTypes.SET_CURRENT_CALENDAR_EVENT, ICalendarEvent | null> => ({
  type: actionTypes.SET_CURRENT_CALENDAR_EVENT,
  payload,
});

export const setCalendarEventToAdd = (
  payload: ICalendarEvent | null
): Action<typeof actionTypes.SET_CALENDAR_EVENT_TO_ADD, ICalendarEvent | null> => ({
  type: actionTypes.SET_CALENDAR_EVENT_TO_ADD,
  payload,
});

export const findByTitle = (
  payload: string
): Action<typeof actionTypes.FIND_BY_TITLE, string> => ({
  type: actionTypes.FIND_BY_TITLE,
  payload,
});

export const setSearchTitle = (
  payload: string
): Action<typeof actionTypes.SET_SEARCH_TITLE, string> => ({
  type: actionTypes.SET_SEARCH_TITLE,
  payload,
});

export const setCurrentIndex = (
  payload: number
): Action<typeof actionTypes.SET_CURRENT_INDEX, number> => ({
  type: actionTypes.SET_CURRENT_INDEX,
  payload,
});

export const setMessage = (
  payload: string
): Action<typeof actionTypes.SET_MESSAGE, string> => ({
  type: actionTypes.SET_MESSAGE,
  payload,
});

export const setSubmitted = (
  payload: boolean
): Action<typeof actionTypes.SET_SUBMITTED, boolean> => ({
  type: actionTypes.SET_SUBMITTED,
  payload,
});

export const setIsFinding = (
  payload: boolean
): Action<typeof actionTypes.SET_IS_FINDING, boolean> => ({
  type: actionTypes.SET_IS_FINDING,
  payload,
});

export const setIsLoading = (
  payload: boolean
): Action<typeof actionTypes.SET_IS_LOADING, boolean> => ({
  type: actionTypes.SET_IS_LOADING,
  payload,
});

export const getCalendarEvents = (): Action<
  typeof actionTypes.GET_CALENDAR_EVENTS
> => ({
  type: actionTypes.GET_CALENDAR_EVENTS,
});

export const addCalendarEvent = (
  payload: ICalendarEvent
): Action<typeof actionTypes.ADD_CALENDAR_EVENT, ICalendarEvent> => ({
  type: actionTypes.ADD_CALENDAR_EVENT,
  payload,
});

export const updateCalendarEvent = (
  payload: ICalendarEvent
): Action<typeof actionTypes.UPDATE_CALENDAR_EVENT, ICalendarEvent> => ({
  type: actionTypes.UPDATE_CALENDAR_EVENT,
  payload,
});

export const deleteCalendarEvent = (
  payload: string
): Action<typeof actionTypes.DELETE_CALENDAR_EVENT, string> => ({
  type: actionTypes.DELETE_CALENDAR_EVENT,
  payload,
});

export const deleteCalendarEvents = (): Action<
  typeof actionTypes.DELETE_CALENDAR_EVENTS
> => ({
  type: actionTypes.DELETE_CALENDAR_EVENTS,
});

export const apiErrored = (
  payload: string
): Action<typeof actionTypes.API_ERRORED, string> => ({
  type: actionTypes.API_ERRORED,
  payload,
});
