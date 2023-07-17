import axios from "axios";
const fetchEmployeeLocation = (params) => {
  const response = axios({
    url: "employee-locations/fetch",
    method: "get",
    params: params,
  });
  return response;
};
export { fetchEmployeeLocation };
