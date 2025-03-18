import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
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
import CalendarList from "./CalendarList";
import CalendarListDetail from "./CalendarListDetail";
import CalendarEventModal from "./CalendarEventModal";
import Calendar from "./Calendar";
import CalendarSearchBox from "./CalendarSearchBox";


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
      dueDate: clickInfo.event.extendedProps.dueDate, // dueDate: formatDate(new Date()),
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
      <CalendarSearchBox
        searchTitle={searchTitle}
        onChangeSearchTitle={onChangeSearchTitle}
        findItemByTitle={findItemByTitle}
        faSearch={faSearch}
      />
      <CalendarList
        calendarEvents={calendarEvents}
        setActiveCalendarEvent={setActiveCalendarEvent}
        removeAllCalendarEvents={removeAllCalendarEvents}
        currentIndex={currentIndex}
      />
      <CalendarListDetail
        currentCalendarEvent={currentCalendarEvent}
        datePicker={datePicker}
      />
      <Calendar
        calendarEvents={calendarEvents}
        mapCalendarEventEventsToCalendar={mapCalendarEventEventsToCalendar}
        handleDateSelect={handleDateSelect}
        renderEventContent={renderEventContent}
        handleEventClick={handleEventClick}
      />
      <CalendarEventModal
        show={show}
        handleClose={handleClose}
        newEvent={newEvent}
        handleEventChange={handleEventChange}
        onChange={onChange}
        dateValue={dateValue}
        onChangeTimeValue={onChangeTimeValue}
        timeValue={timeValue}
        saveNewEvent={saveNewEvent}
      />
    </div>
  );
};

export default CalendarEvents;
