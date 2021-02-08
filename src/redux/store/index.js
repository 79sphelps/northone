import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import apiSaga from "../saga/api-sagas.js";
import reducers from "../reducers";

const initialiseSagaMiddleware = createSagaMiddleware();
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// // dev tools middleware
// const reduxDevTools =
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(
  reducers,
  storeEnhancers(applyMiddleware(initialiseSagaMiddleware))
  // storeEnhancers(applyMiddleware(initialiseSagaMiddleware), reduxDevTools)
);

initialiseSagaMiddleware.run(apiSaga);

export default store;
