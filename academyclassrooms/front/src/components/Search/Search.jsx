import React, { useState } from 'react';
import useStyles from './styles';
import SearchModal from '../SearchModal/SearchModal';

const Search = () => {
  const [textInputValue, setTextInputValue] = useState('');
  const [selectedWeekday, setSelectedWeekday] = useState('');
  const [selectedFromTime, setSelectedFromTime] = useState('');
  const [selectedToTime, setSelectedToTime] = useState('');
  const [schedule, setSchedule] = useState({});
  const [searchPerformed, setSearchPerformed] = useState(false);
  const classes = useStyles();

  const days = {
    'Monday': 'mon',
    'Tuesday': 'tue',
    'Wednesday': 'wed',
    'Thursday': 'thu',
    'Friday': 'fri',
    'Saturday': 'sat',
    'Sunday': 'sun',
  };

  const isSearchEnabled = () => {
    return textInputValue !== '' || selectedWeekday !== '' || selectedFromTime !== '' || selectedToTime !== '';
  };

  const handleSearch = () => {
    if (isSearchEnabled()) {
      let apiUrl = `http://localhost:5000/api/schedule/search?term=${textInputValue}`;

      if (selectedWeekday) {
        apiUrl += `&day=${days[selectedWeekday]}`;
      }

      if (selectedFromTime) {
        apiUrl += `&from=${selectedFromTime + '00'}`;
      }

      if (selectedToTime) {
        apiUrl += `&to=${selectedToTime + '00'}`;
      }

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          setSchedule(data);
          setSearchPerformed(true);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setSearchPerformed(true);
        });
    }
  };

  const handleTextInputChange = (event) => {
    setTextInputValue(event.target.value);
  };

  const handleWeekdayChange = (event) => {
    setSelectedWeekday(event.target.value);
  };

  const handleFromTimeChange = (event) => {
    setSelectedFromTime(event.target.value);
  };

  const handleToTimeChange = (event) => {
    setSelectedToTime(event.target.value);
  };

  const handleSeeAvailability = () => {
    console.log('See availability clicked');
  };

  const handleResetFilters = () => {
    setTextInputValue('');
    setSelectedWeekday('');
    setSelectedFromTime('');
    setSelectedToTime('');
    setSchedule({});
    setSearchPerformed(false);
  };

  return (
    <div className={classes.root}>
      <div>
        <h1>Classrooms: Beta</h1>
      </div>
      <div className={classes.container}>
        <input
          className={classes.input}
          type="text"
          value={textInputValue}
          onChange={handleTextInputChange}
          placeholder="Enter search text"
        />
        <select className={classes.select} value={selectedWeekday} onChange={handleWeekdayChange}>
          <option value="">Select Weekday</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
        <select className={classes.select} value={selectedFromTime} onChange={handleFromTimeChange}>
          <option value="">Select Time From</option>
          {Array.from({ length: 13 }, (_, i) => 10 + i).map((hour) => (
            <option key={hour} value={hour}>
              {hour}:00
            </option>
          ))}
        </select>
        <select className={classes.select} value={selectedToTime} onChange={handleToTimeChange}>
          <option value="">Select Time To</option>
          {Array.from({ length: 13 }, (_, i) => 10 + i).map((hour) => (
            <option key={hour} value={hour}>
              {hour}:00
            </option>
          ))}
        </select>
        <button className={classes.button} style={{ backgroundColor: '#337ab7' }} onClick={handleSearch}>
          Search
        </button>
        <button className={classes.button} style={{ backgroundColor: '#5cb85c' }} onClick={handleSeeAvailability}>
          See Availability
        </button>
        <button className={classes.button} style={{ color: '#333' }} onClick={handleResetFilters}>
          Reset Filters
        </button>
      </div>
      {searchPerformed && (
        <SearchModal
          textInputValue={textInputValue}
          selectedWeekday={selectedWeekday}
          selectedFromTime={selectedFromTime}
          selectedToTime={selectedToTime}
          schedule={schedule}
          onSearch={setSearchPerformed}
        />
      )}
    </div>
  );
};

export default Search;
