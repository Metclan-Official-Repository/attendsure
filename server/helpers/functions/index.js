const convertDateToTime = (date) => {
  if (date === undefined) {
    return undefined;
  }
  const getDate = new Date(date);
  const getTime = getDate.getTime();
  const timeInSeconds = getTime / 1000;
  return timeInSeconds;
};
module.exports = { convertDateToTime };
