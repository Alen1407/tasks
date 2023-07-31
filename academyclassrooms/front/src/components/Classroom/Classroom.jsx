import { useEffect, useState } from "react";
import useStyles from "./styles";

const Classroom = (props) => {
  const [schedule, setSchedule] = useState({});
  const classes = useStyles();

  useEffect(() => {
    fetch("http://localhost:5000/api/schedule")
      .then((response) => response.json())
      .then((data) => {
        setSchedule(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const classroomName = props.name;
  const daysOfWeek = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  const timeSlots = [];
  for (let hour = 10; hour <= 22; hour++) {
    for (let minute = 0; minute <= 30; minute += 30) {
      const formattedHour = hour.toString().padStart(2, "0");
      const formattedMinute = minute === 0 ? "00" : "30";
      const timeSlot = `${formattedHour}${formattedMinute}`;
      timeSlots.push(timeSlot);
    }
  }

  const getScheduleInfo = (slot, day) => {
    if (
      schedule &&
      schedule[classroomName] &&
      schedule[classroomName][slot] &&
      schedule[classroomName][slot][day]
    ) {
      const info = schedule[classroomName][slot][day];

      let backgroundColor;
      if (info.rec && !info.reserved) {
        backgroundColor = "#ff5722"; // Recorded and not reserved
      } else if (info.rec && info.reserved) {
        backgroundColor = "#f0d001"; // Recorded and reserved
      } else {
        backgroundColor = "#5bbd2a"; // Not recorded
      }

      return (
        <div>
          <div style={{ backgroundColor, padding:'5px', borderRadius:'5px' }} className={classes.groupInfo}>{info.group}</div>
          <div>{info.teacher}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={classes.container}>
      <h1>{props.name}</h1>
      <table className={classes.table}>
        <thead>
          <tr className={classes.tr}>
            <th className={classes.th}>Time</th>
            {daysOfWeek.map((day) => (
              <th className={classes.th} key={day}>
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((slot) => (
            <tr className={classes.tr} key={slot}>
              <td className={classes.td}>
                {slot.substring(0, 2)}:{slot.substring(2, 4)}
              </td>
              {daysOfWeek.map((day) => (
                <td className={classes.td} key={day}>
                  {getScheduleInfo(slot, day)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Classroom;
