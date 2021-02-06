import {
    SET_CURRENT_TODO,
    SET_TODO_TO_ADD,
    SET_SEARCH_TITLE,
    SET_CURRENT_INDEX,
    SET_MESSAGE,
    SET_SUBMITTED,
    SET_TODOS,
    ADD_TODO,
    UPDATE_TODO,
    DELETE_TODO,
    DELETE_TODOS,
    DATA_LOADED,
    API_ERRORED
} from '../constants/action.types';

const initialState = {
    todos: [],
    currentTodo: null,
    todoToAdd: null,
    searchTitle: '',
    currentIndex: -1,
    message: '',
    submitted: false,
};

function rootReducer(state = initialState, action) {
    let mappings = null;

    switch (action.type) {
        case SET_CURRENT_TODO:
            return { ...state, currentTodo: action.payload };

        case SET_TODO_TO_ADD:
            return { ...state, todoToAdd: action.payload };

        case SET_SEARCH_TITLE:
            return { ...state, searchTitle: action.payload };

        case SET_CURRENT_INDEX:
            return { ...state, currentIndex: action.payload };

        case SET_MESSAGE:
            return { ...state, message: action.payload };

        case SET_SUBMITTED:
            return { ...state, submitted: action.payload };

        case SET_TODOS:
            return { ...state, todos: action.payload };

        case ADD_TODO:
            return { ...state, todos: state.todos.concat(action.payload)};

        case UPDATE_TODO:
            // find the todo to update
            mappings = state.todos;
            const idx = state.todos.findIndex(t => t.id === action.payload.id);
            if (mappings.todos) {
                mappings.todos[idx] = action.payload.todo;
            }
            return { ...state, todos: mappings }

        case DELETE_TODO:
            // find the todo to delete
            mappings = state.todos.filter(t => t.id !== action.payload.id);
            return { ...state, todos: mappings };

        case DELETE_TODOS:
            return { ...state, todos: [] };

        case DATA_LOADED:
            return state;

        case API_ERRORED:
            return state;

        default:
            return state;
    }
}

export default rootReducer;
