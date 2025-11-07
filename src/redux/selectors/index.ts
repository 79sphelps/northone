import { createSelector } from "reselect";
import { RootState } from "../reducers";
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// const getState = createSelector((state) => state, (state) => state);
const getState = createSelector((state: RootState) => state, (state) => state);

const selectCalendarEvents = createSelector(
  [getState],
  (state: RootState) => state.calendarEvents
);

const selectCurrentCalendarEvent = createSelector(
  [getState],
  (state: RootState) => state.currentCalendarEvent
);

const selectCalendarEventToAdd = createSelector(
  [getState],
  (state: RootState) => state.calendarEventToAdd
);

const selectCurrentIndex = createSelector(
  [getState],
  (state: RootState) => state.currentIndex
);

const selectSearchTitle = createSelector(
  [getState],
  (state: RootState) => state.searchTitle
);

const selectMessage = createSelector(
  [getState],
  (state: RootState) => state.message
);

const selectSubmitted = createSelector(
  [getState],
  (state: RootState) => state.submitted
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
