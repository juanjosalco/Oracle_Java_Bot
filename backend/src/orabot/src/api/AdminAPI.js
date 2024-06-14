import axios from "axios";
import {axiosConfig} from "./config/AxiosConfig";

const url = axiosConfig.baseURL;

export const postUser = async (token, request) => {
    try {
      const response = await axios.post(
        `${url}/api/v1/signUp`,
        {
          email: request.email,
          password: request.password,
          role: request.role,
          firstname: request.firstname,
          lastname: request.lastname,
          phonenumber: request.phonenumber,
          teamId: request.teamId
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

  export const getAllTeams = async (token) => {
    try {
      const response = await axios.get(`${url}/api/v1/team`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      return { error: err.response.data};
    }
  };

  export const postTeam = async (token, team) => {
    try {
      const response = await axios.post(
        `${url}/api/v1/team`,
        {
          name: team.name,
          description: team.description,
          manager: team.manager,
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

  export const getBlockedUsers = async (token) => {
    try {
      const response = await axios.get(`${url}/api/v1/user/blocked`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      return { error: err.response.data};
    }
  };

  export const unblockUser = async (token, userID) => {
    try {
      const response = await axios.put(`${url}/api/v1/user/unblock`, userID, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' // Ensure this matches the server's expected content type
        }
      });
      return response.data;
    } catch (err) {
      console.error(err.response? err.response.data : err.message);
      return { error: err.response.data };
    }
  };

  export const getManagers = async (token) => {
    try {
      const response = await axios.get(`${url}/api/v1/user/manager`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      return { error: err.response.data};
    }
  }
  