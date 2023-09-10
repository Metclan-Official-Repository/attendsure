import axios from "axios";
const addRole = (data) => {
  const response = axios({
    url: "roles/new",
    method: "post",
    data: data,
  });
  return response;
};
const fetchRoles = (params) => {
  const response = axios({
    url: "roles/fetch",
    method: "get",
    params: params,
  });
  return response;
};

export { addRole, fetchRoles };
