// import { Switch, Route, Link } from "react-router-dom";
import {
  Route,
  Routes,
  Link,
  BrowserRouter as Router,
  useLocation,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { setSubmitted, setMessage } from "./redux/actions";
// import AddCalendarEvent from "./components/add-calendar-event.component";
import AddCalendarEvent2 from "./components/add-calendar-event2.component";
import CalendarEvent from "./components/calendar-event2.component";
import CalendarEvents from "./components/calendar-events.component";
import NotFound from "./components/not-found";

export const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="location-display">{location.pathname}</div>;
};

const App = () => {
  const dispatch = useDispatch();
  const initializeCalendarEventToAdd = () => {
    dispatch(setSubmitted(false));
    dispatch(setMessage(""));
  };

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/" className="navbar-brand">
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
        <div className="container mt-3">
          <Routes>
            <Route exact path={"/"} element={<CalendarEvents />} />
            <Route
              exact
              path={"/calendar-events"}
              element={<CalendarEvents />}
            />
            {/* <Route exact path="/add" element={<AddCalendarEvent />} /> */}
            <Route exact path="/add" element={<AddCalendarEvent2 />} />
            <Route path="/calendar-events/:id" element={<CalendarEvent />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {/* <LocationDisplay /> */}
        </div>
      </div>
    </Router>
  );
};

export default App;
