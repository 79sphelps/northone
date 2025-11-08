import React, { useEffect } from "react";
import {
  Route,
  Routes,
  Link,
  BrowserRouter as Router,
  useLocation,
} from "react-router-dom";
import { useAppDispatch } from "./redux/store/index.ts";
import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddCalendarEvent from "./components/AddCalendarEvent";
import UpdateCalendarEvent from "./components/UpdateCalendarEvent.tsx";
import CalendarEvents from "./components/CalendarEvents.tsx";
import NotFound from "./components/NotFound.tsx";
import { setSubmitted, setMessage } from "./redux/actions";
import { ToastContainer, toast } from 'react-toastify';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="location-display">{location.pathname}</div>;
};

const App = () => {
  const dispatch = useAppDispatch();
  const initializeCalendarEventToAdd = () => {
    dispatch(setSubmitted(false));
    dispatch(setMessage(""));
  };

  useEffect((): any => { 
    toast.info("Because the backend uses the free tier of Render.com, it may take up to 30+ seconds to wake up the server on the first request. Annoying, yes, but...free has a cost, LOL.")
  }, []);

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/" className="navbar-brand" style={{ marginLeft: "10px" }}>
            <FontAwesomeIcon icon={faHome} />
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/"} className="nav-link">
                Calendar Events
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={"/add"}
                className="nav-link"
                onClick={() => initializeCalendarEventToAdd()}
              >
                Add <FontAwesomeIcon icon={faPlus} />
              </Link>
            </li>
          </div>
        </nav>

        <ToastContainer 
          position="top-center"
          autoClose={30000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          // transition={Bounce}
        />

        <div className="container mt-3">
          <Routes>
            <Route path={"/"} element={<CalendarEvents />} />
            <Route path={"/calendar-events"} element={<CalendarEvents />} />
            <Route path="/add" element={<AddCalendarEvent />} />
            <Route
              path="/calendar-events/:id"
              element={<UpdateCalendarEvent />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {/* <LocationDisplay /> */}
        </div>
      </div>
    </Router>
  );
};

export default App;
