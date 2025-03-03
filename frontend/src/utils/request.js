import axios from "axios";

const request = axios.create({
  baseURL: "https://tallento.onrender.com",
});

// Add request interceptor to include auth token
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default request;
