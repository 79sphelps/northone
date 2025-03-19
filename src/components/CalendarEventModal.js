import { useState } from "react";
import { useDispatch } from "react-redux";
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { addCalendarEvent } from "../redux/actions";
import { formatDate } from "../redux/utils";

const CalendarEventModal = ({
  show,
  setShow,
}) => {
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

  return (
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
              <DatePicker onChange={onChange} value={dateValue} />
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
  );
};

export default CalendarEventModal;
