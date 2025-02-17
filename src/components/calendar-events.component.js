import React, { useState, useEffect, useRef } from "react";
import { Link , useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TimePicker from "react-time-picker";
import { faEdit, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-date-picker";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  getCalendarEvents,
  deleteCalendarEvents,
  findByTitle,
  setSearchTitle,
  setCurrentIndex,
  setCurrentCalendarEvent,
} from "../redux/actions";
import {
  selectCalendarEvents,
  selectCurrentCalendarEvent,
  selectCurrentIndex,
  selectSearchTitle,
} from "../redux/selectors";
import { formatDate } from "../redux/utils";
import { addCalendarEvent } from "../redux/actions";


const CalendarEvents = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const datePicker = useRef({ isOpen: false });
  const calendarEvents = useSelector(selectCalendarEvents);
  const currentCalendarEvent = useSelector(selectCurrentCalendarEvent);
  const currentIndex = useSelector(selectCurrentIndex);
  const searchTitle = useSelector(selectSearchTitle);

  let initialEvent = {
    id: null,
    title: "",
    description: "",
    status: false,
    dueDate: formatDate(new Date()),
    start: "",
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [dateValue, onChange] = useState(new Date());
  const [timeValue, onChangeTimeValue] = useState(""); // useState('10:00');
  const [newEvent, setNewEvent] = useState(initialEvent);

  useEffect(() => {
    retrieveCalendarEvents();
    // checkCurrentIndex();
  }, []);

  const mapCalendarEventEventsToCalendar = (arr = []) => {
    const result = arr.map((obj) => {
      const res = {};
      res["title"] = obj["title"];
      res["date"] = formatDate(obj["dueDate"]);
      res["start"] = obj["start"]
        ? res["date"] + "T" + obj["start"] + ":00"
        : res["date"] + "T12:00:00";
      res["id"] = obj["_id"];
      res["createdAt"] = obj["createdAt"];
      res["description"] = obj["description"];
      res["dueDate"] = obj["dueDate"];
      res["status"] = obj["status"];
      res["updatedAt"] = obj["updatedAt"];
      res["start2"] = obj["start"];
      return res;
    });
    return result;
  };

  const retrieveCalendarEvents = () => {
    dispatch(getCalendarEvents());
  };

  // const checkCurrentIndex = () => {
  //   if (!currentIndex) {
  //     dispatch(setCurrentCalendarEvent(JSON.parse(localStorage.getItem('currentCalendarEvent'))));
  //     dispatch(setCurrentIndex(JSON.parse(localStorage.getItem('currentIndex'))));
  //   }
  // };

  const onChangeSearchTitle = (event) => {
    event.preventDefault();
    dispatch(setSearchTitle(event.target.value));
  };

  const refreshList = () => {
    retrieveCalendarEvents();
    dispatch(setCurrentCalendarEvent(null));
    dispatch(setCurrentIndex(-1));
  };

  const setActiveCalendarEvent = (calendarEvent, index) => {
    dispatch(setCurrentCalendarEvent(calendarEvent));
    dispatch(setCurrentIndex(index));
    if (datePicker && datePicker.current && datePicker.current.openCalendar) {
      datePicker.current.openCalendar();
    }
    localStorage.setItem("currentCalendarEvent", JSON.stringify(calendarEvent));
    localStorage.setItem("currentIndex", JSON.stringify(currentIndex));
  };

  const removeAllCalendarEvents = () => {
    dispatch(deleteCalendarEvents());
    refreshList();
  };

  const findItemByTitle = () => {
    dispatch(findByTitle(searchTitle));
    // dispatch(setCurrentCalendarEvent(null));
  };

  function handleDateSelect(selectInfo) {
    setShow(true);
  }

  const saveNewEvent = () => {
    var data = {
      title: newEvent.title,
      description: newEvent.description,
      status: false,
      dueDate: dateValue,
      start: timeValue,
    };
    dispatch(addCalendarEvent(data));
    setShow(false);
    setNewEvent(initialEvent);
  };

  const handleEventChange = (v) => {
    v.preventDefault();
    const { name, value } = v.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  function handleEventClick(clickInfo) {
    let calendarEvent = {
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      description: clickInfo.event.extendedProps.description,
      status: clickInfo.event.status,
      dueDate: clickInfo.event.extendedProps.dueDate,       // dueDate: formatDate(new Date()),
      start: clickInfo.event.extendedProps.start2,
    };

    setActiveCalendarEvent(calendarEvent, 0);
    navigate("/calendar-events/" + clickInfo.event.id);
  }
  
  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }

  return (
    <div className="list row">
      <div className="col-md-8" style={{ margin: "0 auto" }}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={(searchTitle) => onChangeSearchTitle(searchTitle)}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => findItemByTitle()}
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Calendar Events</h4>
        <ul className="list-group">
          {calendarEvents &&
            calendarEvents.map((calendarEvent, index) => (
              <li
                className={
                  "list-group-item-action list-group-item " +
                  (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveCalendarEvent(calendarEvent, index)}
                key={index}
              >
                {calendarEvent.title}
              </li>
            ))}
        </ul>
        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={() => removeAllCalendarEvents()}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentCalendarEvent ? (
          <div>
            <h4>Calendar Item</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentCalendarEvent.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentCalendarEvent.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentCalendarEvent.status ? "Done" : "Pending"}
            </div>
            {/* <div>
              <label>
                <strong>Due Date:</strong>
              </label>{" "}
              {currentCalendarEvent.dueDate}
            </div> */}
            <div className="form-group">
              <label htmlFor="dueDate">
                <strong>Due Date:</strong>
              </label>{" "}
              <DatePicker
                isOpen={false}
                ref={datePicker}
                value={new Date(currentCalendarEvent.dueDate)}
              />
            </div>
            <Link
              to={"/calendar-events/" + currentCalendarEvent._id}
              className="btn btn-sm btn-warning"
            >
              Edit <FontAwesomeIcon icon={faEdit} />
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Click on a calendar item to show detailed info</p>
          </div>
        )}
      </div>
      <div className="col-md-12" id="calendar">
        {calendarEvents ? (
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            // plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            weekends={true}
            events={mapCalendarEventEventsToCalendar(calendarEvents)}
            // events={INITIAL_EVENTS}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={handleEventClick}
            // eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          />
        ) : (
          <div>No Calendar Events to Show</div>
        )}
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        centered="true"
        scrollable={true}
        style={{
          marginTop: "100px",
          marginBottom: "75px",
          height: "90%",
          width: "90%",
          marginLeft: "5%",
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "black" }}>Create New Event</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: "black" }}>
          <div className="submit-form">
            <div>
              <div className="form-group">
                <label htmlFor="title">Title: </label>{" "}
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  required
                  value={newEvent && newEvent.title ? newEvent.title : ""}
                  onChange={(e) => handleEventChange(e)}
                  name="title"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description: </label>{" "}
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  required
                  value={newEvent.description ? newEvent.description : ""}
                  onChange={(e) => handleEventChange(e)}
                  name="description"
                />
              </div>
              <div className="form-group">
                <label htmlFor="dueDate">Due Date:</label>{" "}
                <DatePicker
                  onChange={onChange}
                  value={dateValue}
                />
              </div>
              <div>
                <label htmlFor="dueDate">Time Start:</label>{" "}
                <TimePicker onChange={onChangeTimeValue} value={timeValue} />
              </div>
              <div>
                <button
                  onClick={() => saveNewEvent()}
                  className="btn btn-success"
                  style={{ marginTop: "20px" }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CalendarEvents;