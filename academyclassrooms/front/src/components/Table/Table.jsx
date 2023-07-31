import React from 'react';
import useStyles from './styles';

const formatTime = (time) => {
  const hours = Math.floor(time / 100);
  const minutes = time % 100;

  // Check if minutes exceed 59 and adjust the hour accordingly
  const adjustedHours = hours + Math.floor(minutes / 60);
  const formattedHours = adjustedHours.toString().padStart(2, '0');
  const formattedMinutes = (minutes % 60).toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}`;
};

const groupTimeSlots = (timeSlots) => {
  const groupedTimeSlots = [];
  let currentSlot = null;

  for (const slot of timeSlots) {
    if (!currentSlot) {
      currentSlot = { ...slot };
    } else if (slot.teacher === currentSlot.teacher) {
      currentSlot.endTime = slot.endTime;
    } else {
      groupedTimeSlots.push(currentSlot);
      currentSlot = { ...slot };
    }
  }

  if (currentSlot) {
    groupedTimeSlots.push(currentSlot);
  }

  return groupedTimeSlots;
};

const Table = ({ data }) => {
  const classes = useStyles();

  const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

  return (
    <div className={classes.tableContainer}>
      <table className={classes.table}>
        <thead>
          <tr>
            <th className={classes.th}>Group</th>
            <th className={classes.th}>Classroom</th>
            <th className={classes.th}>Schedule</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data.groups).map(([group, groupData]) => {
            const classroom = Object.keys(groupData)[0];
            const schedules = weekdays.map((weekday) => {
              if (
                groupData[classroom][weekday] &&
                groupData[classroom][weekday].hours &&
                groupData[classroom][weekday].teacher
              ) {
                const teacher = groupData[classroom][weekday].teacher;
                const timeSlots = groupData[classroom][weekday].hours.map((time) => {
                  const startTime = formatTime(time);
                  const endTime = formatTime(time + 30); // Assuming each class is 30 minutes long
                  return { teacher, startTime, endTime };
                });

                return groupTimeSlots(timeSlots);
              } else {
                return null;
              }
            });

            return (
              <tr key={group} className={classes.trHover}>
                <td className={classes.td}>{group}</td>
                <td className={classes.td}>{classroom}</td>
                <td className={classes.td}>
                  {schedules.map((schedule, index) => {
                    if (!schedule) return null;

                    const scheduleText = schedule
                      .map((slot) => `${slot.startTime} - ${slot.endTime}`)
                      .join(', ');

                    return (
                      <React.Fragment key={index}>
                        {index > 0 && <br />}
                        {`${weekdays[index].toUpperCase()}: ${scheduleText}. Teacher: ${schedule[0].teacher}`}
                      </React.Fragment>
                    );
                  })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
