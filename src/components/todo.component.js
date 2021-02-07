import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentTodo,
  setMessage,
  updateTodo,
  deleteTodo,
} from "../redux/actions";
import { selectCurrentTodo, selectMessage } from "../redux/selectors";
import DatePicker from "react-date-picker";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Todo = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    clearMessage();
    checkLocalStorage();
  }, []);

  const currentTodo = useSelector(selectCurrentTodo);
  const message = useSelector(selectMessage);
  const [dateValue, onChange] = useState(
    new Date(
      currentTodo && currentTodo.dueDate ? currentTodo.dueDate : new Date()
    )
  );

  const clearMessage = () => dispatch(setMessage(""));
  const checkLocalStorage = () => {
    if (!currentTodo) {
      let todo = localStorage.getItem("currentTodo");
      dispatch(setCurrentTodo(JSON.parse(todo)));
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    dispatch(setCurrentTodo({ ...currentTodo, [name]: value }));
  };

  const updateStatus = (status) => {
    var data = {
      id: currentTodo._id,
      title: currentTodo.title,
      description: currentTodo.description,
      status: status,
      dueDate: dateValue,
    };
    dispatch(updateTodo({ id: currentTodo._id, todo: data }));
  };

  const updateTodoUnderEdit = () => {
    currentTodo.dueDate = dateValue;
    dispatch(updateTodo({ id: currentTodo._id, todo: currentTodo }));
  };

  const deleteTodoUnderEdit = () => {
    dispatch(deleteTodo({ id: currentTodo._id }));
    props.history.push("/todos");
  };

  return (
    <div>
      {currentTodo ? (
        <div className="edit-form">
          <h4>To Do</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">
                <strong>Title:</strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentTodo.title}
                onChange={(currentTodo) => handleInputChange(currentTodo)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">
                <strong>Description:</strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentTodo.description}
                onChange={(currentTodo) => handleInputChange(currentTodo)}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>{" "}
              </label>
              {currentTodo.status ? "Done" : "Pending"}
            </div>

            <div className="form-group">
              <label htmlFor="dueDate">
                <strong>Due Date:</strong>
              </label>{" "}
              <DatePicker onChange={onChange} value={dateValue} />
            </div>
          </form>

          {currentTodo.status ? (
            <button
              className="btn btn-primary mr-2"
              onClick={() => updateStatus(false)}
            >
              Mark Pending
            </button>
          ) : (
            <button
              className="btn btn-primary mr-2"
              onClick={() => updateStatus(true)}
            >
              Mark Done
            </button>
          )}

          <button
            className="btn btn-danger mr-2"
            onClick={() => deleteTodoUnderEdit()}
          >
            Delete{' '}<FontAwesomeIcon icon={faTrash} />
          </button>

          <button
            type="submit"
            className="btn btn-success mr-2"
            onClick={() => updateTodoUnderEdit()}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a "To Do"...</p>
        </div>
      )}
    </div>
  );
};

export default Todo;
