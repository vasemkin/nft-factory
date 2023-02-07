import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:3333",
  headers: {
    "Content-type": "application/json",
  },
});
