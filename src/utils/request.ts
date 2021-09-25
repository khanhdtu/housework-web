import axios from "axios";
import { getCurrentFamily } from "../utils/storage";
import {
  errorResponseHandler,
  successResponseHandler,
} from "../utils/response-handler";

const request = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 0,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// request configs
request.interceptors.request.use(
  async (config) => {
    config.headers["Authorization"] = `Bearer ${
      getCurrentFamily()?.token ?? ""
    }`;
    return config;
  },
  (error) => Promise.reject(error)
);

// response configs
export interface IResponse {
  success: boolean;
  message?: string;
  data?: unknown;
  error?: unknown;
}

request.interceptors.response.use(
  (response) => successResponseHandler(response),
  (error) => errorResponseHandler(error)
);

export { request };
export default request;
