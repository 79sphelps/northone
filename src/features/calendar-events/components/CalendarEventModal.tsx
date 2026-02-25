import React, { memo } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";
import { useCalendarEventModal } from "../hooks/useCalendarEventModal";

interface Props {
  show: boolean;
  setShow: (show: boolean) => void;
}

const CalendarEventModal: React.FC<Props> = memo(({ show, setShow }) => {
  const {
    handleClose,
    saveNewEvent,
    handleEventChange,
    newEvent,
    dateValue,
    setDateValue,
    timeValue,
    setTimeValue,
  } = useCalendarEventModal({ setShow });

  return (
    <Modal show={show} onHide={handleClose} centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Create New Event</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="form-group mb-3">
          <label>Title</label>
          <input
            name="title"
            className="form-control"
            value={newEvent.title}
            onChange={handleEventChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Description</label>
          <input
            name="description"
            className="form-control"
            value={newEvent.description}
            onChange={handleEventChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Due Date</label>
          <DatePicker onChange={setDateValue} value={new Date(dateValue)} />
        </div>

        <div className="form-group mb-3">
          <label>Start Time</label>
          <TimePicker onChange={setTimeValue} value={timeValue} />
        </div>

        <button className="btn btn-success" onClick={saveNewEvent}>
          Submit
        </button>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CalendarEventModal;
