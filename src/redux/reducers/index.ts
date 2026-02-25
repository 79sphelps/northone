import { actionTypes } from "../constants/action.types";
import { ICalendarEvent } from "../types";

const initialState = {
  calendarEvents: [] as ICalendarEvent[],
  currentCalendarEvent: null as ICalendarEvent | null,
  calendarEventToAdd: null as any,
  searchTitle: "",
  currentIndex: -1,
  message: "",
  submitted: false,
  error: "" as string,
  isLoading: false,
  isAdding: false,
  isUpdating: false,
  isDeleting: false,
  isDeletingAll: false,
  isFinding: false,
};

// export interface RootState extends typeof initialState {};

export interface ICalendarEventToAdd {
  [key: string]: any;
}

export interface RootState {
  calendarEvents: ICalendarEvent[];
  currentCalendarEvent: ICalendarEvent | null;
  calendarEventToAdd: ICalendarEventToAdd | null;
  searchTitle: string;
  currentIndex: number;
  message: string;
  submitted: boolean;
  error: string;
  isLoading: boolean;
  isAdding: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  isDeletingAll: boolean;
  isFinding: boolean;
}
interface Action<T = any> {
  type: string;
  payload?: T;
}

export default function rootReducer(
  state: RootState = initialState,
  action: Action
): RootState {
  switch (action.type) {
    case actionTypes.SET_CURRENT_CALENDAR_EVENT:
      return {
        ...state,
        currentCalendarEvent: action.payload ?? null,
      };

    case actionTypes.SET_CALENDAR_EVENT_TO_ADD:
      return {
        ...state,
        calendarEventToAdd: action.payload ?? null,
      };

    case actionTypes.SET_SEARCH_TITLE:
      return { ...state, searchTitle: action.payload };

    case actionTypes.FIND_BY_TITLE_SUCCESSFUL:
      return {
        ...state,
        isFinding: false,
        calendarEvents: action.payload,
      };

    case actionTypes.SET_CURRENT_INDEX:
      return { ...state, currentIndex: action.payload };

    case actionTypes.SET_MESSAGE:
      return { ...state, message: action.payload };

    case actionTypes.SET_SUBMITTED:
      return { ...state, submitted: action.payload };

    case actionTypes.GET_CALENDAR_EVENTS_SUCCESSFUL:
      return {
        ...state,
        isLoading: false,
        calendarEvents: action.payload,
      };

    case actionTypes.ADD_CALENDAR_EVENT_SUCCESSFUL:
      return {
        ...state,
        isAdding: false,
        calendarEvents: [...state.calendarEvents, action.payload],
      };

    case actionTypes.UPDATE_CALENDAR_EVENT_SUCCESSFUL:
      return {
        ...state,
        isUpdating: false,
        calendarEvents: state.calendarEvents.map((event) =>
          event._id === action.payload._id ? action.payload : event
        ),
      };

    case actionTypes.DELETE_CALENDAR_EVENT_SUCCESSFUL:
      return {
        ...state,
        isDeleting: false,
        calendarEvents: state.calendarEvents.filter(
          (event) => event._id !== action.payload
        ),
      };

    case actionTypes.DELETE_CALENDAR_EVENTS_SUCCESSFUL:
      return {
        ...state,
        isDeletingAll: false,
        calendarEvents: [],
      };

    case actionTypes.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };

    case actionTypes.IS_ADDING:
      return { ...state, isAdding: true };

    case actionTypes.IS_UPDATING:
      return { ...state, isUpdating: true };

    case actionTypes.IS_DELETING:
      return { ...state, isDeleting: true };

    case actionTypes.IS_DELETING_ALL:
      return { ...state, isDeletingAll: true };

    case actionTypes.IS_FINDING:
      return { ...state, isFinding: true };

    case actionTypes.API_ERRORED:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        isAdding: false,
        isUpdating: false,
        isDeleting: false,
        isDeletingAll: false,
        isFinding: false,
      };

    default:
      return state;
  }
}
