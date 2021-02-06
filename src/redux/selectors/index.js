import { createSelector } from 'reselect'
import { formatDate } from '../utils';


const selectTodos = createSelector(
  (state) => state,
  (state) => state.todos
)

const selectCurrentTodo = createSelector(
    (state) => state,
    (state) => state.currentTodo ? state.currentTodo : {
        id: null,
        title: '',
        description: '',
        status: false,
        dueDate: formatDate(new Date())
      }
)

const selectCurrentIndex = createSelector(
    (state) => state,
    (state) => state.currentIndex
)

const selectSearchTitle = createSelector(
    (state) => state,
    (state) => state.searchTitle
)

const selectMessage = createSelector(
    (state) => state,
    (state) => state.message
)

const selectSubmitted = createSelector(
    (state) => state,
    (state) => state.submitted
)

export {
    selectTodos,
    selectCurrentTodo,
    selectCurrentIndex,
    selectSearchTitle,
    selectMessage,
    selectSubmitted
}