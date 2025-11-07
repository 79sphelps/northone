import React, { memo } from "react";
import { useAppDispatch } from "../redux/store/index.ts";
import { useAppSelector } from "../redux/selectors";
import { faSearch, faCancel, faTrash, faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setSearchTitle, findByTitle, getCalendarEvents } from "../redux/actions";
import { selectSearchTitle } from "../redux/selectors/index.ts";

const CalendarSearchBox = memo(() => {
  // const dispatch = useDispatch();
  const dispatch = useAppDispatch();
  const searchTitle = useAppSelector(selectSearchTitle);

  const onChangeSearchTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    dispatch(setSearchTitle(event.target.value));
  };

  const findItemByTitle = () => {
    dispatch(findByTitle(searchTitle));
    // dispatch(setCurrentCalendarEvent(null));
  };

  const handleClearSearch = () => {
    dispatch(setSearchTitle('')); 
    dispatch(getCalendarEvents()); 
  }

  return (
    <div className="col-md-8" style={{ margin: "0 auto" }}>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title"
          value={searchTitle}
          onChange={(searchTitle) => onChangeSearchTitle(searchTitle)}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => findItemByTitle()}
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <button
            className="btn btn-outline-secondary"
            type="button"
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
