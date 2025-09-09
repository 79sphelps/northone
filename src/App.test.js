import { render, fireEvent, screen, waitFor } from '@testing-library/react'; 
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
// import {LocationDisplay} from './App'
// import {BrowserRouter, MemoryRouter} from 'react-router-dom'
import App from './App';
import * as reactRedux from 'react-redux';
import { createStore } from "redux";
import { call, put } from "redux-saga/effects";
import reducers from "./redux/reducers";
import rootReducer from './redux/reducers';
import { 
  selectCalendarEvents,
  selectCurrentCalendarEvent,
  selectCalendarEventToAdd,
  selectCurrentIndex,
  selectSearchTitle,
  selectMessage,
  selectSubmitted,
} from './redux/selectors';
import { formatDate } from "./redux/utils";
import { actionTypes } from './redux/constants/action.types';
import { 
  getSearchTitle,
  setSearchTitle,
  findByTitle,
  findByTitleSuccessful,
  setCurrentIndex,  
  getCurrentIndex,
  setMessage,
  getMessage,
  setSubmitted,
  getSubmitted,
  setCurrentCalendarEvent,
  getCurrentCalendarEvent,
  setCalendarEventToAdd,
  getCalendarEventToAdd,
  getCalendarEvent,
  setCalendarEvents,
  getCalendarEvents,
  getCalendarEventsSuccessful,
  deleteCalendarEvent,
  deleteCalendarEventSuccessful,
  deleteCalendarEvents,
  deleteCalendarEventsSuccessful,
  updateCalendarEvent,
  updateCalendarEventSuccessful,
  addCalendarEvent,
  addCalendarEventSuccessful,
} from "./redux/actions";
import { 
  findByTitleWorkerSaga,
  getCalendarEventsWorkerSaga, 
  addCalendarEventWorkerSaga, 
  updateCalendarEventWorkerSaga, 
  deleteCalendarEventWorkerSaga,
  deleteCalendarEventsWorkerSaga
} from "./redux/saga/api-sagas";

function makeTestStore(opts = {}) {
  const store = createStore(opts)
  const origDispatch = store.dispatch
  store.dispatch = jest.fn(origDispatch)
  return store
}

HTMLCanvasElement.prototype.getContext = jest.fn(); // resolved an error

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

// useDispatch returns a function which we are mocking here
// const mockDispatch = jest.fn();

// beforeAll(() => {
//   reactRedux.useDispatch = jest.fn().mockImplementation(() => mockDispatch);
// });

// beforeEach(() => {
//   reactRedux.useDispatch.mockClear();
// });

describe('MyComponent', () => { 
  beforeEach(() => {
    useDispatchMock.mockImplementation(() => () => {});
    // useSelectorMock.mockImplementation(selector => selector(mockStore));
  })
  afterEach(() => {
      useDispatchMock.mockClear();
      // useSelectorMock.mockClear();
  })

  // const useSelectorMock = reactRedux.useSelector;
  const useDispatchMock = reactRedux.useDispatch;

  it('contains a link with "Calendar Events"', async () => { 
    render(<App />);
    expect(screen.getByRole('link', { name: 'Calendar Events' })).toHaveAttribute('href', '/')
  });

  it('contains a link with "Add"', async () => { 
    render(<App />);
    expect(screen.getByRole('link', { name: 'Add' })).toHaveAttribute('href', '/add')
  }); 

  it('contains an input field with "Search by title" placeholder', async () => { 
    render(<App />);
    // expect(screen.getByText('Search by title')).toBeInTheDocument();
    // expect(screen.queryByPlaceholderText(/Search by title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search by title/i)).toBeInTheDocument();
  }); 

  it('can navigate to the "add calendar event" page', async () => {
    render(<App />)
    const user = userEvent.setup()
  
    // verify page content for default route
    expect(screen.getByText(/Click on a calendar item to show detailed info/i)).toBeInTheDocument()
  
    // verify page content for expected route after navigating
    await user.click(screen.getByText(/Add/i))
    expect(screen.getByText(/Add a New Calendar Event/i)).toBeInTheDocument()
  })

  // it('landing on a bad page', () => {
  //   const badRoute = '/some/bad/route'
  
  //   // use <MemoryRouter> when you want to manually control the history
  //   render(
  //     <MemoryRouter initialEntries={[badRoute]}>
  //       <App />
  //     </MemoryRouter>,
  //   )
  
  //   // verify navigation to "no match" route
  //   expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument()
  // })
}); 

