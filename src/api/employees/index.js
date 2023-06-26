import axios from "axios";
import { baseUrl } from "..";
const addEmployee = (data) => {
  const response = axios({
    baseURL: baseUrl(),
    url: "employees/new",
    method: "post",
    data: data,
  });
  return response;
};
const fetchEmployee = (data) => {
  const response = axios({
    baseURL: baseUrl(),
    url: "employees/fetch",
    method: "get",
    params: data,
  });
  return response;
};
export { addEmployee, fetchEmployee };
