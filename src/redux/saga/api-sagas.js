import { takeEvery, call, put } from "redux-saga/effects";
import TodoDataService from "../services/todo.service.js";
import {
  SET_CURRENT_TODO,
  FIND_BY_TITLE,
  SET_CURRENT_INDEX,
  SET_MESSAGE,
  SET_SUBMITTED,
  SET_TODOS,
  SET_TODO_TO_ADD,
  GET_TODOS,
  ADD_TODO,
  ADD_TODO_IN_STATE,
  UPDATE_TODO,
  UPDATE_TODO_IN_STATE,
  DELETE_TODO,
  DELETE_TODO_IN_STATE,
  DELETE_TODOS,
  API_ERRORED
} from "../constants/action.types";

export default function* watcherSaga() {
  yield takeEvery(GET_TODOS, getTodosWorkerSaga);
  yield takeEvery(DELETE_TODOS, deleteTodosWorkerSaga);
  yield takeEvery(FIND_BY_TITLE, findByTitleWorkerSaga);
  yield takeEvery(UPDATE_TODO, updateTodoWorkerSaga);
  yield takeEvery(DELETE_TODO, deleteTodoWorkerSaga);
  yield takeEvery(ADD_TODO, addTodoWorkerSaga);
}

function* getTodosWorkerSaga() {
  try {
    const payload = yield call(getTodos);
    yield put({ type: SET_TODOS, payload });
  } catch (e) {
    yield put({ type: API_ERRORED, payload: e });
  }
}

function* deleteTodosWorkerSaga(action) {
  try {
    yield call(deleteTodos);
    let ary = [];
    yield put({ type: SET_TODOS, ary });
  } catch (e) {
    yield put({ type: API_ERRORED, payload: e });
  }
}

function* findByTitleWorkerSaga(action) {
  try {
    const payload = yield call(findByTitle, action.payload);
    yield put({ type: SET_TODOS, payload });
    // yield put({ type: SET_CURRENT_TODO });
  } catch (e) {
    yield put({ type: API_ERRORED, payload: e });
  }
}

function* updateTodoWorkerSaga(action) {
  try {
    yield call(updateTodo, action.payload);
    const payload = action.payload;
    yield put({ type: UPDATE_TODO_IN_STATE, payload });
    let todo = action.payload.todo;
    yield put({ type: SET_CURRENT_TODO, payload: todo });
    const message = "The todo was updated successfully!";
    yield put({ type: SET_MESSAGE, payload: message });
  } catch (e) {
    yield put({ type: API_ERRORED, payload: e });
  }
}

function* deleteTodoWorkerSaga(action) {
  try {
    yield call(deleteTodo, action.payload.id);
    const payload = action.payload;
    yield put({ type: DELETE_TODO_IN_STATE, payload });
    const message = "The todo was deleted successfully!";
    yield put({ type: SET_MESSAGE, payload: message });
    yield put({ type: SET_CURRENT_TODO, payload: null });
    yield put({ type: SET_CURRENT_INDEX, payload: -1 });
    // yield put(push('/todos'));
  } catch (e) {
    yield put({ type: API_ERRORED, payload: e });
  }
}

function* addTodoWorkerSaga(action) {
  try {
    const payload = yield call(addTodo, action.payload);
    yield put({ type: ADD_TODO_IN_STATE, payload });
    yield put({ type: SET_SUBMITTED, payload: true });
    yield put({ type: SET_TODO_TO_ADD, payload: null });
  } catch (e) {
    yield put({ type: API_ERRORED, payload: e });
  }
}

const getTodos = () => {
  return TodoDataService.getTodos()
    .then((response) => response.data)
    .catch((e) => console.log(e));
};

const addTodo = (data) => {
  return TodoDataService.addTodo(data)
    .then((response) => response.data)
    .catch((e) => console.log(e));
};

const updateTodo = (payload) => {
  return TodoDataService.updateTodo(payload.id, payload.todo)
    .then((response) => response.data)
    .catch((e) => console.log(e));
};

const deleteTodo = (id) => {
  return TodoDataService.deleteTodo(id)
    .then((response) => response.data)
    .catch((e) => console.log(e));
};

const deleteTodos = () => {
  return TodoDataService.deleteTodos()
    .then((response) => response.data)
    .catch((e) => console.log(e));
};

const findByTitle = (title) => {
  return TodoDataService.findByTitle(title)
    .then((response) => response.data)
    .catch((e) => console.log(e));
};
