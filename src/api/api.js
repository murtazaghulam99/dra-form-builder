import axios from "axios";

const API = axios.create({
  baseURL: "https://staging-edc-api1.azurewebsites.net/api/",
});
API.interceptors.request.use(
  (request) => {
    request.headers["Accept"] = "application/json";
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default API;
