import axios from "axios";
const fetchCountries = (params) => {
  const response = axios({
    url: "countries/fetch",
    method: "get",
    params: params,
  });
  return response;
};
export { fetchCountries };
