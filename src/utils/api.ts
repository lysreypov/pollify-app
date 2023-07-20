import axios, { AxiosInstance } from "axios";

import { apiURL } from "../config/config";

const api: AxiosInstance = axios.create({
  baseURL: `${apiURL}`, // Replace with your API base URL
  timeout: 5000, // Specify the request timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
