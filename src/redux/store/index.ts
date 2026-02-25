import { legacy_createStore as createStore, applyMiddleware, compose } from "redux";
import { useDispatch } from "react-redux";
import createSagaMiddleware from "redux-saga";
import apiSaga from "../saga/api-sagas";
import rootReducer from "../reducers";

/*
  Setup Saga Middleware
*/
const sagaMiddleware = createSagaMiddleware();

/*
  Enable Redux DevTools only in development
*/
const composeEnhancers =
  (process.env.NODE_ENV !== "production" &&
    typeof window !== "undefined" &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

/*
  Create Store
*/
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

/*
  Run Sagas
*/
sagaMiddleware.run(apiSaga);

/*
  Typed Hooks & Types
*/
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
