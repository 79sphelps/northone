import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCalendarEvent } from "../redux/actions";
import { formatDate } from "../redux/utils";

export function useCalendarEventModal({
  setShow,
}: {
  setShow: (show: boolean) => void;
}) {
  const dispatch = useDispatch();
  const [dateValue, setDateValue] = useState(new Date() as unknown as string); // to satisfy type requirement
  const [timeValue, setTimeValue] = useState(""); // useState('10:00');

  const handleClose = () => setShow(false);

  let initialEvent = {
    id: null,
    title: "",
    description: "",
    status: false,
    dueDate: formatDate(new Date()) as unknown as string, // to satisfy type requirement
    start: "",
  };
  const [newEvent, setNewEvent] = useState(initialEvent);

  const saveNewEvent = () => {
    var data = {
      id: newEvent.id, // or generate a new id if needed
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

  const handleEventChange = (v: React.ChangeEvent<HTMLInputElement>) => {
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
