import axios from "axios";
const inquiryMail = (payload) => {
  const response = axios({
    method: "post",
    data: payload,
    url: "mail/inquiry",
  });
  return response;
};
export { inquiryMail };
