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