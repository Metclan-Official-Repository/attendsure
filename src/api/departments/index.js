import axios from "axios";
import { baseUrl } from "..";
const addDepartment = (name) => {
  const response = axios({
    baseURL: baseUrl(),
    url: "departments/new",
    method: "post",
    data: name,
  });
  return response;
};
const fetchDepartments = () => {
  const response = axios({
    baseURL: baseUrl(),
    url: "departments/fetch",
    method: "get",
    data: "",
  });
  return response;
};

const editDepartment = () => {};
const deleteDepartment = () => {};
export { addDepartment, editDepartment, deleteDepartment, fetchDepartments };
