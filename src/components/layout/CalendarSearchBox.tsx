import React, { memo, useEffect, useRef } from "react";
import { useAppDispatch } from "../../redux/store/index.ts";
import { useAppSelector } from "../../redux/selectors/index.ts";
import { faSearch, faRemove } from "@fortawesome/free-solid-svg-icons"; // faCancel, faTrash,
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  setSearchTitle,
  findByTitle,
  getCalendarEvents,
} from "../../redux/actions/index.ts";
import { selectSearchTitle } from "../../redux/selectors/index.ts";

const CalendarSearchBox: React.FC = memo(() => {
  const dispatch = useAppDispatch();      // const dispatch = useDispatch();
  const searchTitle: string = useAppSelector(selectSearchTitle);

  const onChangeSearchTitle: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    dispatch(setSearchTitle(event.target.value));
  };

  const findItemByTitle: () => void = () => {
    dispatch(findByTitle(searchTitle));
    // dispatch(setCurrentCalendarEvent(null));
  };

  const handleClearSearch: () => void = () => {
    dispatch(setSearchTitle(""));
    dispatch(getCalendarEvents());
  };

  return (
    <div className="calendar-event-search-box col-md-8" style={{ margin: "0 auto" }} data-testid="search-box-id">
      <div className="input-group mb-3">
        <input
          tabIndex={4}
          aria-label="Search Box"
          type="text"
          className="form-control"
          data-testid="search-input-id"
          placeholder="Search by title"
          value={searchTitle}
          onChange={(searchTitle) => onChangeSearchTitle(searchTitle)}
        />
        <div className="input-group-append">
          <button
            tabIndex={5}
            role="button"
            aria-label="Search Button"
            className="btn btn-outline-secondary"
            type="button"
            data-testid="search-btn-id"
            onClick={() => findItemByTitle()}
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <button
            tabIndex={6}
            role="button"
            aria-label="Search Cancel"
            className="btn btn-outline-secondary"
            type="button"
            data-testid="search-cancel-btn-id"
            onClick={handleClearSearch}
          >
            <FontAwesomeIcon icon={faRemove} />
          </button>
        </div>
      </div>
    </div>
  );
});

export default CalendarSearchBox;
