import axios from "axios";
import { NewMeeting } from "../components/AddMeeting/interfaces";
import { API_BASE_URL } from "../config";

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/meetings/`,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) config.headers["Authorization"] = `Token ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export const addMeeting = async (meeting: NewMeeting) => {
  const response = await api.post("add/", meeting);
  return response.data;
};

export const getMeetings = async () => {
  try {
    const response = await api.get("list/");
    return response.data;
  } catch (error) {
    console.error("Ошибка при запросе встреч:", error);
    throw error;
  }
};
