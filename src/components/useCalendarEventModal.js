import { useState } from "react";
import { useDispatch } from "react-redux";
// import DatePicker from "react-date-picker";
// import TimePicker from "react-time-picker";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
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
        handleEventChange,
        newEvent,
    }
}