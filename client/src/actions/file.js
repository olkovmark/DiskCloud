import axios from "axios";
import { serverUrl } from "../config/config";
import { setFiles } from "../reduces/fileReducer";

export const getFiles = (dirId) => async (dispatch) => {
  try {
    const response = await axios.get(
      serverUrl + `api/files?${dirId ? "parent=" + dirId : ""}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    dispatch(setFiles(response.data));
  } catch (error) {
    alert(error.data.message);
  }
};
