import React, { useState, useContext } from "react";
import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import format from "date-fns/format";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch.js";
import { SearchContext } from "../../context/SearchContext";

// Set today and tomorrow
const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

// Validate and return safe date range
const getValidatedDates = (inputDates) => {
  const start = inputDates?.[0]?.startDate ? new Date(inputDates[0].startDate) : today;
  let end = inputDates?.[0]?.endDate ? new Date(inputDates[0].endDate) : tomorrow;

  if (start.toDateString() === end.toDateString()) {
    end = new Date(start);
    end.setDate(start.getDate() + 1);
  }

  return [{ startDate: start, endDate: end, key: "selection" }];
};

const List = () => {
  const location = useLocation();
  const { dispatch } = useContext(SearchContext);

  const [destination, setDestination] = useState(location.state?.destination || "");
  const [dates, setDates] = useState(getValidatedDates(location.state?.dates));
  const [options, setOptions] = useState(location.state?.options || { adult: 1, children: 0, room: 1 });
  const [openDate, setOpenDate] = useState(false);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const type = location.state?.type || "hotel";

  const { data, loading, reFetch } = useFetch(
    destination
      ? `/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`
      : `/hotels?type=${type}&min=${min || 0}&max=${max || 999}`
  );

  const isValidDateRange = () => {
    const start = dates[0].startDate;
    const end = dates[0].endDate;
    return start && end && start < end;
  };

  const handleClick = () => {
    if (!isValidDateRange()) {
      alert("Please select a valid date range.");
      return;
    }

    // ✅ Update context with latest values
    dispatch({
      type: "NEW_SEARCH",
      payload: {
        city: destination,
        dates,
        options,
      },
    });

    reFetch();
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>

            <div className="lsItem">
              <label>Destination</label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>

            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)} style={{ cursor: "pointer", display: "block", marginBottom: "10px" }}>
                {format(dates[0].startDate, "dd/MM/yyyy")} to {format(dates[0].endDate, "dd/MM/yyyy")}
              </span>

              {openDate && (
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => {
                    const newDates = getValidatedDates([item.selection]);
                    setDates(newDates);
                  }}
                  moveRangeOnFirstSelection={false}
                  ranges={dates}
                  minDate={new Date()}
                />
              )}
            </div>

            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">Min price <small>per night</small></span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>

                <div className="lsOptionItem">
                  <span className="lsOptionText">Max price <small>per night</small></span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>

                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    value={options.adult}
                    onChange={(e) => setOptions({ ...options, adult: +e.target.value })}
                    className="lsOptionInput"
                  />
                </div>

                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    value={options.children}
                    onChange={(e) => setOptions({ ...options, children: +e.target.value })}
                    className="lsOptionInput"
                  />
                </div>

                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    value={options.room}
                    onChange={(e) => setOptions({ ...options, room: +e.target.value })}
                    className="lsOptionInput"
                  />
                </div>
              </div>
            </div>

            <button onClick={handleClick} disabled={!isValidDateRange()}>
              Search
            </button>
          </div>

          <div className="listResult">
            {loading ? (
              "Loading..."
            ) : data.length === 0 ? (
              <div className="noResultsMessage">No results found for your search.</div>
            ) : (
              data.map((item) => <SearchItem item={item} key={item._id} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
