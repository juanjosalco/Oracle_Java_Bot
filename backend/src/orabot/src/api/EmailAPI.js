import axios from "axios";
import {axiosConfig} from "./config/AxiosConfig";

const url = axiosConfig.baseURL;

  export const emailSend = async (email) => {
    const body = {
        userEmail: email
    };

    try {
      const response = await axios.post(
        `${url}/api/v1/email`,
            body
        ,
        {
          headers: {  },
        }
      );
      return response.data;
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      return { error: err.response.data};
    }
  };