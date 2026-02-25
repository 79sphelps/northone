import { createRoot } from "react-dom/client";
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { router } from "./app/router";
import store from './redux/store';

const root = createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>,
);