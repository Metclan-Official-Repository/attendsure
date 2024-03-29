import axios from "axios";
const checkIn = (data) => {
  const response = axios({
    url: "attendance/check-in",
    method: "post",
    data: data,
  });
  return response;
};
const verifyPin = (data) => {
  const response = axios({
    url: "attendance/verify-pin",
    method: "get",
    params: data,
  });
  return response;
};

const checkOut = (data) => {
  const response = axios({
    url: "attendance/check-out",
    method: "put",
    data: data,
  });
  return response;
};
const fetchAttendance = (data) => {
  const response = axios({
    url: "attendance/fetch",
    method: "get",
    params: data,
  });
  return response;
};
export { checkIn, verifyPin, checkOut, fetchAttendance };
