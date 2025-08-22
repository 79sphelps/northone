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
import AddCalendarEvent from "./components/AddCalendarEvent";
import UpdateCalendarEvent from "./components/UpdateCalendarEvent";
import CalendarEvents from "./components/CalendarEvents";
import NotFound from "./components/NotFound";
import { setSubmitted, setMessage } from "./redux/actions";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

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
            <Route exact path="/add" element={<AddCalendarEvent />} />
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
