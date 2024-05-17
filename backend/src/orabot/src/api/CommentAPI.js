import axios from "axios";
import { axiosConfig } from "./config/AxiosConfig";

const url = axiosConfig.baseURL;

export const getComments = async (taskID, token) => {
  try {
    const response = await axios.get(`${url}/comments/${taskID}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    return { error: "Error fetching comments" };
  }
};

export const createComment = async (comment, token) => {
  try {
    const response = await axios.post(`${url}/comments`, comment, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    return { error: "Error creating comment" };
  }
};
