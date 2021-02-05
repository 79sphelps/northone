import { connect } from 'react-redux';
import {
    getTodos,
    getTodo,
    addTodo,
    updateTodo,
    deleteTodo,
    deleteTodos,
} from '../actions';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    onGetTodo: payload => dispatch(getTodo(payload)),
    onGetTodos: payload => dispatch(getTodos(payload)),
    onAddTodo: payload => dispatch(addTodo(payload)),
    onUpdateTodo: payload => dispatch(updateTodo(payload)),
    onDeleteTodo: payload => dispatch(deleteTodo(payload)),
    onDeleteTodos: payload => dispatch(deleteTodos(payload)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SavedToDos);
