import { createStore, applyMiddleware, compose } from "redux";
import { useDispatch } from 'react-redux';
import createSagaMiddleware from "redux-saga";
import apiSaga from "../saga/api-sagas.ts";
import reducers from "../reducers/index.ts";

// For Redux DevTools Extension --> npm install --save-dev redux-devtools-extension
// ** We shouldn't have to do this if the package is installed but it doesn't work without it **
declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
