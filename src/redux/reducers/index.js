import {
  SET_CURRENT_CALENDAR_EVENT,
  SET_CALENDAR_EVENT_TO_ADD,
  SET_SEARCH_TITLE,
  SET_CURRENT_INDEX,
  SET_MESSAGE,
  SET_SUBMITTED,
  SET_CALENDAR_EVENTS,
  // DATA_LOADED,
  IS_FETCHING,
  IS_ADDING,
  IS_DELETING,
  IS_DELETING_ALL,
  IS_FINDING,
  IS_UPDATING,
  API_ERRORED,
  GET_CALENDAR_EVENTS_SUCCESSFUL,
  DELETE_CALENDAR_EVENTS_SUCCESSFUL,
  UPDATE_CALENDAR_EVENT_SUCCESSFUL,
  DELETE_CALENDAR_EVENT_SUCCESSFUL,
  ADD_CALENDAR_EVENT_SUCCESSFUL,
  FIND_BY_TITLE_SUCCESSFUL,
} from "../constants/action.types";
import { deepCopy } from '../utils';

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

function rootReducer(state = initialState, action) {
  let mappings = null;

  switch (action.type) {
    case SET_CURRENT_CALENDAR_EVENT:
      if (!action.payload) return { ...state, currentCalendarEvent: null };
      return {
        ...state,
        currentCalendarEvent: { ...state.currentCalendarEvent, ...action.payload }
      };

    case SET_CALENDAR_EVENT_TO_ADD:
      if (!action.payload) return { ...state, calendarEventToAdd: null };
      return { ...state, calendarEventToAdd: action.payload };

    case SET_SEARCH_TITLE:
      return { ...state, searchTitle: action.payload };

    case FIND_BY_TITLE_SUCCESSFUL:
      return { ...state, isFinding: false, calendarEvents: action.payload };

    case SET_CURRENT_INDEX:
      return { ...state, currentIndex: action.payload };

    case SET_MESSAGE:
      return { ...state, message: action.payload };

    case SET_SUBMITTED:
      return { ...state, submitted: action.payload };

    case SET_CALENDAR_EVENTS:
      return { ...state, calendarEvents: action.payload };

    case GET_CALENDAR_EVENTS_SUCCESSFUL:
      return { ...state, isLoading: false, calendarEvents: action.payload };

    case ADD_CALENDAR_EVENT_SUCCESSFUL:
      return { ...state, isAdding: false, calendarEvents: state.calendarEvents.concat(action.payload) };

    case UPDATE_CALENDAR_EVENT_SUCCESSFUL:
      mappings = deepCopy(state.calendarEvents);
      const idx = mappings.findIndex((t) => t._id === action.payload.id);

      if (mappings && mappings[idx]) {
        let calendarEvent = action.payload.calendarEvent;
        calendarEvent.dueDate = calendarEvent.dueDate.toISOString();
        delete calendarEvent.id;
        mappings[idx] = { ...mappings[idx], ...calendarEvent };
      }

      return { ...state, isUpdating: false, calendarEvents: mappings };

    case DELETE_CALENDAR_EVENT_SUCCESSFUL:
      mappings = state.calendarEvents.filter((t) => t._id !== action.payload.id);
      return { ...state, isDeleting: false, calendarEvents: mappings };

    case DELETE_CALENDAR_EVENTS_SUCCESSFUL:
      return { ...state, isDeletingAll: false, calendarEvents: action.payload };

    // case DATA_LOADED:
    //   return { ...state, isLoading: false };
    
    case IS_FETCHING:
      return { ...state, isLoading: true };

    case IS_ADDING:
      return { ...state, isAdding: true };

    case IS_UPDATING:
      return { ...state, isUpdating: true };

    case IS_DELETING:
      return { ...state, isDeleting: true };

    case IS_DELETING_ALL:
      return { ...state, isDeletingAll: true };

    case IS_FINDING:
      return { ...state, isFinding: true };

    case API_ERRORED:
      // return { ...state, error: state.error = 'yes' }
      return { ...state, error: action.payload };

    default:
      return state;
  }
}

export default rootReducer;
