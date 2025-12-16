import { actionTypes } from "../constants/action.types";

export interface ICalendarEvent {
    id: string | null | undefined,
    title: string | null | undefined,
    description: string | null | undefined,
    status: boolean | null | undefined,
    dueDate: string | null | undefined,
    start: string | null | undefined,
    _id?: string | null,
    createdAt?: string | null,
    updatedAt?: string | null,
    start2?: string | null,
    date?: string | null,
    startTime?: string | null,
};

export interface ISetCurrentCalendarEvent {
  type: typeof actionTypes.SET_CURRENT_CALENDAR_EVENT;
  payload: ICalendarEvent | null;
}

const setCurrentCalendarEvent = (payload: ISetCurrentCalendarEvent['payload']) => {
  return { type: actionTypes.SET_CURRENT_CALENDAR_EVENT, payload };
};

const getCurrentCalendarEvent = () => {
  return { type: actionTypes.GET_CURRENT_CALENDAR_EVENT };
};

export interface ISetCalendarEventToAdd {
  type: typeof actionTypes.SET_CALENDAR_EVENT_TO_ADD;
  payload: ICalendarEvent;
}

const setCalendarEventToAdd = (payload: ISetCalendarEventToAdd['payload']) => {
  return { type: actionTypes.SET_CALENDAR_EVENT_TO_ADD, payload };
};

const getCalendarEventToAdd = () => {
  return { type: actionTypes.GET_CALENDAR_EVENT_TO_ADD };
};

export interface IFindByTitle {
  type: typeof actionTypes.FIND_BY_TITLE;
  payload: string;
}

const findByTitle = (payload: IFindByTitle['payload']) => {
  return { type: actionTypes.FIND_BY_TITLE, payload };
};

export interface IFindByTitleSuccessful {
  type: typeof actionTypes.FIND_BY_TITLE_SUCCESSFUL;
  payload: string;
}

const findByTitleSuccessful = (payload: IFindByTitleSuccessful['payload']) => {
  return { type: actionTypes.FIND_BY_TITLE_SUCCESSFUL, payload };
};

export interface ISetSearchTitle {
  type: typeof actionTypes.SET_SEARCH_TITLE;
  payload: string;
};

const setSearchTitle = (payload: ISetSearchTitle['payload']) => {
  return { type: actionTypes.SET_SEARCH_TITLE, payload };
};

const getSearchTitle = () => {
  return { type: actionTypes.GET_SEARCH_TITLE };
};

export interface ISetCurrentIndex {
  type: typeof actionTypes.SET_CURRENT_INDEX;
  payload: Number;
};

const setCurrentIndex = (payload: ISetCurrentIndex['payload']) => {
  return { type: actionTypes.SET_CURRENT_INDEX, payload };
};

const getCurrentIndex = () => {
  return { type: actionTypes.GET_CURRENT_INDEX };
};

export interface ISetMessage {
  type: typeof actionTypes.SET_MESSAGE;
  payload: string;
};

const setMessage = (payload: ISetMessage['payload']) => {
  return { type: actionTypes.SET_MESSAGE, payload };
};

const getMessage = () => {
  return { type: actionTypes.GET_MESSAGE };
};

export interface ISetSubmitted {
  type: typeof actionTypes.SET_SUBMITTED;
  payload: boolean;
};

const setSubmitted = (payload: ISetSubmitted['payload']) => {
  return { type: actionTypes.SET_SUBMITTED, payload };
};

const getSubmitted = () => {
  return { type: actionTypes.GET_SUBMITTED };
};

export interface ISetIsFinding {
  type: typeof actionTypes.SET_IS_FINDING;
  payload: boolean;
};

const setIsFinding = (payload: ISetIsFinding['payload']) => {
  return { type: actionTypes.SET_IS_FINDING, payload };
};

const getIsFinding = () => {
  return { type: actionTypes.GET_IS_FINDING };
};

export interface ISetIsLoading {
  type: typeof actionTypes.SET_IS_LOADING;
  payload: boolean;
};

const setIsLoading = (payload: ISetIsLoading['payload']) => {
  return { type: actionTypes.SET_IS_LOADING, payload };
};

const getIsLoading = () => {
  return { type: actionTypes.GET_IS_LOADING };
};



export interface ISetCalendarEvents {
  type: typeof actionTypes.SET_CALENDAR_EVENTS;
  payload: Array<ICalendarEvent>;
}

