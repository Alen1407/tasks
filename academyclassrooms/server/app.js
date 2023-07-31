const express = require('express');
const mongodb = require('mongodb');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json())

const MongoClient = mongodb.MongoClient;
const dbName = 'classroom';
const collectionName = 'schedules';
const url = 'mongodb://localhost:27017/';

app.get("/api/schedule", async (req, res) => {
    try {
      const client = new MongoClient(url);
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection(collectionName);
      const data = await collection.find().toArray();
      res.json(data[0]);
      client.close();
    } catch (err) {
      console.error("Error:", err.message);
      res.status(500).json({ error: "Internal server error" });
    }
});


function filterSchedule(data, fromTime = 1000, toTime = 2200, weekday) {
  const filteredGroups = {};

  for (const classroom in data) {
    for (const timeSlot in data[classroom]) {
      const schedule = data[classroom][timeSlot];
      const startTime = parseInt(timeSlot);

      if ((!weekday || schedule.hasOwnProperty(weekday)) && startTime >= fromTime && startTime < toTime) {
        const weekdays = weekday ? [weekday] : Object.keys(schedule);

        for (const currentWeekday of weekdays) {
          const currentDay = schedule[currentWeekday];
          const groupName = currentDay.group;
          const classroomName = classroom;

          if (!filteredGroups[groupName]) {
            filteredGroups[groupName] = {};
          }

          if (!filteredGroups[groupName][classroomName]) {
            filteredGroups[groupName][classroomName] = {};
          }

          if (!filteredGroups[groupName][classroomName][currentWeekday]) {
            filteredGroups[groupName][classroomName][currentWeekday] = {
              teacher: currentDay.teacher,
              hours: [],
            };
          }

          filteredGroups[groupName][classroomName][currentWeekday].hours.push(startTime);
        }
      }
    }
  }

  return {
    groups: filteredGroups,
    teachers: {},
  };
}


app.get('/api/schedule/search', async (req, res) => {
  // Extract the query parameters from the request
  const { term, day, from, to } = req.query;

  let result = {};

  if (term) {
    result.term = term.toLowerCase(); // Convert term to lowercase for case-insensitive comparison
  }

  if (day) {
    result.day = day;
  }

  if (from) {
    result.from = parseInt(from);
  }

  if (to) {
    result.to = parseInt(to);
  }

  const client = new MongoClient(url);
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  const data = await collection.find().toArray();

  let filtered = {};

  if (result.day) {
    filtered = filterSchedule(data[0], result.from, result.to, result.day);
  } else {
    // If 'day' is not provided, include data for all weekdays
    const weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
    for (const currentDay of weekdays) {
      const currentFiltered = filterSchedule(data[0], result.from, result.to, currentDay);
      // Merge the currentFiltered results into the filtered object
      filtered.groups = { ...filtered.groups, ...currentFiltered.groups };
    }
  }

  if (term) {
    // Filter the groups based on the term
    filtered.groups = filterGroupsByTerm(filtered.groups, result.term);
    // Filter the teachers based on the term
    filtered.teachers = filterTeachersByTerm(filtered.teachers, result.term);
  }

  res.json(filtered);
});




function filterGroupsByTerm(groups, term) {
  const filteredGroups = {};

  for (const groupName in groups) {
    if (groupName.toLowerCase().includes(term)) {
      filteredGroups[groupName] = groups[groupName];
    }
  }

  return filteredGroups;
}

function filterTeachersByTerm(teachers, term) {
  const filteredTeachers = {};

  for (const teacherName in teachers) {
    if (teacherName.toLowerCase().includes(term)) {
      filteredTeachers[teacherName] = teachers[teacherName];
    }
  }

  return filteredTeachers;
}


app.use('/*', (req, res) => {res.send("404 not found")})

app.listen(5000, ()=>{
    console.log("Server is listening");
})