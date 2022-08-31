import axios from "axios";

export const axiosInstance = (token?: string) => {
  return axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: { Authorization: "Bearer " + token },
  });
};
