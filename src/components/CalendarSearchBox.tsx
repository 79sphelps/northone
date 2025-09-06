import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setSearchTitle, findByTitle } from "../redux/actions";
import { selectSearchTitle } from "../redux/selectors/index.ts";

const CalendarSearchBox = memo(() => {
  const dispatch = useDispatch();
  const searchTitle = useSelector(selectSearchTitle);

  const onChangeSearchTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    dispatch(setSearchTitle(event.target.value));
  };

  const findItemByTitle = () => {
    dispatch(findByTitle(searchTitle));
    // dispatch(setCurrentCalendarEvent(null));
  };

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
        </div>
      </div>
    </div>
  );
});

export default CalendarSearchBox;
