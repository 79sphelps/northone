import {
    SET_CURRENT_TODO,
    GET_CURRENT_TODO,
    SET_SEARCH_TITLE,
    GET_SEARCH_TITLE,
    SET_CURRENT_INDEX,
    GET_CURRENT_INDEX,
    SET_MESSAGE,
    GET_MESSAGE,
    SET_SUBMITTED,
    GET_SUBMITTED,
    GET_TODOS,
    SET_TODOS,
    GET_TODO,
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
    searchTitle: '',
    currentIndex: -1,
    message: '',
    submitted: false,
};

function rootReducer(state = initialState, action) {
    if (action.type === SET_CURRENT_TODO) {
        return { ...state, currentTodo: action.payload };
    }

    if (action.type === GET_CURRENT_TODO) {
        return state.currentTodo;
    }

    if (action.type === SET_SEARCH_TITLE) {
        return { ...state, searchTitle: action.payload };
    }

    if (action.type === GET_SEARCH_TITLE) {
        return state.searchTitle;
    }

    if (action.type === SET_CURRENT_INDEX) {
        return { ...state, currentIndex: action.payload };
    }

    if (action.type === GET_CURRENT_INDEX) {
        return state.currentIndex;
    }

    if (action.type === SET_MESSAGE) {
        return { ...state, message: action.payload };
    }

    if (action.type === GET_MESSAGE) {
        return state.message;
    }

    if (action.type === SET_SUBMITTED) {
        return { ...state, submitted: action.payload };
    }

    if (action.type === GET_SUBMITTED) {
        return state.submitted;
    }

    if (action.type === SET_TODOS) {
        return { ...state, todos: action.payload };
    }

    if (action.type === GET_TODOS) {
        return state.todos;
    }

    if (action.type === GET_TODO) {
        return state.todos.filter(t => t.id = action.payload);
    }

    if (action.type === ADD_TODO) {
        // or with spread operator
        return { ...state, todos: state.todos.concat(action.payload)};
    }

    if (action.type === UPDATE_TODO) {
        // find the todo to update
        let mappings = state.todos;
        const idx = state.todos.findIndex(t => t.id === action.payload.id);
        if (mappings.todos) {
            mappings.todos[idx] = action.payload.todo;
        }

        return { ...state, todos: mappings }
    }

    if (action.type === DELETE_TODO) {
        // find the todo to delete
        let mappings = state.todos;
        mappings = state.todos.filter(t => t.id !== action.payload.id);
        return { ...state, todos: mappings };
    }

    if (action.type === DELETE_TODOS) {
        // remove all todos from state
        return { ...state, todos: [] };
    }

    if (action.type === DATA_LOADED) {
        // or with spread operator
        return { ...state, todos: state.todos.concat(action.payload)};
    }

    if (action.type === API_ERRORED) {
        return state;
    }
    return state;
};

export default rootReducer;
