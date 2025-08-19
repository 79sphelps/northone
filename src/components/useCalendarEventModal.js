import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCalendarEvent } from "../redux/actions";
import { formatDate } from "../redux/utils";

export function useCalendarEventModal({ setShow }) {
  const dispatch = useDispatch();
  const [dateValue, onChange] = useState(new Date());
  const [timeValue, onChangeTimeValue] = useState(""); // useState('10:00');

  const handleClose = () => setShow(false);

  let initialEvent = {
    id: null,
    title: "",
    description: "",
    status: false,
    dueDate: formatDate(new Date()),
    start: "",
  };
  const [newEvent, setNewEvent] = useState(initialEvent);

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

  return {
    handleClose,
    saveNewEvent,
    handleEventChange,
    newEvent,
  };
}
