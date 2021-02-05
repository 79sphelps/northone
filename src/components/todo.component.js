import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentTodo,
  setCurrentIndex,
  setMessage,
  updateTodo,
  deleteTodo,
} from '../redux/actions';
import TodoDataService from '../redux/services/todo.service.js';
import DatePicker from 'react-date-picker';

const Todo = props => {
  const dispatch = useDispatch();
  const currentTodo = useSelector(state => state.currentTodo);
  const message = useSelector(state => state.message);
  const [dateValue, onChange] = useState(new Date(currentTodo.dueDate));

  const handleInputChange = event => {
    const { name, value } = event.target;
    dispatch(setCurrentTodo({ ...currentTodo, [name]: value }));
  };

  const updateStatus = status => {
    var data = {
      id: currentTodo._id,
      title: currentTodo.title,
      description: currentTodo.description,
      status: status,
      dueDate: dateValue
    };

    TodoDataService.updateTodo(currentTodo._id, data)
      .then(response => {
        dispatch(setCurrentTodo({ ...currentTodo, status: status }));
        dispatch(setMessage(`The todo was marked as ${data.status ? 'Done' : 'Pending'} successfully!`));
        // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateTodoUnderEdit = () => {
    currentTodo.dueDate = dateValue;
    TodoDataService.updateTodo(currentTodo._id, currentTodo)
      .then(response => {
        // console.log(response.data);
        dispatch(updateTodo({ id: currentTodo._id, todo: currentTodo }));
        dispatch(setMessage('The todo was updated successfully!'));
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteTodoUnderEdit = () => {
    TodoDataService.deleteTodo(currentTodo._id)
      .then(response => {
        // console.log(response.data);
        props.history.push("/todos");
        dispatch(deleteTodo(currentTodo._id));
        dispatch(setMessage('The todo was deleted successfully!'));
        dispatch(setCurrentTodo(null));
        dispatch(setCurrentIndex(-1));
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentTodo ? (
        <div className="edit-form">
          <h4>Todo</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
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
              <label htmlFor="description">Description</label>
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
                <strong>Status:</strong>
              </label>
              {currentTodo.status ? "Done" : "Pending"}
            </div>

            <div className="form-group">
              <label htmlFor="dueDate">Due Date</label>{' '}
              <DatePicker onChange={onChange} value={dateValue} />
            </div>

          </form>

          {currentTodo.status ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateStatus(false)}
            >
              Mark Pending
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateStatus(true)}
            >
              Mark Done
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={() => deleteTodoUnderEdit()}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={() => updateTodoUnderEdit()}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Todo...</p>
        </div>
      )}
    </div>
  );
};

export default Todo;