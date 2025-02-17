import { createSelector } from "reselect";

const getState = createSelector((state) => state, (state) => state);

const selectCalendarEvents = createSelector(
  [getState],
  (state) => state.calendarEvents
);

const selectCurrentCalendarEvent = createSelector(
  [getState],
  (state) => state.currentCalendarEvent
);

const selectCalendarEventToAdd = createSelector(
  [getState],
  (state) => state.calendarEventToAdd
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
  selectCalendarEvents,
  selectCurrentCalendarEvent,
  selectCalendarEventToAdd,
  selectCurrentIndex,
  selectSearchTitle,
  selectMessage,
  selectSubmitted,
};
