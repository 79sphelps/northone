import { Switch, Route, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {
  setCurrentTodo,
  setSubmitted,
  setMessage,
} from './redux/actions';

import AddTodo from './components/add-todo.component';
import Todo from './components/todo.component';
import TodosList from './components/todos-list.component';


const App = () => {
  const dispatch = useDispatch();

  const initializeCurrentTodo = () => {
    dispatch(setCurrentTodo({
      id: null,
      title: "",
      description: "",
      published: false
    }));
    dispatch(setSubmitted(false));
    dispatch(setMessage(''));
  }

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/todos" className="navbar-brand">
          sphelps
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/todos"} className="nav-link">
              Todos
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link" onClick={() => initializeCurrentTodo()}>
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/todos"]} component={TodosList} />
          <Route exact path="/add" component={AddTodo} />
          <Route path="/todos/:id" component={Todo} />
        </Switch>
      </div>
    </div>
  );
}

export default App;