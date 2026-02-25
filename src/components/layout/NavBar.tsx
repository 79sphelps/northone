import React from "react";
import { Link } from "react-router-dom";
import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface INavBar {
  initializeCalendarEventToAdd: () => void;
}

const NavBar: React.FC<INavBar> = ({ initializeCalendarEventToAdd }) => {
  return (
    <nav className="navbar bg-dark">
      <div className="nav-left">
        <Link
          tabIndex={1}
          aria-label="This is the home page link"
          to="/"
          className="navbar-brand"
          style={{ marginLeft: "10px" }}
          data-testid="navbar-home-link-id"
        >
          <FontAwesomeIcon icon={faHome} style={{ color: "white" }} />
        </Link>
      </div>
      <div className="nav-center">
        <Link
          tabIndex={2}
          aria-label="Load all calendar events"
          to={"/"}
          className="nav-link"
          data-testid="navbar-calendar-events-link-id"
        >
          Calendar Events
        </Link>
      </div>
      <div className="nav-right">
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
      </div>
    </nav>
  );
};

export default NavBar;
