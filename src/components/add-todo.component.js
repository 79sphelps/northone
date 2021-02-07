import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-date-picker";

import { addTodo, setTodoToAdd, setSubmitted } from "../redux/actions";
import { selectTodoToAdd, selectSubmitted } from "../redux/selectors";
import { formatDate } from "../redux/utils";


const AddTodo = () => {
  const dispatch = useDispatch();
  let TodoToAdd = useSelector(selectTodoToAdd);
  const submitted = useSelector(selectSubmitted);
  const [dateValue, onChange] = useState(new Date());

  if (!TodoToAdd) {
    let todoToAdd = JSON.parse(localStorage.getItem("todoToAdd"));
    if (!todoToAdd) {
      todoToAdd = {
        id: null,
        title: "",
        description: "",
        status: false,
        dueDate: formatDate(new Date()),
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
  };

  const handleInputChange = (event) => {
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
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={() => newTodo()}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={TodoToAdd.title}
              onChange={(event) => handleInputChange(event)}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={TodoToAdd.description}
              onChange={(event) => handleInputChange(event)}
              name="description"
            />
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>{" "}
            <DatePicker onChange={onChange} value={dateValue} />
          </div>

          <button
            onClick={() => saveTodo(TodoToAdd)}
            className="btn btn-success"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTodo;