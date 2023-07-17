import axios from "axios";

const addEmployee = (data) => {
  const response = axios({
    url: "employees/new",
    method: "post",
    data: data,
  });
  return response;
};
const fetchEmployee = (params) => {
  const response = axios({
    url: "employees/fetch",
    method: "get",
    params: params,
  });
  return response;
};
const deleteEmployee = (data) => {
  const response = axios({
    url: "employees/delete",
    method: "delete",
    data: data,
  });
  return response;
};
const editEmployee = (data) => {
  const response = axios({
    url: "employees/edit",
    method: "put",
    data: data,
  });
  return response;
};
export { addEmployee, fetchEmployee, deleteEmployee, editEmployee };
