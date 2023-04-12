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
export const uploadFiles = (file, dirId) => async (dispatch) => {
  const formData = new FormData();
  console.log(file);
  formData.append("file", file);
  if (dirId) formData.append("parent", dirId);
  try {
    const response = await axios.post(
      serverUrl + `api/files/upload`,
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        onUploadProgress: (progressEvent) => {
          console.log(progressEvent);
          console.log(Math.round(progressEvent.progress * 100));
        },
      }
    );

    dispatch(addFile(response.data));
  } catch (error) {
    alert(error.response.data.message);
  }
};
