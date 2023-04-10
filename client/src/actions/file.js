import axios from "axios";
import { serverUrl } from "../config/config";
import { addFile, setFiles } from "../reduces/fileReducer";

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
export const createDir = (dirId, name) => async (dispatch) => {
  try {
    const response = await axios.post(
      serverUrl + `api/files`,
      {
        parent: dirId,
        name,
        type: "dir",
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    dispatch(addFile(response.data));
  } catch (error) {
    alert(error.response.data.message);
  }
};
