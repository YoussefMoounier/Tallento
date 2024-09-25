import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:8000",
  // baseURL: "https://chatapp-2exa.onrender.com",
});

export default request;
