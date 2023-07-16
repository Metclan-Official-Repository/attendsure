import axios from "axios";
const addDepartment = (name) => {
  const response = axios({
    url: "departments/new",
    method: "post",
    data: name,
  });
  return response;
};
const fetchDepartments = (params) => {
  const response = axios({
    url: "departments/fetch",
    method: "get",
    params: params,
  });
  return response;
};

const editDepartment = (data) => {
  const response = axios({
    url: "departments/edit",
    method: "put",
    data: data,
  });
  return response;
};

const deleteDepartment = (data) => {
  const response = axios({
    url: "departments/delete",
    method: "delete",
    data: data,
  });
  return response;
};
export { addDepartment, editDepartment, deleteDepartment, fetchDepartments };
