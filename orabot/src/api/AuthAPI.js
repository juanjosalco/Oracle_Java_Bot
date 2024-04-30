import axios from "axios";
import {axiosConfig} from "./config/AxiosConfig";

const url = axiosConfig.baseURL;


export const login = async (email, password) => {

    const body = {
        email: email,
        password: password
    }

    const call = axios.post( url + '/login', body)
      .then( (response) => {
        return(response.data);
      })
      .catch((error) => {
        return(error);
      });
      return call;
}