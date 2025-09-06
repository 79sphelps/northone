import { createSelector } from "reselect";

// interface State {
//   calendarEvents: any[];
//   currentCalendarEvent: any | null;
//   calendarEventToAdd: any | null;
//   searchTitle: string;
//   currentIndex: number;
//   message: string;
//   submitted: boolean;
// }

const getState = createSelector((state) => state, (state) => state);

const selectCalendarEvents = createSelector(
  [getState],
  (state: any) => state.calendarEvents
);

const selectCurrentCalendarEvent = createSelector(
  [getState],
  (state: any) => state.currentCalendarEvent
);

const selectCalendarEventToAdd = createSelector(
  [getState],
  (state: any) => state.calendarEventToAdd
);

const selectCurrentIndex = createSelector(
  [getState],
  (state: any) => state.currentIndex
);

const selectSearchTitle = createSelector(
  [getState],
  (state: any) => state.searchTitle
);

const selectMessage = createSelector(
  [getState],
  (state: any) => state.message
);

const selectSubmitted = createSelector(
  [getState],
  (state: any) => state.submitted
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
