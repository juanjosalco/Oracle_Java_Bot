import axios from "axios";
import { axiosConfig } from "./config/AxiosConfig";

const url = axiosConfig.baseURL;

export const getComments = async (token) => {
  try {
    const response = await axios.get(`${url}getComments/task/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    return { error: "Error fetching tasks" };
  }
};