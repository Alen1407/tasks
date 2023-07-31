const axios = require('axios');
const express = require('express');

async function fetchScheduleData() {
  const url = 'https://academyclassrooms.com/api/schedule';

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return null;
  }
}

function filterSchedule(data, fromTime, toTime, weekday) {
  const filteredGroups = {};
  const filteredTeachers = {};

  for (const teacher in data) {
    for (const timeSlot in data[teacher]) {
      const schedule = data[teacher][timeSlot][weekday];
      if (schedule) {
        const startTime = parseInt(timeSlot);
        if (startTime >= fromTime && startTime < toTime) {
          const groupName = schedule.group;
          const teacherName = schedule.teacher;

          if (!filteredGroups[groupName]) {
            filteredGroups[groupName] = {};
          }

          if (!filteredGroups[groupName][teacherName]) {
            filteredGroups[groupName][teacherName] = {
              [weekday]: {
                teacher: teacherName,
                hours: [startTime],
              },
            };
          } else {
            filteredGroups[groupName][teacherName][weekday].hours.push(startTime);
          }

          filteredTeachers[teacherName] = {}; // If you need teachers information
        }
      }
    }
  }

  return {
    groups: filteredGroups,
    teachers: filteredTeachers,
  };
}

const app = express();

app.get('/api/schedule', (req, res) => {
    // Place the logic here to fetch the schedule data
    // For simplicity, I'm using the provided function fetchScheduleData()
    fetchScheduleData()
      .then((jsonData) => {
        // You can add the logic here to filter the data if needed
        // For example, you can parse query parameters to filter by fromTime, toTime, and weekday
        const filteredData = filterSchedule(jsonData, 1200, 1700, 'mon');
        res.json(filteredData);
      })
      .catch((error) => {
        console.error('Error fetching schedule data:', error.message);
        res.status(500).json({ error: 'Error fetching schedule data' });
      });
  });
  
  // Run the server
  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });