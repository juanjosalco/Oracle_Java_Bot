import axios from "axios";
import { axiosConfig } from "./config/AxiosConfig";

const url = axiosConfig.baseURL;

export const getTasks = async (token) => {
  try {
    const response = await axios.get(`${url}/task/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    return { error: "Error fetching tasks" };
  }
};
