import React from 'react';
import { createRoot } from "react-dom/client";
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { router } from "./app/router";
import store from './redux/store';
import App from './App';
import './index.css';

const root = createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
      {/* <App /> */}
      <RouterProvider router={router} />
    </Provider>,
);