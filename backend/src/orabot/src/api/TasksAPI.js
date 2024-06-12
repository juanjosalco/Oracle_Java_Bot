import axios from "axios";
import { axiosConfig } from "./config/AxiosConfig";

const url = axiosConfig.baseURL;

export const getTasks = async (token, priority, sortBy, status) => {
  try {
    const response = await axios.get(`${url}/api/v1/task/user`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { priority, sortBy, status},
    });
    return response.data;
  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
    return { error: err.response.data};
  }
};

export const getTeamTasks = async (token, priority, sortBy, status) => {
  try {
    const response = await axios.get(`${url}/api/v1/task/team`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { priority, sortBy, status },
    });
    return response.data;
  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
    return { error: err.response.data};
  }
};


// Archived
export const getTeamArchivedTasks = async (token) => {
  try {
    const response = await axios.get(`${url}/api/v1/task/team/archived`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
    return { error: err.response.data};
  }
};

export const getUserArchivedTasks = async (token) => {
  try {
    const response = await axios.get(`${url}/api/v1/task/user/archived`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
    return { error: err.response.data};
  }
}


export const postTask = async (token, task) => {
  try {
    const response = await axios.post(
      `${url}/api/v1/task`,
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
    return { error: err.response.data};
  }
};

export const deleteTask = async (token, taskId, task) => {
  try {
    const response = await axios.put(
      `${url}/api/v1/task/${taskId}/status`,
      { 
        assignee: task.assignee,
        title: task.title,
        description: task.description,
        priority: task.priority,
        dueDate: task.dueDate,
        creationDate: task.creationDate,
        status: "Cancelled", 
        statusChangeDate: new Date() 
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
    return { error: err.response.data};
  }
};

export const updateTask = async (token, taskId, task) => {
  try {
    const response = await axios.put(
      `${url}/api/v1/task/${taskId}`,
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
    return { error: err.response.data};
  }
};
