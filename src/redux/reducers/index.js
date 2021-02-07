import {
  SET_CURRENT_TODO,
  SET_TODO_TO_ADD,
  SET_SEARCH_TITLE,
  SET_CURRENT_INDEX,
  SET_MESSAGE,
  SET_SUBMITTED,
  SET_TODOS,
  ADD_TODO_IN_STATE,
  UPDATE_TODO_IN_STATE,
  DELETE_TODO_IN_STATE,
  DELETE_TODOS,
  DATA_LOADED,
  API_ERRORED,
} from "../constants/action.types";

const initialState = {
  todos: [],
  currentTodo: null,
  todoToAdd: null,
  searchTitle: "",
  currentIndex: -1,
  message: "",
  submitted: false,
};

function rootReducer(state = initialState, action) {
  let mappings = null;

  switch (action.type) {
    case SET_CURRENT_TODO:
      return {
        ...state,
        currentTodo: { ...state.currentTodo, ...action.payload },
      };

    case SET_TODO_TO_ADD:
      return { ...state, todoToAdd: action.payload };

    case SET_SEARCH_TITLE:
      return { ...state, searchTitle: action.payload };

    case SET_CURRENT_INDEX:
      return { ...state, currentIndex: action.payload };

    case SET_MESSAGE:
      return { ...state, message: action.payload };

    case SET_SUBMITTED:
      return { ...state, submitted: action.payload };

    case SET_TODOS:
      return { ...state, todos: action.payload };

    case ADD_TODO_IN_STATE:
      return { ...state, todos: state.todos.concat(action.payload) };

    case UPDATE_TODO_IN_STATE:
      mappings = state.todos;
      const idx = mappings.findIndex((t) => t._id === action.payload.id);

      if (mappings && mappings[idx]) {
        let todo = action.payload.todo;
        todo.dueDate = todo.dueDate.toISOString();
        delete todo.id;
        mappings[idx] = { ...mappings[idx], ...todo };
      }

      return { ...state, todos: mappings };

    case DELETE_TODO_IN_STATE:
      mappings = state.todos.filter((t) => t._id !== action.payload.id);
      return { ...state, todos: mappings };

    case DELETE_TODOS:
      return { ...state, todos: [] };

    case DATA_LOADED:
      return state;

    case API_ERRORED:
      return state;

    default:
      return state;
  }
}

export default rootReducer;
