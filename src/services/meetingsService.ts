import axios from "axios";
import { NewMeeting } from "../components/AddMeeting/interfaces";

const API_BASE_URL = "http://127.0.0.1:8000/api/meetings/";

const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const addMeeting = async (meeting: NewMeeting) => {
  const response = await api.post("add/", meeting);
  return response.data;
};

export const getMeetings = async () => {
  const response = await api.get("list/");
  return response.data;
};