// --------------------------------------------------------------------------
// ACTION TESTS
// --------------------------------------------------------------------------

describe('action creators', () => {
  // const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')
  // const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch')

  // beforeEach(() => {
  //   useSelectorMock.mockClear()
  //   useDispatchMock.mockClear()
  // })

  it('should set search title successfully', () => {
    const title = "My New Title"
    const expectedAction = { type: actionTypes.SET_SEARCH_TITLE, payload: title };
    expect(setSearchTitle(title)).toEqual(expectedAction);
    expect(getSearchTitle()).toEqual({ type: actionTypes.GET_SEARCH_TITLE });
  });

  it('should find by title successfully', () => {
    const event = {
      id: "012345",
      title: "My New Title",
      description: "My New Title Description",
      status: false,
      dueDate: formatDate(new Date()),
    };
    const expectedAction = { type: actionTypes.FIND_BY_TITLE_SUCCESSFUL, payload: event };
    expect(findByTitleSuccessful(event)).toEqual(expectedAction);
  });

  it('should set and get current index successfully', () => {
    const index = "1"
    const expectedAction = { type: actionTypes.SET_CURRENT_INDEX, payload: index };
    expect(setCurrentIndex(index)).toEqual(expectedAction);
    expect(getCurrentIndex()).toEqual({ type: actionTypes.GET_CURRENT_INDEX });
  });

  it('should set and get submitted status successfully', () => {
    const submitted = true
    const expectedAction = { type: actionTypes.SET_SUBMITTED, payload: submitted };
    expect(setSubmitted(submitted)).toEqual(expectedAction);
    expect(getSubmitted()).toEqual({ type: actionTypes.GET_SUBMITTED });
  });

  it('should set and get the message successfully', () => {
    const message = "My test message";
    const expectedAction = { type: actionTypes.SET_MESSAGE, payload: message };
    expect(setMessage(message)).toEqual(expectedAction);
    expect(getMessage()).toEqual({ type: actionTypes.GET_MESSAGE });
  });

  it('should set current calendar event successfully', () => {
    const event = {
      id: null,
      title: "",
      description: "",
      status: false,
      dueDate: formatDate(new Date()),
    };
    const expectedAction = { type: actionTypes.SET_CURRENT_CALENDAR_EVENT, payload: event };
    expect(setCurrentCalendarEvent(event)).toEqual(expectedAction);
    expect(getCurrentCalendarEvent()).toEqual({ type: actionTypes.GET_CURRENT_CALENDAR_EVENT });
  });

  it('should set current "calendar event to add" successfully', () => {
    const event = {
      id: null,
      title: "",
      description: "",
      status: false,
      dueDate: formatDate(new Date()),
    };
    const expectedAction = { type: actionTypes.SET_CALENDAR_EVENT_TO_ADD, payload: event };
    expect(setCalendarEventToAdd(event)).toEqual(expectedAction);
    expect(getCalendarEventToAdd()).toEqual({ type: actionTypes.GET_CALENDAR_EVENT_TO_ADD });
  });

  it('should set calendar events successfully', () => {
    const events = [
      {
        id: "012345",
        title: "My New Title",
        description: "My New Title Description",
        status: false,
        dueDate: formatDate(new Date()),
      },
      {
        id: "123456",
        title: "My 2nd New Title",
        description: "My 2nd New Title Description",
        status: false,
        dueDate: formatDate(new Date()),
      },
      {
        id: "234567",
        title: "My 3rd New Title",
        description: "My 3rd New Title Description",
        status: false,
        dueDate: formatDate(new Date()),
      }
    ];

    const store = makeTestStore(reducers);
    store.dispatch(setCalendarEvents(events));
    expect(store.getState().calendarEvents).toEqual(events);
  });

  // --------------------------------------------------------------------------  
  // SAGAS
  // --------------------------------------------------------------------------

  it('should find a calendar event by title successfully', () => {
    const event = {
      id: "012345",
      title: "My New Title",
      description: "My New Title Description",
      status: false,
      dueDate: formatDate(new Date()),
    };

    const iterator = addCalendarEventWorkerSaga({ type: actionTypes.ADD_CALENDAR_EVENT, payload: event });

    const expectedAction1 = { type: actionTypes.IS_ADDING };
    expect(iterator.next().value).toEqual(put(expectedAction1));

    expect(JSON.stringify(iterator.next().value)).toEqual(JSON.stringify(call(addCalendarEvent, event)));

    const expectedAction2 = { type: actionTypes.ADD_CALENDAR_EVENT_SUCCESSFUL, payload: undefined };
    expect(iterator.next().value).toEqual(put(expectedAction2));

    const message = "The calendar event was added successfully!";

    const expectedAction9 = { type: actionTypes.SET_MESSAGE, payload: message };
    expect(iterator.next().value).toEqual(put(expectedAction9));

    const expectedAction3 = { type: actionTypes.SET_SUBMITTED, payload: true };
    expect(iterator.next().value).toEqual(put(expectedAction3));

    const expectedAction4 = { type: actionTypes.SET_CALENDAR_EVENT_TO_ADD, payload: null };
    expect(iterator.next().value).toEqual(put(expectedAction4));

    // --------------------------------------------------------------------------

    const iterator2 = findByTitleWorkerSaga({ type: actionTypes.FIND_BY_TITLE, payload: "My New Title" });
    // const iterator2 = findByTitleWorkerSaga({ type: actionTypes.FIND_BY_TITLE, payload: event });

    const expectedAction5 = { type: actionTypes.IS_FINDING };
    expect(iterator2.next().value).toEqual(put(expectedAction5));

    // expect(JSON.stringify(iterator2.next().value)).toEqual(JSON.stringify(call(findByTitle, "My New Title")));
    expect(JSON.stringify(iterator2.next().value)).toEqual(JSON.stringify(call(findByTitle, event.title)));

    const expectedAction6 = { type: actionTypes.FIND_BY_TITLE_SUCCESSFUL, payload: undefined };
    expect(iterator2.next().value).toEqual(put(expectedAction6));

    const expectedAction7 = { type: actionTypes.SET_CURRENT_CALENDAR_EVENT, payload: null };
    expect(iterator2.next().value).toEqual(put(expectedAction7));

    const expectedAction8 = { type: actionTypes.SET_CURRENT_INDEX, payload: -1 };
    expect(iterator2.next().value).toEqual(put(expectedAction8));

    expect(iterator2.next().done).toEqual(true);
  });

  it('should get calendar events successfully', () => {
    const iterator = getCalendarEventsWorkerSaga({ type: actionTypes.GET_CALENDAR_EVENTS });

    const expectedAction1 = { type: actionTypes.IS_FETCHING };
    expect(iterator.next().value).toEqual(put(expectedAction1));

    expect(JSON.stringify(iterator.next().value)).toEqual(JSON.stringify(call(getCalendarEvents)));

    const expectedAction2 = { type: actionTypes.GET_CALENDAR_EVENTS_SUCCESSFUL, payload: undefined };
    expect(iterator.next().value).toEqual(put(expectedAction2));

    expect(iterator.next().done).toEqual(true);
  });

  it('should add a calendar event successfully', () => {
    const event = {
      id: "012345",
      title: "My New Title",
      description: "My New Title Description",
      status: false,
      dueDate: formatDate(new Date()),
    };

    const iterator = addCalendarEventWorkerSaga({ type: actionTypes.ADD_CALENDAR_EVENT, payload: event });

    const expectedAction1 = { type: actionTypes.IS_ADDING };
    expect(iterator.next().value).toEqual(put(expectedAction1));

    expect(JSON.stringify(iterator.next().value)).toEqual(JSON.stringify(call(addCalendarEvent, event)));

    const expectedAction2 = { type: actionTypes.ADD_CALENDAR_EVENT_SUCCESSFUL, payload: undefined };
    expect(iterator.next().value).toEqual(put(expectedAction2));

    const message = "The calendar event was added successfully!";

    const expectedAction8 = { type: actionTypes.SET_MESSAGE, payload: message };
    expect(iterator.next().value).toEqual(put(expectedAction8));

    const expectedAction3 = { type: actionTypes.SET_SUBMITTED, payload: true };
    expect(iterator.next().value).toEqual(put(expectedAction3));

    const expectedAction4 = { type: actionTypes.SET_CALENDAR_EVENT_TO_ADD, payload: null };
    expect(iterator.next().value).toEqual(put(expectedAction4));

    expect(iterator.next().done).toEqual(true);
  });

  it('should handle "add a calendar event" sad path', () => {
    const event = {
      id: "012345",
      // title: "My New Title",
      description: "My New Title Description",
      status: false,
      dueDate: formatDate(new Date()),
    };

    const iterator = addCalendarEventWorkerSaga({ type: actionTypes.ADD_CALENDAR_EVENT, payload: event });

    const expectedAction1 = { type: actionTypes.IS_ADDING };
    expect(iterator.next().value).toEqual(put(expectedAction1));

    expect(JSON.stringify(iterator.next().value)).toEqual(JSON.stringify(call(addCalendarEvent, event)));

    const expectedAction2 = { type: actionTypes.API_ERRORED, payload: "some error" };

    expect(iterator.throw("some error").value).toEqual(put(expectedAction2));

    expect(iterator.next().done).toEqual(true);
  });

  it('should handle "update a calendar event" successfully', () => {
    const event = {
      id: "012345",
      title: "My New Title",
      description: "My New Title Description",
      status: false,
      dueDate: formatDate(new Date()),
    };

    const iterator = addCalendarEventWorkerSaga({ type: actionTypes.ADD_CALENDAR_EVENT, payload: event });

    const expectedAction1 = { type: actionTypes.IS_ADDING };
    expect(iterator.next().value).toEqual(put(expectedAction1));

    expect(JSON.stringify(iterator.next().value)).toEqual(JSON.stringify(call(addCalendarEvent, event)));

    const expectedAction2 = { type: actionTypes.ADD_CALENDAR_EVENT_SUCCESSFUL, payload: undefined };
    expect(iterator.next().value).toEqual(put(expectedAction2));

    const message0 = "The calendar event was added successfully!";

    const expectedAction9 = { type: actionTypes.SET_MESSAGE, payload: message0 };
    expect(iterator.next().value).toEqual(put(expectedAction9));

    const expectedAction3 = { type: actionTypes.SET_SUBMITTED, payload: true };
    expect(iterator.next().value).toEqual(put(expectedAction3));

    const expectedAction4 = { type: actionTypes.SET_CALENDAR_EVENT_TO_ADD, payload: null };
    expect(iterator.next().value).toEqual(put(expectedAction4));

    // expect(iterator.next().done).toEqual(true);

    // --------------------------------------------------------------------------

    const updatedEvent = {
      id: "012345",
      title: "My New Title - Updated",
      description: "My New Title Description",
      status: false,
      dueDate: formatDate(new Date()),
    }

    const iterator2 = updateCalendarEventWorkerSaga({ type: actionTypes.UPDATE_CALENDAR_EVENT, payload: updatedEvent })

    const expectedAction5 = { type: actionTypes.IS_UPDATING };
    expect(iterator2.next().value).toEqual(put(expectedAction5));

    expect(JSON.stringify(iterator2.next().value)).toEqual(JSON.stringify(call(updateCalendarEvent, updatedEvent)));

    const expectedAction6 = { type: actionTypes.UPDATE_CALENDAR_EVENT_SUCCESSFUL, payload: updatedEvent };
    expect(iterator2.next().value).toEqual(put(expectedAction6));

    const expectedAction7 = { type: actionTypes.SET_CURRENT_CALENDAR_EVENT, payload: updatedEvent };
    expect(iterator2.next().value).toEqual(put(expectedAction7));

    const message = "The calendar event was updated successfully!";

    const expectedAction8 = { type: actionTypes.SET_MESSAGE, payload: message };
    expect(iterator2.next().value).toEqual(put(expectedAction8));

    expect(iterator2.next().done).toEqual(true);
  });

  it('should handle "delete a calendar event" successfully', () => {
    const event = {
      id: "012345",
      title: "My New Title",
      description: "My New Title Description",
      status: false,
      dueDate: formatDate(new Date()),
    };

    const iterator = addCalendarEventWorkerSaga({ type: actionTypes.ADD_CALENDAR_EVENT, payload: event });

    const expectedAction1 = { type: actionTypes.IS_ADDING };
    expect(iterator.next().value).toEqual(put(expectedAction1));

    expect(JSON.stringify(iterator.next().value)).toEqual(JSON.stringify(call(addCalendarEvent, event)));

    const expectedAction2 = { type: actionTypes.ADD_CALENDAR_EVENT_SUCCESSFUL, payload: undefined };
    expect(iterator.next().value).toEqual(put(expectedAction2));

    const message0 = "The calendar event was added successfully!";

    const expectedAction10 = { type: actionTypes.SET_MESSAGE, payload: message0 };
    expect(iterator.next().value).toEqual(put(expectedAction10));    

    const expectedAction3 = { type: actionTypes.SET_SUBMITTED, payload: true };
    expect(iterator.next().value).toEqual(put(expectedAction3));

    const expectedAction4 = { type: actionTypes.SET_CALENDAR_EVENT_TO_ADD, payload: null };
    expect(iterator.next().value).toEqual(put(expectedAction4));

    // expect(iterator.next().done).toEqual(true);

    // --------------------------------------------------------------------------

    // const iterator2 = deleteCalendarEventWorkerSaga({ type: actionTypes.DELETE_CALENDAR_EVENT, payload: event })
    const iterator2 = deleteCalendarEventWorkerSaga({ type: actionTypes.DELETE_CALENDAR_EVENT, payload: event.id })

    const expectedAction5 = { type: actionTypes.IS_DELETING };
    expect(iterator2.next().value).toEqual(put(expectedAction5));

    expect(JSON.stringify(iterator2.next().value)).toEqual(JSON.stringify(call(deleteCalendarEvent, "012345")));
    // expect(JSON.stringify(iterator2.next().value)).toEqual(JSON.stringify(call(deleteCalendarEvent, event)));

    // const expectedAction6 = { type: actionTypes.DELETE_CALENDAR_EVENT_SUCCESSFUL, payload: event };
    const expectedAction6 = { type: actionTypes.DELETE_CALENDAR_EVENT_SUCCESSFUL, payload: event.id };
    expect(iterator2.next().value).toEqual(put(expectedAction6));

    const message = "The calendar event was deleted successfully!";
    const expectedAction7 = { type: actionTypes.SET_MESSAGE, payload: message };
    expect(iterator2.next().value).toEqual(put(expectedAction7));
    const expectedAction8 = { type: actionTypes.SET_CURRENT_CALENDAR_EVENT, payload: null };
    expect(iterator2.next().value).toEqual(put(expectedAction8));
    const expectedAction9 = { type: actionTypes.SET_CURRENT_INDEX, payload: -1 };
    expect(iterator2.next().value).toEqual(put(expectedAction9));
    expect(iterator2.next().done).toEqual(true);
  });

  // --------------------------------------------------------------------------  
  // REDUCERS
  // --------------------------------------------------------------------------

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

  it('should return the initial state', () => {
    expect(rootReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle the IS_FETCHING action', () => {
    const action = { type: actionTypes.IS_FETCHING };
    const expectedState = { ...initialState, isLoading: true };
    expect(rootReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle the IS_ADDING action', () => {
    const action = { type: actionTypes.IS_ADDING };
    const expectedState = { ...initialState, isAdding: true };
    expect(rootReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle the IS_UPDATING action', () => {
    const action = { type: actionTypes.IS_UPDATING };
    const expectedState = { ...initialState, isUpdating: true };
    expect(rootReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle the IS_DELETING action', () => {
    const action = { type: actionTypes.IS_DELETING };
    const expectedState = { ...initialState, isDeleting: true };
    expect(rootReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle the IS_DELETING_ALL action', () => {
    const action = { type: actionTypes.IS_DELETING_ALL }; 
    const expectedState = { ...initialState, isDeletingAll: true };
    expect(rootReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle the IS_FINDING action', () => {
    const action = { type: actionTypes.IS_FINDING }; 
    const expectedState = { ...initialState, isFinding: true };
    expect(rootReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle the GET_CALENDAR_EVENTS_SUCCESSFUL action', () => {
    const eventList = [
      {
        id: "012345",
        title: "My New Title",
        description: "My New Title Description",
        status: false,
        dueDate: formatDate(new Date()),
      }
    ]

    const action = { type: actionTypes.GET_CALENDAR_EVENTS_SUCCESSFUL, payload: eventList };
    const expectedState = { ...initialState, isLoading: false, calendarEvents: eventList };
    expect(rootReducer(initialState, action)).toEqual(expectedState);
  });

  // --------------------------------------------------------------------------
  // SELECTORS
  // --------------------------------------------------------------------------
  
  const exampleState = {
    calendarEvents: [
      {
        id: "012345",
        title: "My New Title",
        description: "My New Title Description",
        status: false,
        dueDate: formatDate(new Date()),
      },
      {
        id: "123456",
        title: "My 2nd New Title",
        description: "My 2nd New Title Description",
        status: false,
        dueDate: formatDate(new Date()),
      },
      {
        id: "234567",
        title: "My 3rd New Title",
        description: "My 3rd New Title Description",
        status: false,
        dueDate: formatDate(new Date()),
      }
    ],
    currentCalendarEvent: {
      id: "012345",
      title: "My New Title",
      description: "My New Title Description",
      status: false,
      dueDate: formatDate(new Date()),
    },
    calendarEventToAdd: {
      id: "012345",
      title: "My New Title",
      description: "My New Title Description",
      status: false,
      dueDate: formatDate(new Date()),
    },
    searchTitle: "My New Title",
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

  afterEach(() => {
    selectCalendarEvents.resetRecomputations();
  });

  it('should retrieve tasks from the selectCalendarEvents selector', () => {
    expect(selectCalendarEvents(exampleState)).toEqual(exampleState.calendarEvents);
  });

  it('should retrieve the current calendar event from the selectCurrentCalendarEvent selector', () => {
    expect(selectCurrentCalendarEvent(exampleState)).toEqual(exampleState.currentCalendarEvent);
  });

  it('should retrieve the calendar event to be added from the selectCalendarEventToAdd selector', () => {
    expect(selectCalendarEventToAdd(exampleState)).toEqual(exampleState.calendarEventToAdd);
  });

  it('should retrieve the current index from the selectCurrentIndex selector', () => {
    expect(selectCurrentIndex(exampleState)).toEqual(exampleState.currentIndex);
  });

  it('should retrieve the searchTitle from the selectSearchTitle selector', () => {
    expect(selectSearchTitle(exampleState)).toEqual(exampleState.searchTitle);
  });

  it('should retrieve the message from the selectMessage selector', () => {
    expect(selectMessage(exampleState)).toEqual(exampleState.message);
  });

  it('should retrieve the submitted status from the selectSubmitted selector', () => {
    expect(selectSubmitted(exampleState)).toEqual(exampleState.submitted);
  });

  // it('should return a searched for calendar event item from a title search', () => {
  //   const searchEvent = {
  //     id: "123456",
  //     title: "My 2nd New Title",
  //     description: "My 2nd New Title Description",
  //     status: false,
  //     dueDate: formatDate(new Date()),
  //   };

  //   const action = { type: SET_SEARCH_TITLE, payload: "My 2nd New Title" };
  //   const expectedState = { ...exampleState, events: [ searchEvent ]};
  //   expect(rootReducer(exampleState, action)).toEqual(expectedState);
  // });
})