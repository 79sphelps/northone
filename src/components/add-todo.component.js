import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setTodoToAdd,
  setSubmitted
} from '../redux/actions';
import {
  selectTodoToAdd,
  selectSubmitted
} from '../redux/selectors';
import { formatDate } from '../redux/utils';
import TodoDataService from '../redux/services/todo.service.js';
import DatePicker from 'react-date-picker';


const AddTodo = () => {
  const dispatch = useDispatch();
  // const Todo = useSelector(state => state.currentTodo);
  // const submitted = useSelector(state => state.submitted);

  const TodoToAdd = useSelector(selectTodoToAdd);
  const submitted = useSelector(selectSubmitted);
  const [dateValue, onChange] = useState(new Date());

  let initialTodoState = {
    id: null,
    title: '',
    description: '',
    status: false,
    dueDate: formatDate(new Date())
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    dispatch(setTodoToAdd({ ...TodoToAdd, [name]: value }))
  };

  const saveTodo = () => {
    if (!dateValue) return;
    var data = {
      title: TodoToAdd.title,
      description: TodoToAdd.description,
      status: false,
      dueDate: dateValue
    };

    TodoDataService.addTodo(data)
      .then(response => {
        dispatch(setTodoToAdd({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          status: response.data.status,
          dueDate: response.data.dueDate
        }));

        dispatch(setSubmitted(true));
        // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newTodo = () => {
    dispatch(setTodoToAdd(initialTodoState));
    dispatch(setSubmitted(false));
  };

  return (
    <div className="submit-form">
      {submitted ? (
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
            <label htmlFor="dueDate">Due Date</label>{' '}
            <DatePicker onChange={onChange} value={dateValue} />
          </div>

          <button onClick={() => saveTodo(TodoToAdd)} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTodo;