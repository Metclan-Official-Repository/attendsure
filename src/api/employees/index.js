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
const editEmployeeFingerprint = (query, data) => {
  const response = axios({
    url: "employees/fingerprint/:id",
    method: "put",
    data: data,
    params: query,
  });
  return response;
};
const fetchOneEmployee = (query) => {
  const response = axios({
    url: "employees/fetch/:id",
    method: "get",
    params: query,
  });
  return response;
};
export {
  addEmployee,
  fetchEmployee,
  deleteEmployee,
  editEmployee,
  editEmployeeFingerprint,
  fetchOneEmployee,
};
