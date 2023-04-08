import axios from "axios";
import { serverUrl } from "../config/config";

export const login = async (email, password) => {
  try {
    const response = await axios.post(serverUrl + "api/auth/login", {
      email,
      password,
    });
  } catch (error) {
    alert(
      error.response.data.message
        ? error.response.data.message
        : error.response.data.error
    );
  }
};

export const regestration = async (email, password) => {
  try {
    const response = await axios.post(serverUrl + "api/auth/registration", {
      email,
      password,
    });
    console.log(response.data);
  } catch (error) {
    alert(error.response.data.message);
  }
};