const setCalendarEvents = (payload: ISetCalendarEvents['payload']) => {
  return { type: actionTypes.SET_CALENDAR_EVENTS, payload };
};

const getCalendarEvents = () => {
  return { type: actionTypes.GET_CALENDAR_EVENTS };
};

const getCalendarEventsSuccessful = () => {
  return { type: actionTypes.GET_CALENDAR_EVENTS_SUCCESSFUL };
};

export interface IGetCalendarEvent {
  type: typeof actionTypes.GET_CALENDAR_EVENT;
  payload: ICalendarEvent;
};

const getCalendarEvent = (payload: IGetCalendarEvent['payload']) => {
  return { type: actionTypes.GET_CALENDAR_EVENT, payload };
};

// const getCalendarEventSuccessful = () => {
//   return { type: actionTypes.GET_CALENDAR_EVENT_SUCCESSFUL };
// };

export interface IAddCalendarEvent {
  type: typeof actionTypes.ADD_CALENDAR_EVENT;
  payload: ICalendarEvent;
};

const addCalendarEvent = (payload: IAddCalendarEvent['payload']) => {
  return { type: actionTypes.ADD_CALENDAR_EVENT, payload };
};

export interface IAddCalendarEventSuccessful {
  type: typeof actionTypes.ADD_CALENDAR_EVENT_SUCCESSFUL;
  payload: ICalendarEvent;
}

const addCalendarEventSuccessful = (payload: IAddCalendarEventSuccessful['payload']) => {
  return { type: actionTypes.ADD_CALENDAR_EVENT_SUCCESSFUL, payload };
};

export interface IUpdateCalendarEvent {
  type: typeof actionTypes.UPDATE_CALENDAR_EVENT;
  payload: ICalendarEvent;
};

const updateCalendarEvent = (payload: IUpdateCalendarEvent['payload']) => {
  return { type: actionTypes.UPDATE_CALENDAR_EVENT, payload };
};

export interface IUpdateCalendarEventSuccessful {
  type: typeof actionTypes.UPDATE_CALENDAR_EVENT_SUCCESSFUL;
  payload: ICalendarEvent;
}

const updateCalendarEventSuccessful = (payload: IUpdateCalendarEventSuccessful['payload']) => {
  return { type: actionTypes.UPDATE_CALENDAR_EVENT_SUCCESSFUL, payload };
};

export interface IDeleteCalendarEvent {
  type: typeof actionTypes.DELETE_CALENDAR_EVENT;
  payload: string;
};

const deleteCalendarEvent = (payload: IDeleteCalendarEvent['payload']) => {
  return { type: actionTypes.DELETE_CALENDAR_EVENT, payload };
};

interface DeleteCalendarEventSuccessfulPayload {
  id: string;
}

export interface IDeleteCalendarEventSuccessful {
  type: typeof actionTypes.DELETE_CALENDAR_EVENT_SUCCESSFUL;
  payload: DeleteCalendarEventSuccessfulPayload;
};

const deleteCalendarEventSuccessful = (payload: IDeleteCalendarEventSuccessful['payload']) => {
  return { type: actionTypes.DELETE_CALENDAR_EVENT_SUCCESSFUL, payload };
};

const deleteCalendarEvents = () => {
  return { type: actionTypes.DELETE_CALENDAR_EVENTS };
};

interface DeleteCalendarEventsSuccessfulPayload {
  message: string;
}

export interface IDeleteCalendarEventsSuccessful {
  type: typeof actionTypes.DELETE_CALENDAR_EVENTS_SUCCESSFUL;
  payload: DeleteCalendarEventsSuccessfulPayload;
};

const deleteCalendarEventsSuccessful = (payload: IDeleteCalendarEventsSuccessful['payload']) => {
  return { type: actionTypes.DELETE_CALENDAR_EVENTS_SUCCESSFUL, payload };
};

interface ApiErroredPayload {
  message: string;
}

export interface IApiErrored {
  type: typeof actionTypes.API_ERRORED;
  payload: ApiErroredPayload;
};

const apiErrored = (payload: IApiErrored['payload']) => {
  return { type: actionTypes.API_ERRORED, payload };
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
  getIsLoading,
  setIsLoading,
  getIsFinding,
  setIsFinding,
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