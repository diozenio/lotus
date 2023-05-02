import axios from "axios";

export const BackendClient = axios.create({
  baseURL: `http://localhost:3000/api`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

BackendClient.interceptors.response.use(
  (response) => {
    if (response.data.status === "error") {
      return Promise.reject(new Error(String(response.data.error)));
    }

    return response;
  },
  (error) => {
    return Promise.reject(new Error(error.response.data.error));
  }
);
