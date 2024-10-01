import axios from "axios";

const request = axios.create({
  baseURL: "https://tallento.onrender.com",
});

export default request;
