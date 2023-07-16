import axios from "axios";
const removeShift = (data) => {
  const response = axios({
    url: "shift/delete",
    method: "delete",
    data: data,
  });
  return response;
};

const fetchShift = (params) => {
  const response = axios({
    url: "shift/fetch",
    method: "get",
    params: params,
  });
  return response;
};

const addShift = (data) => {
  const response = axios({
    url: "shift/new",
    method: "post",
    data: data,
  });
  return response;
};
const editShift = (data) => {
  const response = axios({
    url: "shift/edit",
    method: "put",
    data: data,
  });
  return response;
};
const deleteShift = (data) => {
  const response = axios({
    url: "shift/delete",
    method: "delete",
    data: data,
  });
  return response;
};
export { deleteShift, addShift, editShift, fetchShift };
