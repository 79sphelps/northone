import { createSelector } from "reselect";


const getState = createSelector((state) => state, (state) => state);

const selectTodos = createSelector(
  [getState],
  (state) => state.todos
);

const selectCurrentTodo = createSelector(
  [getState],
  (state) => state.currentTodo
);

const selectTodoToAdd = createSelector(
  [getState],
  (state) => state.todoToAdd
);

const selectCurrentIndex = createSelector(
  [getState],
  (state) => state.currentIndex
);

const selectSearchTitle = createSelector(
  [getState],
  (state) => state.searchTitle
);

const selectMessage = createSelector(
  [getState],
  (state) => state.message
);

const selectSubmitted = createSelector(
  [getState],
  (state) => state.submitted
);

export {
  selectTodos,
  selectCurrentTodo,
  selectTodoToAdd,
  selectCurrentIndex,
  selectSearchTitle,
  selectMessage,
  selectSubmitted,
};
