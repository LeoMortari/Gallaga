import axios from "axios";

export const apiPublic = axios.create({
  baseURL: "http://172.18.96.1:5000/",
});
