import axios from "axios";

const reportSummary = {
  fetch: async (query) => {
    const response = await axios({
      method: "get",
      url: "reports/attendance-summary",
      params: query,
    });
    return response;
  },
};
export { reportSummary };
