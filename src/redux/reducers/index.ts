import { actionTypes } from "../constants/action.types";
import { deepCopy } from '../utils/index.ts';
import { ICalendarEvent } from "../actions";

const initialState = {
  calendarEvents: [],
  currentCalendarEvent: null,
  calendarEventToAdd: null,
  searchTitle: "",
  currentIndex: -1,
  message: "",
  submitted: false,
  error: '',
  isLoading: false,
  isAdding: false,
  isUpdating: false,
  isDeleting: false,
  isDeletingAll: false,
  isFinding: false,
};

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

function rootReducer(
  state: RootState = initialState,
  action: Action
): RootState {
  let mappings: ICalendarEvent[] | null = null;

  switch (action.type) {
    case actionTypes.SET_CURRENT_CALENDAR_EVENT:
      if (!action.payload) return { ...state, currentCalendarEvent: null };
      return {
        ...state,
        currentCalendarEvent: { ...state.currentCalendarEvent, ...action.payload }
      };

    case actionTypes.SET_CALENDAR_EVENT_TO_ADD:
      if (!action.payload) return { ...state, calendarEventToAdd: null };
      return { ...state, calendarEventToAdd: action.payload };

    case actionTypes.SET_SEARCH_TITLE:
      return { ...state, searchTitle: action.payload };

    case actionTypes.FIND_BY_TITLE_SUCCESSFUL:
      return { ...state, isFinding: false, calendarEvents: action.payload };

    case actionTypes.SET_CURRENT_INDEX:
      return { ...state, currentIndex: action.payload };

    case actionTypes.SET_MESSAGE:
      return { ...state, message: action.payload };

    case actionTypes.SET_SUBMITTED:
      return { ...state, submitted: action.payload };

    case actionTypes.SET_CALENDAR_EVENTS:
      return { ...state, calendarEvents: action.payload };

    case actionTypes.GET_CALENDAR_EVENTS_SUCCESSFUL:
      return { ...state, isLoading: false, calendarEvents: action.payload };

    case actionTypes.ADD_CALENDAR_EVENT_SUCCESSFUL:
      return { ...state, isAdding: false, calendarEvents: state.calendarEvents.concat(action.payload) };

    case actionTypes.UPDATE_CALENDAR_EVENT_SUCCESSFUL:
      mappings = deepCopy(state.calendarEvents);

      if (!mappings) return { ...state, isUpdating: false };
      const idx = mappings.findIndex((t) => t._id === action.payload.id);

      if (mappings && mappings[idx]) {
        // let calendarEvent = action.payload.calendarEvent;
        let calendarEvent = action.payload;
        // calendarEvent.dueDate = calendarEvent.dueDate.toISOString();
        delete calendarEvent.id;
        mappings[idx] = { ...mappings[idx], ...calendarEvent };
      }

      return { ...state, isUpdating: false, calendarEvents: mappings };

    case actionTypes.DELETE_CALENDAR_EVENT_SUCCESSFUL:
      mappings = state.calendarEvents.filter((t) => t._id !== action.payload.id);
      return { ...state, isDeleting: false, calendarEvents: mappings };

    case actionTypes.DELETE_CALENDAR_EVENTS_SUCCESSFUL:
      return { ...state, isDeletingAll: false, calendarEvents: action.payload };

    // case DATA_LOADED:
    //   return { ...state, isLoading: false };
    
    case actionTypes.IS_LOADING:
      return { ...state, isLoading: true };

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

    case actionTypes.SET_IS_FINDING:
      return { ...state, isFinding: action.payload }

    case actionTypes.API_ERRORED:
      // return { ...state, error: state.error = 'yes' }
      return { ...state, error: action.payload };

    default:
      return state;
  }
}

export default rootReducer;
