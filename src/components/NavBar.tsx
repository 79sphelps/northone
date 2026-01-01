import React from "react";
import { Link } from "react-router-dom";
import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface INavBar {
  initializeCalendarEventToAdd: () => void;
}

const NavBar: React.FC<INavBar> = ({ initializeCalendarEventToAdd }) => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <a tabIndex={1} aria-label="This is the home page link" href="/" className="navbar-brand" style={{ marginLeft: "10px" }} data-testid="navbar-home-link-id">
        <FontAwesomeIcon icon={faHome} />
      </a>
      <div className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link tabIndex={2} aria-label="Load all calendar events" to={"/"} className="nav-link" data-testid="navbar-calendar-events-link-id">
            Calendar Events
          </Link>
        </li>
        <li className="nav-item">
          <Link
            tabIndex={3}
            aria-label="Add a new calendar event"
            to={"/add"}
            className="nav-link"
            data-testid="navbar-add-calendar-event-link-id"
            onClick={() => initializeCalendarEventToAdd()}
          >
            Add <FontAwesomeIcon icon={faPlus} />
          </Link>
        </li>
      </div>
    </nav>
  );
};

export default NavBar;
