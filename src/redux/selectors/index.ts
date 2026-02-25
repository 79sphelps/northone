import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../reducers";
import { createSelector } from "reselect";

/*
  Typed Hook
*/
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/*
  Base Selectors (simple access — no memo needed)
*/

export const selectCalendarEvents = (state: RootState) =>
  state.calendarEvents;

export const selectCurrentCalendarEvent = (state: RootState) =>
  state.currentCalendarEvent;

export const selectCalendarEventToAdd = (state: RootState) =>
  state.calendarEventToAdd;

export const selectCurrentIndex = (state: RootState) =>
  state.currentIndex;

export const selectSearchTitle = (state: RootState) =>
  state.searchTitle;

export const selectMessage = (state: RootState) =>
  state.message;

export const selectSubmitted = (state: RootState) =>
  state.submitted;

export const selectIsFinding = (state: RootState) =>
  state.isFinding;

export const selectIsLoading = (state: RootState) =>
  state.isLoading;


export const selectSelectedCalendarEvent = createSelector(
  [selectCalendarEvents, selectCurrentIndex],
  (events, index) => (index >= 0 ? events[index] : null)
);
