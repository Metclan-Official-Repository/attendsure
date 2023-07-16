import axios from "axios";

const baseUrl = () => {
  if (import.meta.env.DEV) {
    return import.meta.env.VITE_BASE_URL_DEV;
  }
  if (import.meta.env.PROD) {
    return import.meta.env.VITE_BASE_URL_PROD;
  }
};

export { baseUrl };

//setting base url
axios.defaults.baseURL = baseUrl();

//incerceptors
axios.interceptors.request.use(
  (config) => {
    //Retreieve token from the localstorage
    const token = localStorage.getItem("_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },

  (err) => {
    console.log(err);
  }
);
axios.interceptors.response.use(
  (config) => {
    return config;
  },
  (err) => {
    if (err) {
      if (err.response.status === 403) {
        localStorage.removeItem("_token");
      }
    }
  }
);
