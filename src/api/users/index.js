import axios from "axios";
const fetchUsers = (params) => {
  const response = axios({
    url: "user/fetch",
    method: "get",
    params: params,
  });
  return response;
};

const addUsers = (data) => {
  const response = axios({
    url: "user/new",
    method: "post",
    data: data,
  });
  return response;
};
export { fetchUsers, addUsers };
