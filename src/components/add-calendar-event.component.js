import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-date-picker";
import { addTodo, setTodoToAdd, setSubmitted } from "../redux/actions";
import { selectTodoToAdd, selectSubmitted } from "../redux/selectors";
import { formatDate } from "../redux/utils";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

const AddCalendarEvent = () => {
  const dispatch = useDispatch();
  let TodoToAdd = useSelector(selectTodoToAdd);
  const submitted = useSelector(selectSubmitted);
  const [dateValue, onChange] = useState(new Date());
  const [timeValue, onChangeTimeValue] = useState(""); // useState('10:00');

  // useEffect(() => {
  //   const storedTodoToAdd = JSON.parse(localStorage.getItem("todoToAdd"));
  //   if (storedTodoToAdd) {
  //     dispatch(setTodoToAdd(storedTodoToAdd));
  //   }
  // }, []);

  // useEffect(() => {
  //   if (!TodoToAdd) {
  //     let todoToAdd = {
  //       id: null,
  //       title: "",
  //       description: "",
  //       status: false,
  //       dueDate: formatDate(new Date()),
  //     };
  //     localStorage.setItem("todoToAdd", JSON.stringify(todoToAdd));
  //     TodoToAdd = todoToAdd;
  //   } else {
  //     localStorage.setItem("todoToAdd", JSON.stringify(TodoToAdd));
  //   }
  // }, [TodoToAdd]);

  if (!TodoToAdd) {
    let todoToAdd = JSON.parse(localStorage.getItem("todoToAdd"));
    if (!todoToAdd) {
      todoToAdd = {
        id: null,
        title: "",
        description: "",
        status: false,
        dueDate: formatDate(new Date()),
        start: "",
      };
      localStorage.setItem("todoToAdd", JSON.stringify(todoToAdd));
    }
    dispatch(setTodoToAdd(todoToAdd));
    TodoToAdd = todoToAdd;
  }

  let initialTodoState = {
    id: null,
    title: "",
    description: "",
    status: false,
    dueDate: formatDate(new Date()),
    start: "",
  };

  const handleInputChange = (event) => {
    event.preventDefault(); // prevent a browser reload/refresh
    const { name, value } = event.target;
    dispatch(setTodoToAdd({ ...TodoToAdd, [name]: value }));
  };

  const saveTodo = () => {
    if (!dateValue) return;
    var data = {
      title: TodoToAdd.title,
      description: TodoToAdd.description,
      status: false,
      dueDate: dateValue,
      start: timeValue,
    };
    dispatch(addTodo(data));
    localStorage.removeItem("todoToAdd");
  };

  const newTodo = () => {
    dispatch(setTodoToAdd(initialTodoState));
    dispatch(setSubmitted(false));
  };

  return (
    <div className="submit-form">
      {submitted && TodoToAdd ? (
        <div>
          <h4>The new calendar item was created successfully!</h4>
          <button className="btn btn-success" onClick={() => newTodo()}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <h1>Add a New Calendar Event</h1>
          <div className="form-group">
            <label htmlFor="title">Title: </label>{" "}
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={TodoToAdd && TodoToAdd.title ? TodoToAdd.title : ""}
              onChange={(event) => handleInputChange(event)}
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
              value={
                TodoToAdd && TodoToAdd.description ? TodoToAdd.description : ""
              }
              onChange={(event) => handleInputChange(event)}
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
              onClick={() => saveTodo(TodoToAdd)}
              className="btn btn-success"
              style={{ marginTop: "20px" }}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCalendarEvent;
