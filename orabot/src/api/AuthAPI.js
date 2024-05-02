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
        const response = await axios.post(`${url}/login`, body);
        return response.data;
      }
      catch(err){
        return {error: 'Invalid credentials'};
      }
    }

    return handleLogin();

  }