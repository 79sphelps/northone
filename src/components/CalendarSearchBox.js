import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CalendarSearchBox = ({
  searchTitle,
  onChangeSearchTitle,
  findItemByTitle,
  faSearch,
}) => {
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
};

export default CalendarSearchBox;
