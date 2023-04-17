import axios from "axios";

export const BackendClient = axios.create({
  baseURL: `http://localhost:3000/api`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});
