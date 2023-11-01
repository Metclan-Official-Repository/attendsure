import axios from "axios";
const register = async (data) => {
  const response = await axios({
    url: "business/register",
    method: "post",
    data: data,
  });
  return response;
};
const login = async (data) => {
  const response = await axios({
    url: "user/login",
    method: "post",
    data: data,
  });
  return response;
};
export { register, login };
