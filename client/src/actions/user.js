import axios from "axios";
import { serverUrl } from "../config/config";
import { setUser } from "../reduces/userReducer";

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post(serverUrl + "api/auth/login", {
      email,
      password,
    });
    dispatch(setUser(response.data.user));
    localStorage.setItem("token", response.data.token);
  } catch (error) {
    alert(error);
  }
};

export const regestration = async (email, password) => {
  try {
    const response = await axios.post(serverUrl + "api/auth/registration", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    alert(
      error.response.data.message
        ? error.response.data.message
        : error.response.data.error
    );
  }
};

export const auth = () => async (dispatch) => {
  try {
    const response = await axios.get(serverUrl + "api/auth/auth", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch(setUser(response.data.user));
    localStorage.setItem("token", response.data.token);
  } catch (error) {
    localStorage.removeItem("token");
  }
};
