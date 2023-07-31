import React, { useEffect, useState } from 'react';
import Table from '../Table';

const days = {
  'Monday': 'mon',
  'Tuesday': 'tue',
  'Wednesday': 'wed',
  'Thursday': 'thu',
  'Friday': 'fri',
  'Saturday': 'sat',
  'Sunday': 'sun',
};

const SearchModal = (props) => {
  const { textInputValue, selectedWeekday, selectedFromTime, selectedToTime, onSearch } = props;
  const [schedule, setSchedule] = useState({});

  useEffect(() => {
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
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [textInputValue, selectedWeekday, selectedFromTime, selectedToTime]);

  const handleReset = () => {
    setSchedule({});
    onSearch(false);
  };

  return (
    <div>
      {Object.keys(schedule).length > 0 ? <Table data={schedule} /> : <p>No results found.</p>}
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default SearchModal;
