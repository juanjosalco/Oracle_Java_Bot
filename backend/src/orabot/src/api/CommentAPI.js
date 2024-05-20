import axios from "axios";
import { axiosConfig } from "./config/AxiosConfig";

const url = axiosConfig.baseURL;

export const getComments = async (taskID, token) => {
  try {
    const response = await axios.get(`${url}/api/v1/comments/${taskID}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    return { error: "Error fetching comments" };
  }
};

export const createComment = async (comment, token) => {
  try {
    const response = await axios.post(`${url}/api/v1/comments`, comment, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    console.error("Error: " + err.message)
    return { error: "Error creating comment" };
  }
};
