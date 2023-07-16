import axios from "axios";

const addLocation = (data) => {
  const response = axios({
    url: "locations/new",
    method: "post",
    data: data,
  });
  return response;
};
const fetchLocations = (params) => {
  console.log(params);
  const response = axios({
    url: "locations/fetch",
    method: "get",
    params: params,
  });
  return response;
};
const editLocation = (data) => {
  const response = axios({
    url: "locations/edit",
    method: "put",
    data: data,
  });
  return response;
};
const deleteLocation = (params) => {
  const response = axios({
    url: "locations/delete",
    method: "delete",
    params: data,
  });
  return response;
};
const disableLocation = (params) => {
  const response = axios({
    url: "locations/disable",
    method: "put",
    params: params,
  });
  return response;
};
const enableLocation = (params) => {
  const response = axios({
    url: "locations/enable",
    method: "put",
    params: params,
  });
  return response;
};
export {
  addLocation,
  fetchLocations,
  deleteLocation,
  editLocation,
  enableLocation,
  disableLocation,
};
