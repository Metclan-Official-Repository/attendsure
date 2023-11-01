import axios from "axios";

const joinNewsLetter = (data) => {
  const response = axios({
    url: "newletter/join",
    method: "post",
    data: data,
  });
  return response;
};
export { joinNewsLetter };
