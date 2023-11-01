import axios from "axios";
const overviewSummary = (params) => {
  const response = axios({
    url: "overview/summary",
    method: "get",
    params: params,
  });
  return response;
};
export { overviewSummary };
