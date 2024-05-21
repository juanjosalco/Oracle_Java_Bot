import axios from "axios";
import {axiosConfig} from "./config/AxiosConfig";

const url = axiosConfig.baseURL;

export const login = async (email, password) => {

    const body = {
        email: email,
        password: password
    }
    

    const handleLogin = async () => {
      try{
        const response = await axios.post(`${url}/api/v1/login`, body);
        return response.data;
      }
      catch(err){
        return {error: err.response.data};
      }
    }

    return handleLogin();

  }

export const getTeamMembers = async (token) => {

  try {
    const response = await axios.get(`${url}/api/v1/team/members`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    return { error: err.response.data};
  }
}