import {
  SET_CURRENT_TODO,
  GET_CURRENT_TODO,
  SET_TODO_TO_ADD,
  GET_TODO_TO_ADD,
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
  SET_TODOS,
  GET_TODOS,
  GET_TODOS_SUCCESSFUL,
  GET_TODO,
  ADD_TODO,
  ADD_TODO_SUCCESSFUL,
  UPDATE_TODO,
  UPDATE_TODO_SUCCESSFUL,
  DELETE_TODO,
  DELETE_TODO_SUCCESSFUL,
  DELETE_TODOS,
  DELETE_TODOS_SUCCESSFUL,
  API_ERRORED,
} from "../constants/action.types";

const setCurrentTodo = (payload) => {
  return { type: SET_CURRENT_TODO, payload };
};

const getCurrentTodo = (payload) => {
  return { type: GET_CURRENT_TODO };
};

const setTodoToAdd = (payload) => {
  return { type: SET_TODO_TO_ADD, payload };
};

const getTodoToAdd = (payload) => {
  return { type: GET_TODO_TO_ADD };
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

const setTodos = (payload) => {
  return { type: SET_TODOS, payload };
};

const getTodos = (payload) => {
  return { type: GET_TODOS };
};

const getTodosSuccessful = (payload) => {
  return { type: GET_TODOS_SUCCESSFUL };
};

const getTodo = (payload) => {
  return { type: GET_TODO, payload };
};

const addTodo = (payload) => {
  return { type: ADD_TODO, payload };
};

const addTodoSuccessful = (payload) => {
  return { type: ADD_TODO_SUCCESSFUL, payload };
};

const updateTodo = (payload) => {
  return { type: UPDATE_TODO, payload };
};

const updateTodoSuccessful = (payload) => {
  return { type: UPDATE_TODO_SUCCESSFUL, payload };
};

const deleteTodo = (payload) => {
  return { type: DELETE_TODO, payload };
};

const deleteTodoSuccessful = (payload) => {
  return { type: DELETE_TODO_SUCCESSFUL, payload };
};

const deleteTodos = (payload) => {
  return { type: DELETE_TODOS };
};

const deleteTodosSuccessful = (payload) => {
  return { type: DELETE_TODOS_SUCCESSFUL, payload };
};

const apiErrored = (payload) => {
  return { type: API_ERRORED, payload };
};

export {
  setCurrentTodo,
  getCurrentTodo,
  setTodoToAdd,
  getTodoToAdd,
  findByTitle,
  setSearchTitle,
  getSearchTitle,
  setCurrentIndex,
  getCurrentIndex,
  setMessage,
  getMessage,
  setSubmitted,
  getSubmitted,
  setTodos,
  getTodos,
  getTodosSuccessful,
  deleteTodosSuccessful,
  updateTodoSuccessful,
  deleteTodoSuccessful,
  addTodoSuccessful,
  findByTitleSuccessful,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
  deleteTodos,
  apiErrored,
};
