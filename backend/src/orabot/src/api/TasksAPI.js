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

export const getTeamTasks = async (token) => {
  try {
    const response = await axios.get(`${url}/task/team`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    return { error: "Error fetching tasks" };
  }
};

export const postTask = async (token, task) => {
  try {
    const response = await axios.post(
      `${url}/task`,
      {
        assignee: task.assignee,
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate,
        creationDate: task.creationDate,
        statusChangeDate: task.statusChangeDate,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
    return { error: "Error creating task" };
  }
};

export const deleteTask = async (token, taskId, task) => {
  try {
    const response = await axios.put(
      `${url}/task/${taskId}/status`,
      { 
        assignee: task.assignee,
        title: task.title,
        description: task.description,
        priority: task.priority,
        dueDate: task.dueDate,
        creationDate: task.creationDate,
        status: "Cancelled", 
        statusChangeDate: Date.now() 
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
    return { error: "Error deleting task" };
  }
};

export const updateTask = async (token, taskId, task) => {
  try {
    const response = await axios.put(
      `${url}/task/${taskId}`,
      {
        assignee: task.assignee,
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate,
        creationDate: task.creationDate,
        statusChangeDate: task.statusChangeDate,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
    return { error: "Error updating the task task" };
  }
};
