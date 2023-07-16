import axios from "axios";
const register = (data) => {
  const response = axios({
    url: "business/register",
    method: "post",
    data: data,
  });
  return response;
};
const login = (data) => {
  const response = axios({
    url: "user/login",
    method: "post",
    data: data,
  });
  return response;
};
export { register, login };
