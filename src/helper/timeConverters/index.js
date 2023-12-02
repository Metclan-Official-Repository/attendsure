export const convertSecondsToDateString = (seconds) => {
  //Check seconds type
  if (seconds === null) return "Active";
  //convert to milliseconds
  const milliseconds = parseInt(seconds * 1000);
  //convert to date
  const realDate = new Date(milliseconds);
  const dateString = realDate.toDateString();
  //omit day name from date
  const withoutDayName = dateString.split(" ").splice(1);
  //add a comma after the day
  withoutDayName[1] = withoutDayName[1] + ",";
  //get full date
  const fullDate = withoutDayName.join(" ");
  return fullDate;
};
export const convertSecondsToTimeString = (seconds) => {
  //Check seconds type
  if (seconds === null) return "Active";
  //convert to milliseconds
  const milliseconds = parseInt(seconds * 1000);
  //convert to date
  const realDate = new Date(milliseconds);
  let hours = realDate.getHours();
  let minutes = realDate.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};

export const isEarly = (
  hourIn24HrFormat,
  minuteIn24HrFormat,
  dateTimeInSeconds
) => {
  //check seconds type
  if (dateTimeInSeconds === null) return false;
  //convert to milliseconds
  const milliseconds = parseInt(dateTimeInSeconds * 1000);
  //convert to date
  const realDate = new Date(milliseconds);
  const hours = realDate.getHours();
  const minutes = realDate.getMinutes();
  //less than set time
  if (hours === parseInt(hourIn24HrFormat)) {
    if (minutes <= parseInt(minuteIn24HrFormat)) {
      return true;
    }
    if (minutes > parseInt(minuteIn24HrFormat)) {
      return false;
    }
  }
  if (hours < parseInt(hourIn24HrFormat)) {
    return true;
  }
  if (hours > parseInt(hourIn24HrFormat)) {
    return false;
  }
};
