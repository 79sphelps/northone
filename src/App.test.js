import React from 'react'; 
import { render, fireEvent, screen, waitFor } from '@testing-library/react'; 

import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
// import {LocationDisplay} from './App'
// import {BrowserRouter, MemoryRouter} from 'react-router-dom'
import App from './App';

import * as reactRedux from 'react-redux';
import { createStore } from "redux";
import reducers from "./redux/reducers";
import rootReducer from './redux/reducers';
import { 
  selectTodos,
  // selectCurrentTodo,
  // selectTodoToAdd,
  // selectCurrentIndex,
  selectSearchTitle,
  // selectMessage,
  // selectSubmitted,
} from './redux/selectors';
import { formatDate } from "./redux/utils";
import { 
  setCurrentTodo, 
  setTodoToAdd,
  setSearchTitle,
  findByTitleSuccessful,
  addTodo,
  getTodos,
  setTodos,
  updateTodo,
  // deleteTodo,
  // deleteTodos,
} from "./redux/actions";
import {
  SET_CURRENT_TODO,
  SET_TODO_TO_ADD,
  SET_SEARCH_TITLE,
  FIND_BY_TITLE_SUCCESSFUL,
  ADD_TODO,
  IS_ADDING,
  ADD_TODO_SUCCESSFUL,
  SET_SUBMITTED,
  API_ERRORED,
  IS_FETCHING,
  GET_TODOS,
  GET_TODOS_SUCCESSFUL,
  // SET_TODOS,
  UPDATE_TODO,
  UPDATE_TODO_SUCCESSFUL,
  SET_MESSAGE,
  IS_UPDATING,
} from "./redux/constants/action.types";

