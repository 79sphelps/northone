import { takeEvery, call, put } from "redux-saga/effects";
import TodoDataService from "../services/todo.service.js";
import {
  SET_CURRENT_TODO,
  FIND_BY_TITLE,
  SET_CURRENT_INDEX,
  SET_MESSAGE,
  SET_SUBMITTED,
  GET_TODOS_SUCCESSFUL,
  SET_TODO_TO_ADD,
  GET_TODOS,
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  DELETE_TODOS,
  DELETE_TODOS_SUCCESSFUL,
  API_ERRORED,
  UPDATE_TODO_SUCCESSFUL,
  DELETE_TODO_SUCCESSFUL,
  ADD_TODO_SUCCESSFUL,
  FIND_BY_TITLE_SUCCESSFUL,
  IS_FETCHING,
  IS_DELETING_ALL,
  IS_FINDING,
  IS_UPDATING,
  IS_DELETING,
  IS_ADDING,
} from "../constants/action.types";

/*
redux-saga is a library that aims to make application side effects (i.e. asynchronous things like data
fetching and impure things like accessing the browser cache) easier to manage, more efficient to
execute, simple to test, and better at handling failures.

Generators can pause and restart — be exited and re-entered — and actually remember the context/state
of the function over time.

Each yield in a generator basically represents an asynchronous step in a more synchronous/sequential
process — somewhat like await in an async function.

Basic Flow:
- a watcherSaga is a saga that watches for an action to be dispatched to the Store, triggering a
  workerSaga.
- takeLatest is a helper function provided by redux-saga that will trigger a new workerSaga when
  it sees an GET_TODOS, while cancelling any previously triggered workerSaga still in process.
- getTodos simply uses axios to request the todo list from the todos API and returns a Promise
  for the response.
- workerSaga attempts to getTodos, using another redux-saga helper function call, and stores the
  result (a resolved or failed Promise) in a response variable.
- If getTodos was a success, we extract the todo list from the response and dispatch an
  GET_TODOS_SUCCESS action with todo list in the payload to the Store, using ANOTHER redux-saga
  helper function put.
- If there was an error with getTodos, we let the Store know about it by dispatching an
  API_ERRORED action with the error.
*/

export default function* watcherSaga() {
  yield takeEvery(GET_TODOS, getTodosWorkerSaga);
  yield takeEvery(DELETE_TODOS, deleteTodosWorkerSaga);
  yield takeEvery(FIND_BY_TITLE, findByTitleWorkerSaga);
  yield takeEvery(UPDATE_TODO, updateTodoWorkerSaga);
  yield takeEvery(DELETE_TODO, deleteTodoWorkerSaga);
  yield takeEvery(ADD_TODO, addTodoWorkerSaga);
}

export function* getTodosWorkerSaga() {
  try {
    yield put({ type: IS_FETCHING });
    const payload = yield call(getTodos);
    yield put({ type: GET_TODOS_SUCCESSFUL, payload });
  } catch (e) {
    yield put({ type: API_ERRORED, payload: e });
  }
}

export function* deleteTodosWorkerSaga(action) {
  try {
    yield put({ type: IS_DELETING_ALL });
    yield call(deleteTodos);
    let ary = [];
    yield put({ type: DELETE_TODOS_SUCCESSFUL, ary });
  } catch (e) {
    yield put({ type: API_ERRORED, payload: e });
  }
}

export function* findByTitleWorkerSaga(action) {
  try {
    yield put({ type: IS_FINDING });
    const payload = yield call(findByTitle, action.payload);
    yield put({ type: FIND_BY_TITLE_SUCCESSFUL, payload });

    yield put({ type: SET_CURRENT_TODO, payload: null });
    yield put({ type: SET_CURRENT_INDEX, payload: -1 });
  } catch (e) {
    yield put({ type: API_ERRORED, payload: e });
  }
}

export function* updateTodoWorkerSaga(action) {
  try {
    yield put({ type: IS_UPDATING });
    yield call(updateTodo, action.payload);
    const payload = action.payload;
    yield put({ type: UPDATE_TODO_SUCCESSFUL, payload });

    let todo = action.payload.todo;
    yield put({ type: SET_CURRENT_TODO, payload: todo });

    const message = "The todo was updated successfully!";
    yield put({ type: SET_MESSAGE, payload: message });
  } catch (e) {
    yield put({ type: API_ERRORED, payload: e });
  }
}

export function* deleteTodoWorkerSaga(action) {
  try {
    yield put({ type: IS_DELETING });
    yield call(deleteTodo, action.payload.id);
    const payload = action.payload;
    yield put({ type: DELETE_TODO_SUCCESSFUL, payload });

    const message = "The todo was deleted successfully!";
    yield put({ type: SET_MESSAGE, payload: message });
    yield put({ type: SET_CURRENT_TODO, payload: null });
    yield put({ type: SET_CURRENT_INDEX, payload: -1 });
    // yield put(push('/todos'));
  } catch (e) {
    yield put({ type: API_ERRORED, payload: e });
  }
}

export function* addTodoWorkerSaga(action) {
  try {
    yield put({ type: IS_ADDING });
    const payload = yield call(addTodo, action.payload);
    yield put({ type: ADD_TODO_SUCCESSFUL, payload });

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
