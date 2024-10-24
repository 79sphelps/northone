import React, { useState, useEffect, useRef } from "react";
import { Link , useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { faEdit, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-date-picker";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  getTodos,
  deleteTodos,
  findByTitle,
  setSearchTitle,
  setCurrentIndex,
  setCurrentTodo,
} from "../redux/actions";
import {
  selectTodos,
  selectCurrentTodo,
  selectCurrentIndex,
  selectSearchTitle,
} from "../redux/selectors";
import { formatDate } from "../redux/utils";

import Button from "react-bootstrap/Button";
import { addTodo } from "../redux/actions";
import Modal from "react-bootstrap/Modal";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";


const CalendarEvents = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const datePicker = useRef({ isOpen: false });
  const todos = useSelector(selectTodos);
  const currentTodo = useSelector(selectCurrentTodo);
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
  // const handleShow = () => setShow(true);
  const [dateValue, onChange] = useState(new Date());
  const [timeValue, onChangeTimeValue] = useState(""); // useState('10:00');
  const [newEvent, setNewEvent] = useState(initialEvent);

  useEffect(() => {
    retrieveTodos();
    // checkCurrentIndex();
  }, []);

  const mapTodoEventsToCalendar = (arr = []) => {
    const result = arr.map((obj) => {
      const res = {};
      res["title"] = obj["title"];
      res["date"] = formatDate(obj["dueDate"]);
      // res["start"] = obj["start"] ? obj['start'] : '';
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

  const retrieveTodos = () => {
    dispatch(getTodos());
  };

  // const checkCurrentIndex = () => {
  //   if (!currentIndex) {
  //     dispatch(setCurrentTodo(JSON.parse(localStorage.getItem('currentTodo'))));
  //     dispatch(setCurrentIndex(JSON.parse(localStorage.getItem('currentIndex'))));
  //   }
  // };

  const onChangeSearchTitle = (event) => {
    event.preventDefault(); // prevent a browser reload/refresh
    dispatch(setSearchTitle(event.target.value));
  };

  const refreshList = () => {
    retrieveTodos();
    dispatch(setCurrentTodo(null));
    dispatch(setCurrentIndex(-1));
  };

  const setActiveTodo = (todo, index) => {
    dispatch(setCurrentTodo(todo));
    dispatch(setCurrentIndex(index));
    if (datePicker && datePicker.current && datePicker.current.openCalendar) {
      datePicker.current.openCalendar();
    }
    localStorage.setItem("currentTodo", JSON.stringify(todo));
    localStorage.setItem("currentIndex", JSON.stringify(currentIndex));
  };

  const removeAllTodos = () => {
    dispatch(deleteTodos());
    refreshList();
  };

  const findItemByTitle = () => {
    dispatch(findByTitle(searchTitle));
    // dispatch(setCurrentTodo(null));
  };

  // let eventGuid = 0;
  // let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

  //  const INITIAL_EVENTS = [
  //   {
  //     id: createEventId(),
  //     title: 'All-day event',
  //     start: todayStr
  //   },
  //   {
  //     id: createEventId(),
  //     title: 'Timed event',
  //     start: todayStr + 'T12:00:00'
  //   }
  // ]

  // function createEventId() {
  //   return String(eventGuid++);
  // }

  function handleDateSelect(selectInfo) {
    // let title = prompt("Please enter a new title for your event");
    // let calendarApi = selectInfo.view.calendar;
    // calendarApi.unselect(); // clear date selection
    // if (title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay,
    //   });
    // }

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
    dispatch(addTodo(data));
    setShow(false);
    setNewEvent(initialEvent);
  };

  const handleEventChange = (v) => {
    v.preventDefault(); // prevent a browser reload/refresh
    const { name, value } = v.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  function handleEventClick(clickInfo) {
    // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    //   clickInfo.event.remove()
    // }
    let todo = {
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      description: clickInfo.event.extendedProps.description,
      status: clickInfo.event.status,
      // dueDate: formatDate(new Date()),
      dueDate: clickInfo.event.extendedProps.dueDate,
      start: clickInfo.event.extendedProps.start2,
    };

    setActiveTodo(todo, 0);
    navigate("/calendar-events/" + clickInfo.event.id);
  }

  // function handleEvents(events) {
  //   setCurrentEvents(events)
  // }

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
          {todos &&
            todos.map((todo, index) => (
              <li
                className={
                  "list-group-item-action list-group-item " +
                  (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveTodo(todo, index)}
                key={index}
              >
                {todo.title}
              </li>
            ))}
        </ul>
        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={() => removeAllTodos()}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentTodo ? (
          <div>
            <h4>Calendar Item</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentTodo.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentTodo.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentTodo.status ? "Done" : "Pending"}
            </div>
            {/* <div>
              <label>
                <strong>Due Date:</strong>
              </label>{" "}
              {currentTodo.dueDate}
            </div> */}
            <div className="form-group">
              <label htmlFor="dueDate">
                <strong>Due Date:</strong>
              </label>{" "}
              <DatePicker
                isOpen={false}
                ref={datePicker}
                value={new Date(currentTodo.dueDate)}
              />
            </div>
            <Link
              to={"/calendar-events/" + currentTodo._id}
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
        {todos ? (
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            // plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            weekends={true}
            events={mapTodoEventsToCalendar(todos)}
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