import { call, put } from "redux-saga/effects";
import { 
  getTodosWorkerSaga, 
  addTodoWorkerSaga, 
  updateTodoWorkerSaga, 
  // deleteTodoWorkerSaga, 
  // deleteTodosWorkerSaga 
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
    // render(<App />, {wrapper: BrowserRouter})
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

// ACTION TESTS

describe('action creators', () => {
  // const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')
  // const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch')

  // beforeEach(() => {
  //   useSelectorMock.mockClear()
  //   useDispatchMock.mockClear()
  // })

  it('should set current todo successfully', () => {
    const todo = {
      id: null,
      title: "",
      description: "",
      status: false,
      dueDate: formatDate(new Date()),
    };
    const expectedAction = { type: SET_CURRENT_TODO, payload: todo };
    expect(setCurrentTodo(todo)).toEqual(expectedAction);
  });

  it('should set current "todo to add" successfully', () => {
    const todo = {
      id: null,
      title: "",
      description: "",
      status: false,
      dueDate: formatDate(new Date()),
    };
    const expectedAction = { type: SET_TODO_TO_ADD, payload: todo };
    expect(setTodoToAdd(todo)).toEqual(expectedAction);
  });

  it('should set search title successfully', () => {
    const title = "My New Title"
    const expectedAction = { type: SET_SEARCH_TITLE, payload: title };
    expect(setSearchTitle(title)).toEqual(expectedAction);
  });

  it('should find by title successfully', () => {
    const todo = {
      id: "012345",
      title: "My New Title",
      description: "My New Title Description",
      status: false,
      dueDate: formatDate(new Date()),
    };
    const expectedAction = { type: FIND_BY_TITLE_SUCCESSFUL, payload: todo };
    expect(findByTitleSuccessful(todo)).toEqual(expectedAction);
  });

  it('should get todos successfully', () => {
    const todos = [
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
    ]

    const store = makeTestStore(reducers);
    store.dispatch(setTodos(todos));
    expect(store.getState().todos).toEqual(todos);
  });

  // SAGAS

  it('should get todos successfully', () => {
    const iterator = getTodosWorkerSaga({ type: GET_TODOS });

    const expectedAction1 = { type: IS_FETCHING };
    expect(iterator.next().value).toEqual(put(expectedAction1));

    expect(JSON.stringify(iterator.next().value)).toEqual(JSON.stringify(call(getTodos)));

    const expectedAction2 = { type: GET_TODOS_SUCCESSFUL, payload: undefined };
    expect(iterator.next().value).toEqual(put(expectedAction2));

    expect(iterator.next().done).toEqual(true);
  });

  it('should add a todo successfully', () => {
    const todo = {
      id: "012345",
      title: "My New Title",
      description: "My New Title Description",
      status: false,
      dueDate: formatDate(new Date()),
    };

    const iterator = addTodoWorkerSaga({ type: ADD_TODO, payload: todo });

    const expectedAction1 = { type: IS_ADDING };
    expect(iterator.next().value).toEqual(put(expectedAction1));

    expect(JSON.stringify(iterator.next().value)).toEqual(JSON.stringify(call(addTodo, todo)));

    const expectedAction2 = { type: ADD_TODO_SUCCESSFUL, payload: undefined };
    expect(iterator.next().value).toEqual(put(expectedAction2));

    const expectedAction3 = { type: SET_SUBMITTED, payload: true };
    expect(iterator.next().value).toEqual(put(expectedAction3));

    const expectedAction4 = { type: SET_TODO_TO_ADD, payload: null };
    expect(iterator.next().value).toEqual(put(expectedAction4));

    expect(iterator.next().done).toEqual(true);
  });

  it('should handle "add a todo" sad path', () => {
    const todo = {
      id: "012345",
      // title: "My New Title",
      description: "My New Title Description",
      status: false,
      dueDate: formatDate(new Date()),
    };

    const iterator = addTodoWorkerSaga({ type: ADD_TODO, payload: todo });

    const expectedAction1 = { type: IS_ADDING };
    expect(iterator.next().value).toEqual(put(expectedAction1));

    expect(JSON.stringify(iterator.next().value)).toEqual(JSON.stringify(call(addTodo, todo)));

    const expectedAction2 = { type: API_ERRORED, payload: "some error" };

    expect(iterator.throw("some error").value).toEqual(put(expectedAction2));

    expect(iterator.next().done).toEqual(true);
  });

  it('should handle "update a todo" successfully', () => {
    const todo = {
      id: "012345",
      title: "My New Title",
      description: "My New Title Description",
      status: false,
      dueDate: formatDate(new Date()),
    };

    const iterator = addTodoWorkerSaga({ type: ADD_TODO, payload: todo });

    const expectedAction1 = { type: IS_ADDING };
    expect(iterator.next().value).toEqual(put(expectedAction1));

    expect(JSON.stringify(iterator.next().value)).toEqual(JSON.stringify(call(addTodo, todo)));

    const expectedAction2 = { type: ADD_TODO_SUCCESSFUL, payload: undefined };
    expect(iterator.next().value).toEqual(put(expectedAction2));

    // const expectedAction3 = { type: SET_SUBMITTED, payload: true };
    // expect(iterator.next().value).toEqual(put(expectedAction3));

    // const expectedAction4 = { type: SET_TODO_TO_ADD, payload: null };
    // expect(iterator.next().value).toEqual(put(expectedAction4));

    // expect(iterator.next().done).toEqual(true);

    const updatedTodo = {
      id: "012345",
      title: "My New Title - Updated",
      description: "My New Title Description",
      status: false,
      dueDate: formatDate(new Date()),
    }

    const iterator2 = updateTodoWorkerSaga({ type: UPDATE_TODO, payload: updatedTodo })

    const expectedAction5 = { type: IS_UPDATING };
    expect(iterator2.next().value).toEqual(put(expectedAction5));

    expect(JSON.stringify(iterator2.next().value)).toEqual(JSON.stringify(call(updateTodo, updatedTodo)));

    const expectedAction6 = { type: UPDATE_TODO_SUCCESSFUL, payload: updatedTodo };
    expect(iterator2.next().value).toEqual(put(expectedAction6));

    const expectedAction7 = { type: SET_CURRENT_TODO, payload: undefined };
    expect(iterator2.next().value).toEqual(put(expectedAction7));

    const message = "The todo was updated successfully!";

    const expectedAction8 = { type: SET_MESSAGE, payload: message };
    expect(iterator2.next().value).toEqual(put(expectedAction8));

    expect(iterator2.next().done).toEqual(true);
  });


  // REDUCERS

  const initialState = {
    todos: [],
    currentTodo: null,
    todoToAdd: null,
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
    const action = { type: IS_FETCHING };
    const expectedState = { ...initialState, isLoading: true };
    expect(rootReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle the GET_TODOS_SUCCESSFUL action', () => {
    const todoList = [
      {
        id: "012345",
        title: "My New Title",
        description: "My New Title Description",
        status: false,
        dueDate: formatDate(new Date()),
      }
    ]

    const action = { type: GET_TODOS_SUCCESSFUL, payload: todoList };
    const expectedState = { ...initialState, isLoading: false, todos: todoList };
    expect(rootReducer(initialState, action)).toEqual(expectedState);
  });

  // SELECTORS

  const exampleState = {
    todos: [
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
    currentTodo: {
      id: "012345",
      title: "My New Title",
      description: "My New Title Description",
      status: false,
      dueDate: formatDate(new Date()),
    },
    todoToAdd: {
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
    selectTodos.resetRecomputations();
  });

  it('should retrieve tasks from the selectTodos selector', () => {
    expect(selectTodos(exampleState)).toEqual(exampleState.todos);
  });

  it('should retrieve the searchTitle from the selectSearchTitle selector', () => {
    expect(selectSearchTitle(exampleState)).toEqual(exampleState.searchTitle);
  });

  // it('should return a searched for todo item from a title search', () => {
  //   const searchTodo = {
  //     id: "123456",
  //     title: "My 2nd New Title",
  //     description: "My 2nd New Title Description",
  //     status: false,
  //     dueDate: formatDate(new Date()),
  //   };

  //   const action = { type: SET_SEARCH_TITLE, payload: "My 2nd New Title" };
  //   const expectedState = { ...exampleState, todos: [ searchTodo ]};
  //   expect(rootReducer(exampleState, action)).toEqual(expectedState);
  // });
})