import {
  SET_CURRENT_CALENDAR_EVENT,
  GET_CURRENT_CALENDAR_EVENT,
  SET_CALENDAR_EVENT_TO_ADD,
  GET_CALENDAR_EVENT_TO_ADD,
  FIND_BY_TITLE,
  FIND_BY_TITLE_SUCCESSFUL,
  SET_SEARCH_TITLE,
  GET_SEARCH_TITLE,
  SET_CURRENT_INDEX,
  GET_CURRENT_INDEX,
  SET_MESSAGE,
  GET_MESSAGE,
  SET_SUBMITTED,
  GET_SUBMITTED,
  SET_CALENDAR_EVENTS,
  GET_CALENDAR_EVENTS,
  GET_CALENDAR_EVENTS_SUCCESSFUL,
  GET_CALENDAR_EVENT,
  ADD_CALENDAR_EVENT,
  ADD_CALENDAR_EVENT_SUCCESSFUL,
  UPDATE_CALENDAR_EVENT,
  UPDATE_CALENDAR_EVENT_SUCCESSFUL,
  DELETE_CALENDAR_EVENT,
  DELETE_CALENDAR_EVENT_SUCCESSFUL,
  DELETE_CALENDAR_EVENTS,
  DELETE_CALENDAR_EVENTS_SUCCESSFUL,
  API_ERRORED,
} from "../constants/action.types";

const setCurrentCalendarEvent = (payload) => {
  return { type: SET_CURRENT_CALENDAR_EVENT, payload };
};

const getCurrentCalendarEvent = (payload) => {
  return { type: GET_CURRENT_CALENDAR_EVENT };
};

const setCalendarEventToAdd = (payload) => {
  return { type: SET_CALENDAR_EVENT_TO_ADD, payload };
};

const getCalendarEventToAdd = (payload) => {
  return { type: GET_CALENDAR_EVENT_TO_ADD };
};

const findByTitle = (payload) => {
  return { type: FIND_BY_TITLE, payload };
};

const findByTitleSuccessful = (payload) => {
  return { type: FIND_BY_TITLE_SUCCESSFUL, payload };
};

const setSearchTitle = (payload) => {
  return { type: SET_SEARCH_TITLE, payload };
};

const getSearchTitle = (payload) => {
  return { type: GET_SEARCH_TITLE };
};

const setCurrentIndex = (payload) => {
  return { type: SET_CURRENT_INDEX, payload };
};

const getCurrentIndex = (payload) => {
  return { type: GET_CURRENT_INDEX };
};

const setMessage = (payload) => {
  return { type: SET_MESSAGE, payload };
};

const getMessage = (payload) => {
  return { type: GET_MESSAGE };
};

const setSubmitted = (payload) => {
  return { type: SET_SUBMITTED, payload };
};

const getSubmitted = (payload) => {
  return { type: GET_SUBMITTED };
};

const setCalendarEvents = (payload) => {
  return { type: SET_CALENDAR_EVENTS, payload };
};

const getCalendarEvents = (payload) => {
  return { type: GET_CALENDAR_EVENTS };
};

const getCalendarEventsSuccessful = (payload) => {
  return { type: GET_CALENDAR_EVENTS_SUCCESSFUL };
};

const getCalendarEvent = (payload) => {
  return { type: GET_CALENDAR_EVENT, payload };
};

const getCalendarEventSuccessful = (payload) => {
  return { type: GET_CALENDAR_EVENT_SUCCESSFUL };
};

const addCalendarEvent = (payload) => {
  return { type: ADD_CALENDAR_EVENT, payload };
};

const addCalendarEventSuccessful = (payload) => {
  return { type: ADD_CALENDAR_EVENT_SUCCESSFUL, payload };
};

const updateCalendarEvent = (payload) => {
  return { type: UPDATE_CALENDAR_EVENT, payload };
};

const updateCalendarEventSuccessful = (payload) => {
  return { type: UPDATE_CALENDAR_EVENT_SUCCESSFUL, payload };
};

const deleteCalendarEvent = (payload) => {
  return { type: DELETE_CALENDAR_EVENT, payload };
};

const deleteCalendarEventSuccessful = (payload) => {
  return { type: DELETE_CALENDAR_EVENT_SUCCESSFUL, payload };
};

const deleteCalendarEvents = (payload) => {
  return { type: DELETE_CALENDAR_EVENTS };
};

const deleteCalendarEventsSuccessful = (payload) => {
  return { type: DELETE_CALENDAR_EVENTS_SUCCESSFUL, payload };
};

const apiErrored = (payload) => {
  return { type: API_ERRORED, payload };
};

export {
  setCurrentCalendarEvent,
  getCurrentCalendarEvent,
  setCalendarEventToAdd,
  getCalendarEventToAdd,
  findByTitle,
  setSearchTitle,
  getSearchTitle,
  setCurrentIndex,
  getCurrentIndex,
  setMessage,
  getMessage,
  setSubmitted,
  getSubmitted,
  setCalendarEvents,
  getCalendarEvents,
  getCalendarEventsSuccessful,
  deleteCalendarEventsSuccessful,
  updateCalendarEventSuccessful,
  deleteCalendarEventSuccessful,
  addCalendarEventSuccessful,
  findByTitleSuccessful,
  getCalendarEvent,
  addCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
  deleteCalendarEvents,
  apiErrored,
};